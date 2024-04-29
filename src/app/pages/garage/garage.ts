import CustomSelector from '@utils/set-selector-name';
import Component from '@utils/ui-component-template';
import { ApiService } from '@shared/api-service';
import PageInfo from '@shared/page-information/page-information';
import { activeRace$, finishList$, garagePageOptions$ } from '@shared/observables';
import { PageOptions } from '@interfaces/garage-page-options.interface';
import Pagination from '@shared/pagination/pagination';
import { CurrentRaceFinish as FinishList } from '@interfaces/current-race-finish';
import { hasWinner } from '@shared/utils/has-winner';
import { getWinner } from '@shared/utils/get-winner';
import { popup } from '@shared/popup/popup';
import RaceList from './race-list/race-list';
import ControlBlok from './control-block/control-block';
import style from './garage.module.scss';
import { isWinner } from '../../type-guards/is-winner';

@CustomSelector('Garage-page')
class GaragePage extends Component {
    private pageInfo = new PageInfo('Garage', garagePageOptions$.value);
    protected elements = this.childrenElements();

    static isWin = false;

    constructor() {
        super(style);

        ApiService.getCars();
        this.createComponent();

        finishList$.subscribe(this.finishListSubscribe);
    }

    protected createComponent(): void {
        this.appendElements();
    }

    private pageOptionsSubscribe = (options: PageOptions) => {
        this.pageInfo.updatePageOptions(options);
    };

    private activeRaceSubscribe = (race: unknown[]) => {
        const { pagination } = this.elements;

        pagination.disabledButtons(Boolean(race.length));
    };

    private finishListSubscribe = (finishList: FinishList[]) => {
        if (hasWinner(finishList, GaragePage.isWin)) {
            const race = getWinner(finishList)!;
            const timeSeconds = (race.transitionDuration / 1000).toFixed(2);

            (async () => {
                const winner = await ApiService.getWinner(race.car.id);

                if (isWinner(winner)) {
                    ApiService.updateWinner(race.car, Number(timeSeconds), winner);
                }

                if (!isWinner(winner)) {
                    ApiService.createWinner(race.car, Number(timeSeconds));
                }
            })();

            popup.show(`${race.car.name} went first [${timeSeconds}s]`);
            GaragePage.isWin = true;
        }
    };

    protected connectedCallback(): void {
        garagePageOptions$.subscribe(this.pageOptionsSubscribe);
        activeRace$.subscribe(this.activeRaceSubscribe);
    }

    protected disconnectedCallback(): void {
        garagePageOptions$.unsubscribe(this.pageOptionsSubscribe);
        activeRace$.unsubscribe(this.activeRaceSubscribe);
    }

    protected childrenElements() {
        return {
            pageInfo: this.pageInfo,
            controlBlock: new ControlBlok(),
            riceList: new RaceList(),
            pagination: new Pagination(garagePageOptions$, ApiService.garagePageLimit, ApiService.getCars, activeRace$),
        };
    }

    protected appendElements(): void {
        this.contentWrap.append(...Object.values(this.elements).map(elem => elem.getElement()));
    }
}

export default GaragePage;

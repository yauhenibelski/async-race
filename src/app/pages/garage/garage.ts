import CustomSelector from '@utils/set-selector-name';
import Component from '@utils/ui-component-template';
import { ApiService } from '@shared/api-service';
import PageInfo from '@shared/page-information/page-information';
import { activeRace$, finishList$, garagePageOptions$, isRaceStart$ } from '@shared/observables';
import { PageOptions } from '@interfaces/garage-page-options.interface';
import Pagination from '@shared/pagination/pagination';
import { CurrentRaceFinish as FinishList } from '@interfaces/current-race-finish';
import RaceList from './race-list/race-list';
import ControlBlok from './control-block/control-block';
import style from './garage.module.scss';
import PopUp from '../../core/popup/popup';

@CustomSelector('Garage-page')
class GaragePage extends Component {
    private pageInfo = new PageInfo('Garage', garagePageOptions$.value);
    protected elements = this.childrenElements();

    static isWin = false;

    constructor() {
        super(style);

        ApiService.getCars();
        this.createComponent();
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
        if (isRaceStart$.value && !GaragePage.isWin) {
            const winner = finishList.filter(race => race.status === 'win')[0];

            if (winner) {
                PopUp.show(
                    `${winner.race.car.name} went first [${(winner.race.transitionDuration / 1000).toFixed(2)}s]`,
                );
                GaragePage.isWin = true;
            }
        }
    };

    protected connectedCallback(): void {
        garagePageOptions$.subscribe(this.pageOptionsSubscribe);
        activeRace$.subscribe(this.activeRaceSubscribe);
        finishList$.subscribe(this.finishListSubscribe);
    }

    protected disconnectedCallback(): void {
        garagePageOptions$.unsubscribe(this.pageOptionsSubscribe);
        activeRace$.unsubscribe(this.activeRaceSubscribe);
        finishList$.unsubscribe(this.finishListSubscribe);
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

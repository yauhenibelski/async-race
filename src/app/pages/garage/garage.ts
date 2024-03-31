import CustomSelector from '@utils/set-selector-name';
import Component from '@utils/ui-component-template';
import { ApiService } from '@shared/api-service';
import PageInfo from '@shared/page-information/page-information';
import { activeRace$, garagePageOptions$ } from '@shared/observables';
import { PageOptions } from '@interfaces/garage-page-options.interface';
import Pagination from '@shared/pagination/pagination';
import RaceList from './race-list/race-list';
import ControlBlok from './control-block/control-block';
import style from './garage.module.scss';

@CustomSelector('Garage-page')
class GaragePage extends Component {
    private pageInfo = new PageInfo('Garage', garagePageOptions$.value);
    protected elements = this.childrenElements();

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

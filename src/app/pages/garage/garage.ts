import CustomSelector from '@utils/set-selector-name';
import Component from '@utils/ui-component-template';
import { ApiService } from '@shared/api-service';
import PageInfo from '@shared/page-information/page-information';
import { garagePageOptions$ } from '@shared/observables';
import { PageOptions } from '@interfaces/garage-page-options.interface';
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

    protected connectedCallback(): void {
        garagePageOptions$.subscribe(this.pageOptionsSubscribe);
    }

    protected disconnectedCallback(): void {
        garagePageOptions$.unsubscribe(this.pageOptionsSubscribe);
    }

    protected childrenElements() {
        return {
            pageInfo: this.pageInfo.getElement(),
            controlBlock: new ControlBlok().getElement(),
            riceList: new RaceList().getElement(),
        };
    }

    protected appendElements(): void {
        this.contentWrap.append(...Object.values(this.elements));
    }
}

export default GaragePage;

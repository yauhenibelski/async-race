import CustomSelector from '@utils/set-selector-name';
import Component from '@utils/ui-component-template';
import createElement from '@utils/create-element';
import { cars$ } from '@shared/observables';
import style from './race-list.module.scss';

@CustomSelector('Race-list')
class RaceList extends Component {
    protected elements = this.childrenElements();

    constructor() {
        super(style);
    }

    protected createComponent(): void {
        this.appendElements();
    }

    carSubscribe = () => {
        this.render();
    };

    protected connectedCallback(): void {
        cars$.subscribe(this.carSubscribe);
    }

    protected disconnectedCallback(): void {
        cars$.unsubscribe(this.carSubscribe);
    }

    protected childrenElements() {
        return {
            note: createElement({ tag: 'h2', text: 'No cars in the garage' }),
        };
    }

    protected appendElements(): void {
        const cars = cars$.value;

        if (cars) {
            this.contentWrap.append(...cars.map(car => car.getElement()));
        }

        if (!cars) {
            this.contentWrap.append(...Object.values(this.elements));
        }
    }
}

export default RaceList;

import CustomSelector from '@utils/set-selector-name';
import Component from '@utils/ui-component-template';
import { getColorCar } from '@shared/utils/get-coloured-car-elem';
import createElement from '@utils/create-element';
import { selectedCar$ } from '@shared/observables';
import { Car } from '@interfaces/car.interface';
import { ApiService } from '@shared/api-service';
import style from './race.module.scss';

@CustomSelector('Race')
class Race extends Component {
    protected elements = this.childrenElements();

    constructor(public car: Car) {
        super(style);

        this.createComponent();
    }

    protected createComponent(): void {
        const { updateCarBtn, removeCarBtn } = this.elements;

        updateCarBtn.onclick = () => selectedCar$.publish(this);

        removeCarBtn.onclick = () => {
            removeCarBtn.disabled = true;
            ApiService.removeCar(this.car.id);
        };

        this.appendElements();
    }

    updateCar(newProps: Omit<Car, 'id'>) {
        const updatedCar = { ...this.car, ...newProps };

        ApiService.updateCar(updatedCar, {
            fulfillCallback: () => {
                this.car = updatedCar;
                this.render();
            },
        });
    }

    protected childrenElements() {
        return {
            controlBtnsWrap: createElement({ tag: 'div', style: style['control-wrap'] }),
            updateCarBtn: createElement({ tag: 'button', text: 'Update Car' }),
            removeCarBtn: createElement({ tag: 'button', text: 'Remove' }),
            startCarBtn: createElement({ tag: 'button', text: 'Start' }),
            carName: createElement({ tag: 'p', text: this.car.name }),
            car: getColorCar(this.car.color),
        };
    }

    protected appendElements(): void {
        const { controlBtnsWrap, car, updateCarBtn, removeCarBtn, startCarBtn, carName } = this.elements;

        controlBtnsWrap.append(updateCarBtn, removeCarBtn, startCarBtn, carName);

        this.contentWrap.append(controlBtnsWrap, car);
    }
}

export default Race;

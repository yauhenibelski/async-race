import CustomSelector from '@utils/set-selector-name';
import style from './race.module.scss';
import Component from '@utils/ui-component-template';
import { getColorCar } from '@shared/utils/get-coloured-car-elem';
import createElement from '@utils/create-element';

@CustomSelector('Race')
class Race extends Component {
    protected elements = this.childrenElements();
    
    constructor() {
        super(style);

        this.createComponent()
    }

    protected createComponent(): void {
        this.appendElements();
    }

    protected childrenElements() {
        return {
            controlBtnsWrap: createElement({tag: 'div', style: style['control-wrap']}),
            updateCarBtn: createElement({tag: 'button', text: 'Update Car'}),
            removeCarBtn: createElement({tag: 'button', text: 'Remove'}),
            startCarBtn: createElement({tag: 'button', text: 'Start'}),
            carName: createElement({tag: 'p', text: 'Nissan'}),
           car: getColorCar('white'),
        };
    }

    protected appendElements(): void {
        const {controlBtnsWrap, car, updateCarBtn, removeCarBtn, startCarBtn, carName} = this.elements;

        controlBtnsWrap.append(updateCarBtn, removeCarBtn, startCarBtn, carName)

        this.contentWrap.append(controlBtnsWrap, car);
    }
}

export default Race;
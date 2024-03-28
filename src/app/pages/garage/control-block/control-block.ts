import CustomSelector from '@utils/set-selector-name';
import Component from '@utils/ui-component-template';
import createElement from '@utils/create-element';
import { generateRandomCars } from '@shared/utils/generate-random-cars';
import style from './control-block.module.scss';
import CreateUpdateCarBlock from './create-update-car-block /create-update-car-block ';

@CustomSelector('Control-blok')
class ControlBlok extends Component {
    protected elements = this.childrenElements();

    constructor() {
        super(style);

        this.createComponent();
    }

    protected createComponent(): void {
        const { generateCarsBtn } = this.elements;

        generateCarsBtn.onclick = () => generateRandomCars(100);
        this.appendElements();
    }

    protected childrenElements() {
        return {
            createUpdateBlock: new CreateUpdateCarBlock().getElement(),
            raceResetBtn: createElement({ tag: 'button', text: 'Race' }),
            generateCarsBtn: createElement({ tag: 'button', text: 'Generate Cars' }),
        };
    }

    protected appendElements(): void {
        this.contentWrap.append(...Object.values(this.elements));
    }
}

export default ControlBlok;

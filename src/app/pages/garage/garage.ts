import CustomSelector from '@utils/set-selector-name';
import Component from '@utils/ui-component-template';
import style from './garage.module.scss';
import ControlBlok from './control-block/control-block';

@CustomSelector('Garage-page')
class GaragePage extends Component {
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
            controlBlock: new ControlBlok().getElement(),
        };
    }

    protected appendElements(): void {
      
        this.contentWrap.append(...Object.values(this.elements));
    }
}

export default GaragePage;

import CustomSelector from '@utils/set-selector-name';
import Component from '@utils/ui-component-template';
import createElement from '@utils/create-element';
import style from './create-update-car-block.module.scss';

@CustomSelector('Create-update-car')
class CreateUpdateCarBlock extends Component {
    protected elements = this.childrenElements();

    constructor() {
        super(style);
        this.createComponent();
    }

    protected createComponent(): void {
        const { inputColor, inputText, confirmBtn } = this.elements;

        inputText.placeholder = 'Create car';
        inputColor.type = 'color';

        confirmBtn.onclick = () => console.log('confirm');

        this.appendElements();
    }

    protected childrenElements() {
        return {
            inputText: createElement({ tag: 'input' }),
            inputColor: createElement({ tag: 'input' }),
            confirmBtn: createElement({ tag: 'button', text: 'Create car' }),
        };
    }

    protected appendElements(): void {
        this.contentWrap.append(...Object.values(this.elements));
    }
}

export default CreateUpdateCarBlock;

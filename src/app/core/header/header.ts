import CustomSelector from '@utils/set-selector-name';
import Component from '@utils/ui-component-template';
import createElement from '@utils/create-element';
import style from './header.module.scss';
import { redirectTo } from '../../../router/utils/redirect';

@CustomSelector('Header')
class Header extends Component {
    protected elements = this.childrenElements();

    constructor() {
        super(style);
        this.createComponent();
    }

    protected createComponent(): void {
        const { garagePageLink, winnerPageLink } = this.elements;

        garagePageLink.onclick = () => redirectTo('garage');
        winnerPageLink.onclick = () => redirectTo('winners');

        this.appendElements();
    }

    protected childrenElements() {
        return {
            garagePageLink: createElement({ tag: 'button', text: 'Garage' }),
            winnerPageLink: createElement({ tag: 'button', text: 'Winner' }),
        };
    }

    protected appendElements(): void {
        this.contentWrap.append(...Object.values(this.elements));
    }
}

export default Header;

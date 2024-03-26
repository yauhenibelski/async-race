import CustomSelector from '@utils/set-selector-name';
import Component from '@utils/ui-component-template';
import style from './header.module.scss';
import createElement from '@utils/create-element';
import { redirectTo } from '../../../router/utils/redirect';

@CustomSelector('Header')
class Header extends Component {
    protected elements = this.childrenElements();

    constructor() {
        super(style);
        this.createComponent();
    }

    protected createComponent(): void {
        const {garagePageLink, winnerPageLink} = this.elements;

        garagePageLink.onclick = () => redirectTo('garage');
        winnerPageLink.onclick = () => redirectTo('winners');

        this.appendElements();
    }

    protected childrenElements() {
        return {
            garagePageLink: createElement({tag: 'button', text: 'Garage'}),
            winnerPageLink: createElement({tag: 'button', text: 'Winner'}),
            textWrap: createElement({tag: 'div', style: style['text-wrap']}),
            namePage: createElement({tag: 'h2', text: 'Garage(4)'}),
            numPage: createElement({tag: 'h3', text: 'Page #1'}),
        };
    }

    protected appendElements(): void {
        const {garagePageLink, winnerPageLink, textWrap, namePage, numPage} = this.elements;

        textWrap.append(namePage, numPage)

        this.contentWrap.append(garagePageLink, winnerPageLink, textWrap);
    }
}

export default Header;

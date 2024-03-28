import CustomSelector from '@utils/set-selector-name';
import Component from '@utils/ui-component-template';
import { PageOptions } from '@interfaces/garage-page-options.interface';
import createElement from '@utils/create-element';
import style from './page-information.module.scss';

@CustomSelector('Page-info')
class PageInfo extends Component {
    protected elements = this.childrenElements();

    constructor(
        public pageName: string,
        public pageOptions: PageOptions,
    ) {
        super(style);

        this.createComponent();
    }

    protected createComponent(): void {
        this.appendElements();
    }

    updatePageOptions(pageOptions: PageOptions) {
        this.pageOptions = pageOptions;
        this.render();
    }

    protected childrenElements() {
        const { page, totalCars } = this.pageOptions;
        return {
            namePage: createElement({ tag: 'h2', text: `${this.pageName} (${totalCars})` }),
            numPage: createElement({ tag: 'h3', text: `Page #${page}` }),
        };
    }

    protected appendElements(): void {
        this.contentWrap.append(...Object.values(this.elements));
    }
}

export default PageInfo;

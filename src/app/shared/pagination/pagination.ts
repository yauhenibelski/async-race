import CustomSelector from '@utils/set-selector-name';
import Component from '@utils/ui-component-template';
import type Observable from '@utils/observer-template';
import { PageOptions } from '@interfaces/garage-page-options.interface';
import createElement from '@utils/create-element';

import style from './pagination.module.scss';

@CustomSelector('Pagination')
class Pagination<T> extends Component {
    private pageOptions: PageOptions;
    private buttons: HTMLButtonElement[] = [];

    constructor(
        private pageOptions$: Observable<PageOptions>,
        private pageLimit: number,
        private clickFn: (i: number) => void,
        private disabledPagination$?: Observable<T>,
    ) {
        super(style);
        this.pageOptions = pageOptions$.value;
    }

    protected createComponent(): void {
        const { totalCars, page } = this.pageOptions;

        this.buttons = [];

        if (totalCars > this.pageLimit) {
            for (let i = 1; i <= Math.ceil(totalCars / this.pageLimit); i += 1) {
                const btn = createElement({ tag: 'button', style: page === i ? style.active : '', text: `${i}` });

                btn.disabled =
                    this.disabledPagination$?.value instanceof Array
                        ? Boolean(this.disabledPagination$?.value.length)
                        : Boolean(this.disabledPagination$?.value);

                btn.onclick = () => this.clickFn(i);

                this.buttons.push(btn);
            }
        }

        this.appendElements();
    }

    disabledButtons(boolean: boolean): void {
        this.buttons.forEach(btn => {
            btn.disabled = boolean;
        });
    }

    private pageOptionsSubscribe = (options: PageOptions) => {
        this.pageOptions = options;
        this.render();
    };

    protected connectedCallback(): void {
        this.pageOptions$.subscribe(this.pageOptionsSubscribe);
    }

    protected disconnectedCallback(): void {
        this.pageOptions$.unsubscribe(this.pageOptionsSubscribe);
    }

    protected appendElements(): void {
        this.contentWrap.append(...this.buttons);
    }
}

export default Pagination;

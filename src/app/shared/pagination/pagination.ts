import CustomSelector from '@utils/set-selector-name';
import Component from '@utils/ui-component-template';
import type Observable from '@utils/observer-template';
import { PageOptions } from '@interfaces/garage-page-options.interface';
import createElement from '@utils/create-element';
import { ApiService } from '@shared/api-service';
import style from './pagination.module.scss';

@CustomSelector('Pagination')
class Pagination extends Component {
    private pageOptions: PageOptions;

    constructor(
        private pageOptions$: Observable<PageOptions>,
        private pageLimit: number,
    ) {
        super(style);
        this.pageOptions = pageOptions$.value;
    }

    protected createComponent(): void {
        const { totalCars, page } = this.pageOptions;

        if (totalCars > this.pageLimit) {
            for (let i = 1; i <= Math.ceil(totalCars / this.pageLimit); i += 1) {
                const btn = createElement({ tag: 'button', style: page === i ? style.active : '', text: `${i}` });

                btn.onclick = () => ApiService.getCars(i);

                this.contentWrap.append(btn);
            }
        }
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
}

export default Pagination;

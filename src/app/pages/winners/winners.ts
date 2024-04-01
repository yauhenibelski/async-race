import Component from '@utils/ui-component-template';
import CustomSelector from '@utils/set-selector-name';
import PageInfo from '@shared/page-information/page-information';
import { winnerPageOptions$, winners$, winnersSortOptions$ } from '@shared/observables';
import { PageOptions } from '@interfaces/garage-page-options.interface';
import createElement from '@utils/create-element';
import { ApiService } from '@shared/api-service';
import { getColorCar } from '@shared/utils/get-coloured-car-elem';
import Pagination from '@shared/pagination/pagination';
import style from './winners.module.scss';

@CustomSelector('Winners-page')
class WinnersPage extends Component {
    private pageInfo = new PageInfo('Winners', winnerPageOptions$.value);
    protected elements = this.childrenElements();

    static isWin = false;

    constructor() {
        super(style);

        ApiService.getSortWinners(winnerPageOptions$.value.page, winnersSortOptions$.value);
        this.createComponent();
    }

    protected createComponent(): void {
        const { bestTimeBtn, winsBtn } = this.elements;

        bestTimeBtn.onclick = () => {
            winnersSortOptions$.publish({
                sort: 'time',
                order: winnersSortOptions$.value.order === 'ASC' ? 'DESC' : 'ASC',
            });
            ApiService.getSortWinners(winnerPageOptions$.value.page, winnersSortOptions$.value);
        };

        winsBtn.onclick = () => {
            winnersSortOptions$.publish({
                sort: 'wins',
                order: winnersSortOptions$.value.order === 'ASC' ? 'DESC' : 'ASC',
            });
            ApiService.getSortWinners(winnerPageOptions$.value.page, winnersSortOptions$.value);
        };

        this.appendElements();
    }

    private pageOptionsSubscribe = (options: PageOptions) => {
        this.pageInfo.updatePageOptions(options);
    };

    private winnerSubscribe = () => {
        this.render();
    };

    protected connectedCallback(): void {
        winnerPageOptions$.subscribe(this.pageOptionsSubscribe);
        winners$.subscribe(this.winnerSubscribe);
    }

    protected disconnectedCallback(): void {
        winnerPageOptions$.unsubscribe(this.pageOptionsSubscribe);
        winners$.unsubscribe(this.winnerSubscribe);
    }

    private paginationCallback = (pageNumber: number) => {
        ApiService.getSortWinners(pageNumber, winnersSortOptions$.value);
    };

    protected childrenElements() {
        return {
            table: createElement({ tag: 'table' }),
            btnsWrap: createElement({ tag: 'tr', style: style['btns-wrap'] }),
            numberBtn: createElement({ tag: 'button', text: 'Number' }),
            nameBtn: createElement({ tag: 'button', text: 'Name' }),
            carBtn: createElement({ tag: 'button', text: 'Car' }),
            winsBtn: createElement({ tag: 'button', text: 'Wins', style: style.win }),
            bestTimeBtn: createElement({ tag: 'button', text: 'Best time', style: style.time }),
            note: createElement({ tag: 'h2', text: 'No cars in the garage' }),
            pagination: new Pagination(winnerPageOptions$, ApiService.winnersPageLimit, this.paginationCallback),
        };
    }

    protected appendElements(): void {
        const { note, table } = this.elements;
        const winners = winners$.value;

        this.contentWrap.append(this.pageInfo.getElement());

        if (!winners?.length) {
            this.contentWrap.append(note);
            return;
        }

        this.appendBtns();
        this.appendWinnersElements();

        this.contentWrap.append(table);
    }

    private appendWinnersElements(): void {
        const { table, pagination, btnsWrap } = this.elements;
        const winners = winners$.value;

        if (winners?.length) {
            const carsPromises = [...winners].map(winner => ApiService.getCar(winner.id));

            Promise.all(carsPromises)
                .then(carsData => carsData.map((car, i) => car && { ...car, ...winners[i] }))
                .then(carsWinnersData => carsWinnersData.filter(data => data))
                .then(carsProps => {
                    table.append(btnsWrap);

                    carsProps.forEach((car, i) => {
                        const tr = createElement({ tag: 'tr' });

                        [
                            createElement({ tag: 'span', text: `${i + 1}` }),
                            createElement({ tag: 'span', text: car!.name }),
                            getColorCar(car!.color),
                            createElement({ tag: 'span', text: `${car!.wins}` }),
                            createElement({ tag: 'span', text: `${car!.time}` }),
                        ].forEach(elem => {
                            const td = createElement({ tag: 'td' });

                            td.append(elem);
                            tr.append(td);
                        });

                        table.append(tr);
                    });
                    this.contentWrap.append(pagination);
                });
        }
    }

    protected appendBtns(): void {
        const { btnsWrap, numberBtn, nameBtn, carBtn, winsBtn, bestTimeBtn } = this.elements;
        const btns = [numberBtn, nameBtn, carBtn, winsBtn, bestTimeBtn];

        btnsWrap.append(
            ...btns.map(btn => {
                const td = createElement({ tag: 'td' });

                td.append(btn);
                return td;
            }),
        );
    }
}

export default WinnersPage;

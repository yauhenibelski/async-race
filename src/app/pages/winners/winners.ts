import Component from '@utils/ui-component-template';
import CustomSelector from '@utils/set-selector-name';
import PageInfo from '@shared/page-information/page-information';
import { winnerPageOptions$, winners$ } from '@shared/observables';
import { PageOptions } from '@interfaces/garage-page-options.interface';
import createElement from '@utils/create-element';
import { ApiService } from '@shared/api-service';
import { getColorCar } from '@shared/utils/get-coloured-car-elem';
import style from './winners.module.scss';

@CustomSelector('Winners-page')
class WinnersPage extends Component {
    private pageInfo = new PageInfo('Winners', winnerPageOptions$.value);
    protected elements = this.childrenElements();

    static isWin = false;

    constructor() {
        super(style);

        ApiService.getSortWinners(1, 'wins', 'ASC');

        this.createComponent();
    }

    protected createComponent(): void {
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

    protected childrenElements() {
        return {
            table: createElement({ tag: 'table' }),
            btnsWrap: createElement({ tag: 'tr', style: style['btns-wrap'] }),
            carNameBtn: createElement({ tag: 'button', text: 'Car name' }),
            winsBtn: createElement({ tag: 'button', text: 'Wins' }),
            bestTimeBtn: createElement({ tag: 'button', text: 'Best time' }),
            note: createElement({ tag: 'h2', text: 'No cars in the garage' }),
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
        const { table, btnsWrap } = this.elements;
        const winners = winners$.value;

        if (winners?.length) {
            const carsPromises = [...winners].map(winner => ApiService.getCar(winner.id));

            Promise.all(carsPromises)
                .then(carsData => carsData.map((car, i) => car && { ...car, ...winners[i] }))
                .then(carsWinnersData => carsWinnersData.filter(data => data))
                .then(carsProps => {
                    table.append(btnsWrap);

                    carsProps.forEach(car => {
                        const tr = createElement({ tag: 'tr' });

                        [
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
                });
        }
    }

    protected appendBtns(): void {
        const { btnsWrap, carNameBtn, winsBtn, bestTimeBtn } = this.elements;
        const btns = [carNameBtn, winsBtn, bestTimeBtn];

        btnsWrap.append(
            ...btns.map((btn, i) => {
                const td = createElement({ tag: 'td' });

                if (!i) td.setAttribute('colspan', '2');

                td.append(btn);
                return td;
            }),
        );
    }
}

export default WinnersPage;

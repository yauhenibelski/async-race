import CustomSelector from '@utils/set-selector-name';
import Component from '@utils/ui-component-template';
import createElement from '@utils/create-element';
import { generateRandomCars } from '@shared/utils/generate-random-cars';
import { activeRace$, cars$, isRaceStart$ } from '@shared/observables';
import { delay } from '@utils/delay';
import style from './control-block.module.scss';
import CreateUpdateCarBlock from './create-update-car-block /create-update-car-block ';
import Race from '../race-list/race/race';

@CustomSelector('Control-block')
class ControlBlok extends Component {
    protected elements = this.childrenElements();

    constructor() {
        super(style);

        this.createComponent();
    }

    protected createComponent(): void {
        const { generateCarsBtn, raceResetBtn } = this.elements;

        raceResetBtn.onclick = () => this.raceReset();
        generateCarsBtn.onclick = () => generateRandomCars(100);

        this.appendElements();
    }

    private startRace(): void {
        const { raceResetBtn, generateCarsBtn } = this.elements;

        generateCarsBtn.disabled = true;
        raceResetBtn.disabled = true;

        if (raceResetBtn.innerText === 'Reset') {
            activeRace$?.value?.forEach(race => race.resetRace());

            delay(() => Boolean(!activeRace$.value.length)).then(() => (raceResetBtn.disabled = false));

            return;
        }

        raceResetBtn.innerText = 'Reset';

        isRaceStart$.publish(true);

        if (activeRace$.value.length) {
            activeRace$?.value?.forEach(race => race.resetRace());
        }

        delay(() => Boolean(!activeRace$.value.length))
            .then(() => {
                cars$?.value?.forEach(race => race.startRace());

                return delay(() => Boolean(activeRace$.value.length === cars$.value?.length));
            })
            .then(() => {
                raceResetBtn.disabled = false;
            });
    }

    private resetRace(): void {
        const { raceResetBtn } = this.elements;

        raceResetBtn.disabled = true;
        raceResetBtn.innerText = 'Race';

        activeRace$.value.forEach(race => race.resetRace());

        delay(() => Boolean(!activeRace$.value.length)).then(() => {
            raceResetBtn.disabled = false;
            isRaceStart$.publish(false);
        });
    }

    private raceReset(): void {
        const isRaceStart = isRaceStart$.value;

        if (!isRaceStart) this.startRace();
        if (isRaceStart) this.resetRace();
    }

    private activeRaceStartSubscribe = (races: Race[]): void => {
        const { generateCarsBtn, raceResetBtn } = this.elements;
        const hasActiveRace = Boolean(races.length);

        raceResetBtn.innerText = hasActiveRace ? 'Reset' : 'Race';
        generateCarsBtn.disabled = hasActiveRace;
    };

    protected disconnectedCallback(): void {
        activeRace$.unsubscribe(this.activeRaceStartSubscribe);
    }

    protected connectedCallback(): void {
        activeRace$.subscribe(this.activeRaceStartSubscribe);
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

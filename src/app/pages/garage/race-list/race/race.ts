import CustomSelector from '@utils/set-selector-name';
import Component from '@utils/ui-component-template';
import { getColorCar } from '@shared/utils/get-coloured-car-elem';
import createElement from '@utils/create-element';
import { cars$, garagePageOptions$, selectedCar$ } from '@shared/observables';
import { Car } from '@interfaces/car.interface';
import { ApiService } from '@shared/api-service';
import style from './race.module.scss';
import { isRaceParams } from '../../../../type-guards/is-RaceParams';

@CustomSelector('Race')
class Race extends Component {
    protected elements = this.childrenElements();

    private controller!: AbortController;
    private contentWrapObserver = new MutationObserver(() => this.controller.abort());

    private isRaceStarted = false;
    private startTime = 0;
    private transitionDuration = 0;

    constructor(public car: Car) {
        super(style);

        this.createComponent();
    }

    protected createComponent(): void {
        const { updateCarBtn, removeCarBtn, startCarBtn } = this.elements;

        updateCarBtn.onclick = () => selectedCar$.publish(this);
        removeCarBtn.onclick = () => this.removeCar();
        startCarBtn.onclick = () => this.startResetRace();

        this.appendElements();
    }

    startResetRace(): void {
        this.startRace();
        this.resetRace();
    }

    private resetRace(): void {
        const { startCarBtn } = this.elements;

        if (startCarBtn.innerText === 'Reset') {
            startCarBtn.disabled = true;

            ApiService.startedStoppedEngine(this.car.id, 'stopped', {
                fulfillCallback: () => {
                    this.isRaceStarted = false;
                    this.controller.abort();
                    this.render();
                },
            });
        }
    }

    private async startRace(): Promise<void> {
        const { startCarBtn } = this.elements;

        if (!this.isRaceStarted && startCarBtn.innerText === 'Start') {
            startCarBtn.disabled = true;

            await ApiService.startedStoppedEngine(this.car.id, 'started', {
                fulfillCallback: (data: unknown) => {
                    if (isRaceParams(data)) {
                        this.isRaceStarted = true;
                        this.startTime = Date.now();
                        this.transitionDuration = data.distance / data.velocity;

                        startCarBtn.innerText = 'Reset';
                        startCarBtn.disabled = false;

                        this.addCarRaceAnimation();
                    }
                },
            });

            this.controller = new AbortController();

            ApiService.driveMode(this.car.id, this.controller.signal, {
                fulfillCallback: () => {
                    if (this.isRaceStarted) {
                        console.log(this.car.id, 'win');
                        this.isRaceStarted = false;
                    }
                },
                rejectCallback: () => {
                    if (this.isRaceStarted) this.stopRace();
                },
            });
        }
    }

    private addCarRaceAnimation(): void {
        const { car } = this.elements;
        const raceWidth = this.offsetWidth;
        const carWidth = car.offsetWidth;

        car.style.transitionTimingFunction = 'linear';
        car.style.left = `${raceWidth - carWidth}px`;
        car.style.transitionDuration = `${this.transitionDuration}ms`;
    }

    protected connectedCallback(): void {
        this.returnCarPosition();

        this.contentWrapObserver.observe(this.contentWrap, { childList: true });
    }

    protected disconnectedCallback(): void {
        this.contentWrapObserver.disconnect();
    }

    private returnCarPosition(): void {
        if (this.isRaceStarted) {
            const { car } = this.elements;
            const raceWidth = this.offsetWidth;
            const carWidth = car.offsetWidth;

            const duration = this.transitionDuration - (Date.now() - this.startTime);
            const px = raceWidth / this.transitionDuration;
            const left = raceWidth - duration * px;

            car.style.transitionDuration = '';
            car.style.left = `${left}px`;

            setTimeout(() => {
                car.style.transitionDuration = `${duration}ms`;
                car.style.left = `${raceWidth - carWidth}px`;
            }, 16);
        }
    }

    private stopRace(): void {
        const { car } = this.elements;
        const carPositionLeft = car.offsetLeft;

        car.style.cssText = `left: ${carPositionLeft}px`;
        car.style.transform = 'rotate(163deg)';

        this.isRaceStarted = false;
    }

    private removeCar(): void {
        const { removeCarBtn } = this.elements;

        removeCarBtn.disabled = true;

        selectedCar$.publish(null);

        ApiService.removeCar(this.car.id, {
            fulfillCallback: () => {
                const emptyPage = !(Number(cars$.value?.length) - 1);

                if (emptyPage) {
                    const { totalCars, page } = garagePageOptions$.value;

                    garagePageOptions$.publish({
                        totalCars,
                        page: page - 1,
                    });
                }
            },
        });
    }

    updateCar(newProps: Omit<Car, 'id'>): void {
        const updatedCar = { ...this.car, ...newProps };

        ApiService.updateCar(updatedCar, {
            fulfillCallback: () => {
                this.car = updatedCar;
                this.render();
            },
        });
    }

    protected childrenElements() {
        return {
            controlBtnsWrap: createElement({ tag: 'div', style: style['control-wrap'] }),
            updateCarBtn: createElement({ tag: 'button', text: 'Update Car' }),
            removeCarBtn: createElement({ tag: 'button', text: 'Remove' }),
            startCarBtn: createElement({ tag: 'button', text: 'Start' }),
            carName: createElement({ tag: 'p', text: this.car.name }),
            car: getColorCar(this.car.color),
        };
    }

    protected appendElements(): void {
        const { controlBtnsWrap, car, updateCarBtn, removeCarBtn, startCarBtn, carName } = this.elements;

        controlBtnsWrap.append(updateCarBtn, removeCarBtn, startCarBtn, carName);

        this.contentWrap.append(controlBtnsWrap, car);
    }
}

export default Race;

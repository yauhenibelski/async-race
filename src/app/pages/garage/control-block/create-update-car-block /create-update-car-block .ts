import CustomSelector from '@utils/set-selector-name';
import Component from '@utils/ui-component-template';
import createElement from '@utils/create-element';
import { activeRace$, isRaceStart$, selectedCar$ } from '@shared/observables';
import type Race from '@pages/garage/race-list/race/race';
import { ApiService } from '@shared/api-service';
import { disabledBtns } from '@shared/utils/disabled-btns';
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

        confirmBtn.disabled = !inputText.value;
        inputText.placeholder = 'Create car';
        inputColor.type = 'color';

        this.addConfirmBtnEvent();

        this.appendElements();
    }

    private selectedCarSubscribe = (race: Race | null): void => {
        const { inputColor, inputText, confirmBtn } = this.elements;

        if (race) {
            const { name, color } = race.car;

            confirmBtn.innerText = 'Update car';
            inputText.value = name;
            inputColor.value = color;
            confirmBtn.disabled = false;

            inputText.focus();
        }

        if (!race) {
            confirmBtn.innerText = 'Create car';
        }
    };

    private addConfirmBtnEvent() {
        const { inputColor, inputText, confirmBtn } = this.elements;

        confirmBtn.onclick = () => {
            const selectedCar = selectedCar$.value;

            if (selectedCar) {
                selectedCar.updateCar({
                    name: inputText.value ? inputText.value : 'Запорожец',
                    color: inputColor.value,
                });

                selectedCar$.publish(null);
            }

            if (!selectedCar) {
                ApiService.createCar({
                    name: inputText.value ? inputText.value : 'Запорожец',
                    color: inputColor.value,
                });
            }

            inputText.value = '';

            disabledBtns(true);
        };
    }

    private activeRaceStartSubscribe = (races: Race[]) => {
        const { confirmBtn, inputText } = this.elements;
        const hasActiveRace = Boolean(races.length);

        confirmBtn.disabled = hasActiveRace;
        inputText.disabled = hasActiveRace;
    };

    private isRaceStartSubscribe = (boolean: boolean) => {
        const { confirmBtn } = this.elements;
        if (boolean) confirmBtn.disabled = true;
    };

    protected connectedCallback(): void {
        selectedCar$.subscribe(this.selectedCarSubscribe);
        activeRace$.subscribe(this.activeRaceStartSubscribe);
        isRaceStart$.subscribe(this.isRaceStartSubscribe);
    }

    protected disconnectedCallback(): void {
        selectedCar$.unsubscribe(this.selectedCarSubscribe);
        activeRace$.unsubscribe(this.activeRaceStartSubscribe);
        isRaceStart$.unsubscribe(this.isRaceStartSubscribe);
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

import CustomSelector from "@utils/set-selector-name";
import Component from "@utils/ui-component-template";
import style from './race-list.module.scss';
import Race from "./race/race";


@CustomSelector('Race-list')
class RaceList extends Component {
    protected elements = this.childrenElements();
    
    constructor() {
        super(style);

        this.createComponent()
    }

    protected createComponent(): void {
        this.appendElements();
    }

    protected childrenElements() {
        return {
            race: new Race().getElement(),
        };
    }

    protected appendElements(): void {
      
        this.contentWrap.append(...Object.values(this.elements));
    }
}

export default RaceList;
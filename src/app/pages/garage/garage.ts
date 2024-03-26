import CustomSelector from '@utils/set-selector-name';
import Component from '@utils/ui-component-template';
import style from './garage.module.scss';

@CustomSelector('Garage-page')
class GaragePage extends Component {
    constructor() {
        super(style);
    }
}

export default GaragePage;

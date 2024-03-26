import Component from '@utils/ui-component-template';
import CustomSelector from '@utils/set-selector-name';
import style from './winners.module.scss';

@CustomSelector('Winners-page')
class WinnersPage extends Component {
    constructor() {
        super(style);
    }
}

export default WinnersPage;

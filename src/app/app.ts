import createElement from '@utils/create-element';
import { router } from '../router/router';
import Header from './core/header/header';

class App {
    root = document.body;

    async run() {
        const routOutput = createElement({ tag: 'div', style: 'router' });

        this.root.append(new Header().getElement(), routOutput);

        router();
    }
}

export default App;

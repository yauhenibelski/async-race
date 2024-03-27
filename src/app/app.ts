import createElement from '@utils/create-element';
import { ApiService } from '@shared/api-service';
import { cars$, garagePageOptions$ } from '@shared/observables';
import { router } from '../router/router';
import Header from './core/header/header';

class App {
    root = document.body;

    async run() {
        const routOutput = createElement({ tag: 'div', style: 'router' });

        this.root.append(new Header().getElement(), routOutput);

        router();
        ApiService.getCars(1);
        cars$.subscribe(data => {
            console.log(data, '---cars---');
        });
        garagePageOptions$.subscribe(data => {
            console.log(data, '---total---');
        });
    }
}

export default App;

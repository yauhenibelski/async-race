import { pages } from '../pages';
import { Routes } from '../routes.const';

export const renderPage = (path: string) => {
    if (path in Routes) {
        const routOutput = <HTMLElement>document.querySelector('.router');
        // const currentPage = <HTMLElement>routOutput.firstElementChild;
        
        let nextPage: HTMLElement | null = null;
    
        routOutput.innerHTML = '';
    
        if (path === Routes.garage) nextPage = pages.garage;
        if (path === Routes.winners) nextPage = pages.winners;
    
        if (nextPage) {
            routOutput.append(nextPage);
        }
    } 
};

import GaragePage from '@pages/garage/garage';
import WinnersPage from '@pages/winners/winners';
import { RoutePages } from './types/pages.type';

export const pages: RoutePages = {
    garage: new GaragePage().getElement(),
    winners: new WinnersPage().getElement(),
} as const;

import { CurrentRaceFinish } from '@interfaces/current-race-finish';
import { PageOptions } from '@interfaces/garage-page-options.interface';
import { Winner } from '@interfaces/winner.interface';
import { WinnersSortOptions } from '@interfaces/winners-sort-options.interface';
import type Race from '@pages/garage/race-list/race/race';
import Observable from '@utils/observer-template';

export const cars$ = new Observable<Race[] | null>(null);
export const garagePageOptions$ = new Observable<PageOptions>({ totalCars: 0, page: 1 });
export const winnerPageOptions$ = new Observable<PageOptions>({ totalCars: 0, page: 1 });
export const selectedCar$ = new Observable<Race | null>(null);
export const activeRace$ = new Observable<Race[]>([]);
export const isRaceStart$ = new Observable<boolean>(false);
export const finishList$ = new Observable<CurrentRaceFinish[]>([]);
export const winners$ = new Observable<Winner[] | null>(null);
export const winnersSortOptions$ = new Observable<WinnersSortOptions>({ sort: 'time', order: 'ASC' });

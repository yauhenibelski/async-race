import { PageOptions } from '@interfaces/garage-page-options.interface';
import type Race from '@pages/garage/race-list/race/race';
import Observable from '@utils/observer-template';

export const cars$ = new Observable<Race[] | null>(null);
export const garagePageOptions$ = new Observable<PageOptions>({ totalCars: 0, page: 1 });
export const selectedCar$ = new Observable<Race | null>(null);

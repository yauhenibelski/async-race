import { Car } from '@interfaces/car.interface';
import { GaragePageOptions } from '@interfaces/garage-page-options.interface';
import Observable from '@utils/observer-template';

export const cars$ = new Observable<Car[] | null>(null);
export const garagePageOptions$ = new Observable<GaragePageOptions>({ totalCars: 0, page: 1 });
export const selectedCar$ = new Observable<Car | null>(null);

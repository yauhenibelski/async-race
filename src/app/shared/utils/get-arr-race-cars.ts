import { Car } from '@interfaces/car.interface';
import Race from '@pages/garage/race-list/race/race';

export const getArrRaceCars = (cars: Car[]): Race[] => {
    return cars.reduce((acc: Race[], car: Car) => [...acc, new Race(car)], []);
};

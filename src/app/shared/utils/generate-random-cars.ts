import { ApiService } from '@shared/api-service';
import { Car } from '@interfaces/car.interface';
import { getRandomCarBrand } from './get-random-car-brans';

export const generateRandomCars = (count: number): void => {
    const newCars: Array<Omit<Car, 'id'>> = [];
    for (let i = 0; i < count; i += 1) {
        const randomCar: Omit<Car, 'id'> = {
            name: getRandomCarBrand(),
            color: `#${Math.random().toString(16).substring(2, 8)}`,
        };
        newCars.push(randomCar);
    }
    ApiService.createCar(newCars);
};

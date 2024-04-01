import { ApiService } from '@shared/api-service';
import { Car } from '@interfaces/car.interface';
import { getRandomCarBrand } from './get-random-car-brans';
import { getRandomModelName } from './get-random-model-name';

export const generateRandomCars = (count: number): void => {
    const newCars: Array<Omit<Car, 'id'>> = [];

    for (let i = 0; i < count; i += 1) {
        const randomCar: Omit<Car, 'id'> = {
            name: `${getRandomCarBrand()} ${getRandomModelName()} `,
            color: `#${Math.random().toString(16).substring(2, 8)}`,
        };

        newCars.push(randomCar);
    }
    ApiService.createCar(newCars);
};

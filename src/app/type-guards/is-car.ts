import { Car } from '@interfaces/car.interface';

export const isCar = (data: unknown): data is Car => {
    const car = data as Car;
    return typeof car.id === 'number' && typeof car.color === 'string' && typeof car.name === 'string';
};

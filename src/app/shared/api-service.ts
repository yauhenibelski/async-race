import { Car } from '@interfaces/car.interface';
import { cars$, garagePageOptions$ } from '@shared/observables';
import { getArrRaceCars } from './utils/get-arr-race-cars';

interface CallbackOption {
    fulfillCallback?: () => void;
    rejectCallback?: () => void;
}

export class ApiService {
    static path = 'http://localhost:3000/';
    static garagePageLimit = 7;
    static winnersPageLimit = 10;

    static readonly getCars = (pageNum?: number): void => {
        const page = pageNum || 1;

        fetch(`${this.path}garage/?_page=${page}&_limit=${this.garagePageLimit}`)
            .then(response => {
                if (response.status !== 200) {
                    throw new Error(`getCars response status ${response.status}`);
                }

                const totalCars = Number(response.headers.get('X-Total-Count'));
                garagePageOptions$.publish({ totalCars, page });

                return response.json();
            })
            .then((cars: Car[]) => {
                cars$.publish(getArrRaceCars(cars));
            })
            .catch(err => {
                cars$.publish(null);
                garagePageOptions$.publish({ totalCars: 0, page: 1 });

                console.log(err);
            });
    };

    // static readonly getCar = (id: number): void => {
    //     fetch(`${this.path}garage/${id}`)
    //         .then(response => {
    //             if (response.status !== 200) {
    //                 throw new Error(`getCar response status ${response.status}`);
    //             }

    //             return response.json();
    //         })
    //         .then((car: Car) => {
    //             selectedCar$.publish(car);
    //         })
    //         .catch(err => {
    //             selectedCar$.publish(null);

    //             console.log(err);
    //         });
    // };

    static readonly createCar = (car: Omit<Car, 'id'>, option?: CallbackOption): void => {
        fetch(`${this.path}garage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(car),
        })
            .then(response => {
                if (response.status === 201 && option && option.fulfillCallback) {
                    option.fulfillCallback();
                }

                if (response.status !== 201) {
                    throw new Error(`createCar response status ${response.status}`);
                }

                this.getCars(garagePageOptions$.value.page);
            })
            .catch(err => {
                if (option && option.rejectCallback) {
                    option.rejectCallback();
                }

                console.log(err);
            });
    };

    static readonly removeCar = (id: number, option?: CallbackOption) => {
        fetch(`${this.path}garage/${id}`, { method: 'DELETE' })
            .then(response => {
                if (response.status === 200 && option && option.fulfillCallback) {
                    option.fulfillCallback();
                }

                if (response.status !== 200) {
                    throw new Error(`removeCar response status ${response.status}`);
                }

                this.getCars(garagePageOptions$.value.page);
            })
            .catch(err => {
                if (option && option.rejectCallback) {
                    option.rejectCallback();
                }

                console.log(err);
            });
    };

    static readonly updateCar = (car: Car, option?: CallbackOption): void => {
        fetch(`${this.path}garage/${car.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(car),
        })
            .then(response => {
                if (response.status === 200 && option && option.fulfillCallback) {
                    option.fulfillCallback();
                }

                if (response.status !== 200) {
                    throw new Error(`updateCar response status ${response.status}`);
                }
            })
            .catch(err => {
                if (option && option.rejectCallback) {
                    option.rejectCallback();
                }

                console.log(err);
            });
    };

    static readonly startedStoppedEngine = (
        id: number,
        status: 'started' | 'stopped',
        option?: CallbackOption,
    ): void => {
        fetch(`${this.path}engine/?id=${id}&status=${status}`, { method: 'PATCH' })
            .then(response => {
                if (response.status === 200 && option && option.fulfillCallback) {
                    option.fulfillCallback();
                }

                if (response.status !== 200) {
                    throw new Error(`startedStoppedEngine response status ${response.status}`);
                }
            })
            .catch(err => {
                if (option && option.rejectCallback) {
                    option.rejectCallback();
                }

                console.log(err);
            });
    };

    static readonly driveMode = (id: number, option?: CallbackOption): void => {
        fetch(`${this.path}engine/?id=${id}&status=drive`, { method: 'PATCH' })
            .then(response => {
                if (response.status === 200 && option && option.fulfillCallback) {
                    option.fulfillCallback();
                }

                if (response.status !== 200) {
                    throw new Error(`driveMode response status ${response.status}`);
                }
            })
            .catch(err => {
                if (option && option.rejectCallback) {
                    option.rejectCallback();
                }

                console.log(err);
            });
    };
}

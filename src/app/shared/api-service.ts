import { Car } from '@interfaces/car.interface';
import { cars$, garagePageOptions$, winnerPageOptions$, winners$, winnersSortOptions$ } from '@shared/observables';
import { Winner } from '@interfaces/winner.interface';
import { WinnersSortOptions } from '@interfaces/winners-sort-options.interface';
import { getArrRaceCars } from './utils/get-arr-race-cars';
import { disabledBtns } from './utils/disabled-btns';
import { isWinner } from '../type-guards/is-winner';
import { isCar } from '../type-guards/is-car';

interface CallbackOption {
    fulfillCallback?: (data?: unknown) => void;
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
                if (!response.ok) {
                    throw new Error(`getCars response status ${response.status}`);
                }

                const totalCars = Number(response.headers.get('X-Total-Count'));
                garagePageOptions$.publish({ totalCars, page });

                disabledBtns(false);

                return response.json();
            })
            .then((cars: Car[]) => {
                cars$.publish(getArrRaceCars(cars));
            })
            .catch(err => {
                cars$.publish(null);
                disabledBtns(false);
                garagePageOptions$.publish({ totalCars: 0, page: 1 });

                console.log(err);
            });
    };

    static readonly getCar = (id: number): Promise<Car | null> =>
        fetch(`${this.path}garage/${id}`)
            .then(response => response.json())
            .then(data => (isCar(data) ? data : null));

    static readonly createCar = (car: Omit<Car, 'id'> | Array<Omit<Car, 'id'>>, option?: CallbackOption): void => {
        const cars = Array.isArray(car) ? car : [car];
        const garageUrl = `${this.path}garage`;

        cars.map(car =>
            fetch(garageUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(car),
            })
                .then(response => {
                    if (response.ok && option && option.fulfillCallback) {
                        option.fulfillCallback();
                    }

                    if (!response.ok) {
                        throw new Error(`createCar response status ${response.status}`);
                    }
                })
                .catch(err => {
                    if (option && option.rejectCallback) {
                        option.rejectCallback();
                    }

                    console.log(err);
                }),
        );

        Promise.all(cars)
            .then(() => this.promiseGarageDelay())
            .then(() => this.getCars(garagePageOptions$.value.page));
    };

    static readonly removeCar = (id: number, option?: CallbackOption) => {
        fetch(`${this.path}garage/${id}`, { method: 'DELETE' })
            .then(response => {
                if (response.ok && option && option.fulfillCallback) {
                    option.fulfillCallback();
                }

                if (!response.ok) {
                    throw new Error(`removeCar response status ${response.status}`);
                }

                this.getCars(garagePageOptions$.value.page);
                this.removeWinner(id);
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
                if (response.ok && option && option.fulfillCallback) {
                    option.fulfillCallback();
                }

                if (!response.ok) {
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
    ): Promise<void> =>
        fetch(`${this.path}engine/?id=${id}&status=${status}`, { method: 'PATCH' })
            .then(response => {
                if (response.ok && option && option.fulfillCallback) {
                    response.json().then(params => {
                        option.fulfillCallback!(params);
                    });
                }

                if (!response.ok) {
                    throw new Error(`startedStoppedEngine response status ${response.status}`);
                }
            })
            .catch(err => {
                if (option && option.rejectCallback) {
                    option.rejectCallback();
                } else {
                    this.getCars(garagePageOptions$.value.page);
                }

                console.log(err);
            });

    static readonly driveMode = (id: number, signal: AbortSignal, option?: CallbackOption): Promise<void> =>
        fetch(`${this.path}engine/?id=${id}&status=drive`, {
            method: 'PATCH',
            signal,
        })
            .then(response => {
                if (response.ok && option && option.fulfillCallback) {
                    response.json().then(params => {
                        option.fulfillCallback!(params);
                    });
                }

                if (!response.ok) {
                    throw new Error(`driveMode response status ${response.status}`);
                }
            })
            .catch(() => {
                if (option && option.rejectCallback) {
                    option.rejectCallback();
                }
            });

    static readonly promiseGarageDelay = () => fetch(`${this.path}garage`).then(response => response.body?.getReader());

    static readonly getSortWinners = (pageNum: number, sortOptions: WinnersSortOptions): void => {
        const page = pageNum || 1;

        fetch(
            `${this.path}winners/?_page=${page}&_limit=${this.winnersPageLimit}&_sort=${sortOptions.sort}&_order=${sortOptions.order}`,
        )
            .then(response => {
                if (!response.ok) {
                    throw new Error(`getWinners response status ${response.status}`);
                }

                const totalCars = Number(response.headers.get('X-Total-Count'));
                winnerPageOptions$.publish({ totalCars, page });

                return response.json();
            })
            .then((winners: Winner[]) => {
                if (winners.every(winner => isWinner(winner))) {
                    winners$.publish(winners);
                } else {
                    winners$.publish(null);
                    winnerPageOptions$.publish({ totalCars: 0, page: 1 });
                }
            })
            .catch(err => {
                winners$.publish(null);
                winnerPageOptions$.publish({ totalCars: 0, page: 1 });

                console.log(err);
            });
    };

    static readonly getWinner = (id: number): Promise<unknown> =>
        fetch(`${this.path}winners/${id}`).then(response => response.json());

    static readonly createWinner = (car: Car, time: Winner['time'], option?: CallbackOption): void => {
        fetch(`${this.path}winners`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: car.id,
                wins: 1,
                time,
            }),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`createWinner response status ${response.status}`);
                }

                if (response.ok && option && option.fulfillCallback) {
                    option.fulfillCallback();
                }

                this.getSortWinners(winnerPageOptions$.value.page, winnersSortOptions$.value);
            })
            .catch(err => {
                if (option && option.rejectCallback) {
                    option.rejectCallback();
                }
                console.log(err);
            });
    };

    static readonly updateWinner = (
        car: Car,
        time: Winner['time'],
        oldValue: Winner,
        option?: CallbackOption,
    ): void => {
        fetch(`${this.path}winners/${car.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                wins: oldValue.wins + 1,
                time: oldValue.time < time ? oldValue.time : time,
            }),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`createWinner response status ${response.status}`);
                }

                if (response.ok && option && option.fulfillCallback) {
                    option.fulfillCallback();
                }

                this.getSortWinners(winnerPageOptions$.value.page, winnersSortOptions$.value);
            })
            .catch(err => {
                if (option && option.rejectCallback) {
                    option.rejectCallback();
                }

                console.log(err);
            });
    };

    static readonly removeWinner = (id: number, option?: CallbackOption) => {
        fetch(`${this.path}winners/${id}`, { method: 'DELETE' })
            .then(response => {
                if (response.ok && option && option.fulfillCallback) {
                    option.fulfillCallback();
                }

                if (!response.ok) {
                    throw new Error(`removeWinners response status ${response.status}`);
                }

                this.getSortWinners(winnerPageOptions$.value.page, winnersSortOptions$.value);
            })
            .catch(err => {
                if (option && option.rejectCallback) {
                    option.rejectCallback();
                }

                console.log(err);
            });
    };
}

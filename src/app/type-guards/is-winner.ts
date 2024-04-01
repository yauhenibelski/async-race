import { Winner } from '@interfaces/winner.interface';

export const isWinner = (data: unknown) => {
    const winner = data as Winner;

    return Object.values(winner).every(prop => typeof prop === 'number');
};

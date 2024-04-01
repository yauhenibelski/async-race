import { Winner } from '@interfaces/winner.interface';

export const isWinner = (data: unknown) => {
    const winner = data as Winner;

    return typeof winner.id === 'number' && typeof winner.wins === 'number' && typeof winner.time === 'number';
};

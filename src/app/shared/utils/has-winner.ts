import { CurrentRaceFinish } from '@interfaces/current-race-finish';
import { isRaceStart$ } from '@shared/observables';

export const hasWinner = (finishList: CurrentRaceFinish[], isWin: boolean): boolean => {
    if (isRaceStart$.value && !isWin) {
        const winner = finishList.filter(race => race.status === 'win')[0];

        return Boolean(winner);
    }

    return false;
};

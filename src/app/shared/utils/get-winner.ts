import { CurrentRaceFinish } from '@interfaces/current-race-finish';
import Race from '@pages/garage/race-list/race/race';

export const getWinner = (finishList: CurrentRaceFinish[]): Race | null => {
    return finishList.filter(race => race.status === 'win')[0].race || null;
};

import Race from '@pages/garage/race-list/race/race';

export interface CurrentRaceFinish {
    race: Race;
    status: 'win' | 'lost';
}

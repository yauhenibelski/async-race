import { RaceParams } from '@interfaces/race-params.interface';

export function isRaceParams(data: unknown): data is RaceParams {
    const raceParams = data as RaceParams;

    return typeof raceParams.velocity === 'number' && typeof raceParams.distance === 'number';
}

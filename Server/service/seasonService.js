
import { executeQuery } from './db.js';
import { getPropertiesQuery, getPropertyByIdQuery, addPropertyQuery } from '../queries/propertyQuery.js'

export class SeasonService {
    async getSeasons(queryparams) {
        const querySeason = getPropertiesQuery(queryparams, 'season');
        const result = await executeQuery(querySeason);
        return result;
    }

    async getSeasonById(id) {
        const querySeason = getPropertyByIdQuery('season');
        const result = await executeQuery(querySeason, [id]);
        return result;
    }

    async addSeason(newSeason) {
        const querySeason = addPropertyQuery('season');
        const result = await executeQuery(querySeason, Object.values(newSeason));
        return result;
    }
}
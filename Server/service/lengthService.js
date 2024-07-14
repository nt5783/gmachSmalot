
import { executeQuery } from './db.js';
import { getPropertiesQuery, getPropertyByIdQuery, addPropertyQuery } from '../queries/propertyQuery.js'

export class LengthService {
    async getLengths(queryparams) {
        const queryLength = getPropertiesQuery(queryparams,'length');
        const result = await executeQuery(queryLength);
        return result;
    }

    async getLengthById(id) {
        const queryLength = getPropertyByIdQuery('length');
        const result = await executeQuery(queryLength, [id]);
        return result;
    }

    async addLength(newLength) {
        const queryLength = addPropertyQuery('length');
        const result = await executeQuery(queryLength, Object.values(newLength));
        return result;
    }
}

import { executeQuery } from './db.js';
import { getPropertiesQuery, getPropertyByIdQuery, addPropertyQuery } from '../queries/propertyQuery.js'


export class SizeService {
    async getSizes(queryparams) {
        const querySize = getPropertiesQuery(queryparams,'size');
        const result = await executeQuery(querySize);
        return result;
    }

    async getSizeById(id) {
        const querySize = getPropertyByIdQuery('size');
        const result = await executeQuery(querySize, [id]);
        return result;
    }

    async addSize(newSize) {
        const querySize = addPropertyQuery('size');
        const result = await executeQuery(querySize, Object.values(newSize));
        return result;
    }
}
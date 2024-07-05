
import { executeQuery } from './db.js';
import { getLengthsQuery, getLengthByIdQuery, addLengthQuery, deleteLengthQuery, updateLengthQuery } from '../queries/lengthQuery.js'

export class LengthService {

    async getLengths(queryparams) {
        const queryLength = getLengthsQuery(queryparams);
        const result = await executeQuery(queryLength);
        return result;
    }

    async getLengthById(id) {
        const queryLength = getLengthByIdQuery();
        const result = await executeQuery(queryLength, [id]);
        // console.log(result)
        return result;
    }

    async addLength(newLength) {
        console.log(newLength)
        const queryLength = addLengthQuery();
        const result = await executeQuery(queryLength, Object.values(newLength));
        return result;
    }

    async deleteLength(id) {
        const queryLength = deleteLengthQuery();
        const result = await executeQuery(queryLength, [id]);
        return result;
    }

    async updateLength(updatedLength, id) {
        let data = Object.values(updatedLength);
        data.push(id)
        const queryLength = updateLengthQuery(Object.keys(updatedLength));
        const result = await executeQuery(queryLength, data);
        return result;
    }
}
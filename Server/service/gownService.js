
import { executeQuery } from './db.js';
import { getGownsQuery, getGownByIdQuery, addGownQuery, deleteGownQuery, updateGownQuery } from './gownQuery.js'

export class GownService {

    async getGowns(queryparams) {
        const queryGown = getGownsQuery(queryparams);
        const result = await executeQuery(queryGown);
        for (let i = 0; i < result.length; i++) {
            if (result[i].available == null)
                result[i].available = result[i].amount;
        }
        console.log(result);
        return result;
    }

    async getGownById(id) {
        const queryGown = getGownByIdQuery();
        const result = await executeQuery(queryGown, [id]);
        console.log(result)
        return result;
    }

    async addGown(newGown) {
        const queryGown = addGownQuery();
        const result = await executeQuery(queryGown, Object.values(newGown));
        return result;
    }

    async deleteGown(id) {
        const queryGown = deleteGownQuery();
        await executeQuery(queryGown, [id]);
    }

    async updateGown(updatedGown, id) {
        let data = Object.values(updatedGown);
        data.push(id)
        const queryGown = updateGownQuery(Object.keys(updatedGown));
        await executeQuery(queryGown, data);
    }
}
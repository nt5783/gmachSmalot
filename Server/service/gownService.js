
import { executeQuery } from './db.js';
import { getGownsQuery, getGownByIdQuery, addGownQuery, deleteGownQuery, updateGownQuery } from '../queries/gownQuery.js'

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
        let result;
        const queryIsExsistGown = getGownsQuery({ model: newGown.model, sizeId: newGown.size })
        const isExsistGown = await executeQuery(queryIsExsistGown);
        console.log("querisExsistGown")
        console.log(isExsistGown)
        console.log(newGown)
        if (isExsistGown.length > 0) {
            const queryUpdate = updateGownQuery(['amount'])
            result = await executeQuery(queryUpdate, [isExsistGown.gownId, isExsistGown.amount + newGown.amount]);
        }
        else {
            const queryGown = addGownQuery();
            result = await executeQuery(queryGown, Object.values(newGown));
        }
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
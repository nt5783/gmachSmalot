
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
        const queryIsExistGown = getGownsQuery({ model: newGown.model, sizeId: newGown.size })
        const isExistGown = await executeQuery(queryIsExistGown);
        console.log("querisExistGown")
        console.log(isExistGown)
        console.log(newGown)
        if (isExistGown.length > 0) {
            const queryUpdate = updateGownQuery(["amount"])
            const updatedAmount=+isExistGown[0].amount + +newGown.amount;
            result = await executeQuery(queryUpdate, [updatedAmount, isExistGown[0].gownId]);
        }
        else {
            const queryGown = addGownQuery();
            result = await executeQuery(queryGown, Object.values(newGown));
        }
        return result;
    }

    async deleteGown(id) {
        const queryGown = deleteGownQuery();
        const result = await executeQuery(queryGown, [id]);
        return result;
    }

    async updateGown(updatedGown, id) {
        let data = Object.values(updatedGown);
        data.push(id)
        const queryGown = updateGownQuery(Object.keys(updatedGown));
        const result = await executeQuery(queryGown, data);
        return result;
    }
}
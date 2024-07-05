
import { executeQuery } from './db.js';
import { getSizesQuery, getSizeByIdQuery, addSizeQuery, deleteSizeQuery, updateSizeQuery } from '../queries/sizeQuery.js'

export class SizeService {

    async getSizes(queryparams) {
        const querySize = getSizesQuery(queryparams);
        const result = await executeQuery(querySize);
        return result;
    }

    async getSizeById(id) {
        const querySize = getSizeByIdQuery();
        const result = await executeQuery(querySize, [id]);
        // console.log(result)
        return result;
    }

    async addSize(newSize) {
        console.log(newSize)
        const querySize = addSizeQuery();
        const result = await executeQuery(querySize, Object.values(newSize));
        return result;
    }

    async deleteSize(id) {
        const querySize = deleteSizeQuery();
        const result =  await executeQuery(querySize, [id]);
        return result;
    }

    async updateSize(updatedSize, id) {
        let data = Object.values(updatedSize);
        data.push(id)
        const querySize = updateSizeQuery(Object.keys(updatedSize));
        const result = await executeQuery(querySize, data);
        return result;
    }
}
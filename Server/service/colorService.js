
import { executeQuery } from './db.js';
import { getColorsQuery, getColorByIdQuery, addColorQuery, deleteColorQuery, updateColorQuery } from '../queries/colorQuery.js'

export class ColorService {

    async getColors(queryparams) {
        const queryColor = getColorsQuery(queryparams);
        const result = await executeQuery(queryColor);
        return result;
    }

    async getColorById(id) {
        const queryColor = getColorByIdQuery();
        const result = await executeQuery(queryColor, [id]);
        // console.log(result)
        return result;
    }

    async addColor(newColor) {
        const queryColor = addColorQuery();
        const result = await executeQuery(queryColor, Object.values(newColor));
        return result;
    }

    async deleteColor(id) {
        const queryColor = deleteColorQuery();
        const result = await executeQuery(queryColor, [id]);
        return result;
    }

    async updateColor(updatedColor, id) {
        let data = Object.values(updatedColor);
        data.push(id)
        const queryColor = updateColorQuery(Object.keys(updatedColor));
        const result = await executeQuery(queryColor, data);
        return result;
    }
}
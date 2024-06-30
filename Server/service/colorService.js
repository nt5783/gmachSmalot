
import { executeQuery } from './db.js';
import { getColorsQuery, getColorByIdQuery, addColorQuery, deleteColorQuery, updateColorQuery } from './queryColor.js'

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
        await executeQuery(queryColor, [id]);
    }

    async updateColor(updatedColor, id) {
        let data = Object.values(updatedColor);
        data.push(id)
        const queryColor = updateColorQuery(Object.keys(updatedColor));
        await executeQuery(queryColor, data);
    }
}
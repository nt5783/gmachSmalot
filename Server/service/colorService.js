
import { executeQuery } from './db.js';
import { getColorsQuery, getColorByIdQuery, addColorQuery, deleteColorQuery, updateColorQuery } from './queryColor.js'

export class ColorService {

    async getColors(queryparams) {
        const queryColor = getColorsQuery(queryparams);
        const tempResult = await executeQuery(queryColor);
        const result=[]
        for (let i = 0; i < tempResult.length; i++) {
            result[i] = tempResult[i].color;
        }
        //  console.log(result);
        return result;
    }

    async getColorById(id) {
        const queryColor = getColorByIdQuery();
        const result = await executeQuery(queryColor, [id]);
        // console.log(result)
        return result;
    }

    async addColor(newColor) {
        console.log(newColor)
        const queryColor = addColorQuery();
        const result = await executeQuery(queryColor, [newColor]);
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
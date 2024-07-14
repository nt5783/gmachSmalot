
import { executeQuery } from './db.js';
import { getPropertiesQuery, getPropertyByIdQuery, addPropertyQuery } from '../queries/propertyQuery.js'

export class ColorService {
    async getColors(queryparams) {
        const queryColor = getPropertiesQuery(queryparams, 'color');
        const result = await executeQuery(queryColor);
        return result;
    }

    async getColorById(id) {
        const queryColor = getPropertyByIdQuery('color');
        const result = await executeQuery(queryColor, [id]);
        return result;
    }

    async addColor(newColor) {
        const queryColor = addPropertyQuery('color');
        const result = await executeQuery(queryColor, Object.values(newColor));
        return result;
    }
}
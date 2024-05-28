import { executeQuery } from './db.js';
import { getAllQuery, getByIdQuery, addItemQuery, updateItemQuery, deleteItemQuery, getByParamsQuery ,getByLimitQuery} from './queries.js'

export class Service {

    async getAll(tableName) {
        const query = getAllQuery(tableName);
        const result = await executeQuery(query);
        return result;
    }

    async getByLimit(tableName, params) {
        const query = getByLimitQuery(tableName);
        const result = await executeQuery(query,Object.values(params));
        return result;
    }
}
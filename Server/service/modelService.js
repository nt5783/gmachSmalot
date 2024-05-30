
import { executeQuery } from './db.js';
import { getModelQuery, getModelByIdQuery, addModelQuery, deleteModelQuery, updateModelQuery } from './queryModel.js'

export class ModelService {

    async getModel(queryparams) {
        const queryModel = getModelQuery(queryparams);
        const result = await executeQuery(queryModel);
        return result;
    }

    async getModelById(id) {
        const queryModel = getModelByIdQuery();
        const result = await executeQuery(queryModel, [id]);
        return result;
    }

    async addModel(newModel) {
        //const queryModel = addModelQuery();
        // const result = await executeQuery(queryModel, [newModel]);
        const queryModel = addModelQuery(Object.keys(newModel));
        const result = await executeQuery(queryModel, Object.values(newModel));
        return result;
    }

    async deleteModel(id) {
        const queryModel = deleteModelQuery();
        await executeQuery(queryModel, [id]);
    }

    async updateModel(updatedModel, id) {
        let data = Object.values(updatedModel);
        data.push(id)
        const queryModel = updateModelQuery(Object.keys(updatedModel), id);
        await executeQuery(queryModel, data);
    }

}
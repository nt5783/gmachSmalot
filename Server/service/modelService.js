
import { executeQuery } from './db.js';
import 'dotenv/config'
import { getModelQuery, getModelByIdQuery, addModelQuery, deleteModelQuery, updateModelQuery, getColorIdQuery, getSeasonIdQuery } from './modelQuery.js'

export class ModelService {

    async getModel(queryparams) {
        const queryModel = getModelQuery(queryparams);
        const result = await executeQuery(queryModel);
        for (let i = 0; i < result.length; i++) {
            if (!result[i].image)
                result[i].image = `http://${process.env.DB_HOST}:${process.env.DB_PORT}/img/deafult image.jpg`
            else
                result[i].image = `http://${process.env.DB_HOST}:${process.env.DB_PORT}/img/${result[i].image}`
        }
        return result;
    }

    async getModelById(id) {
        const queryModel = getModelByIdQuery();
        const result = await executeQuery(queryModel, [id]);
        if (!result[0].image)
            result[0].image = `http://${process.env.DB_HOST}:${process.env.DB_PORT}/img/deafult image.jpg`
        result[0].image = `http://${process.env.DB_HOST}:${process.env.DB_PORT}/img/${result[0].image}`
        return result;
    }

    async addModel(newModel) {
        const queryModel = addModelQuery();
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
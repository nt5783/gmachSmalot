import { executeQuery } from './db.js';
import 'dotenv/config'
import { getModelsQuery, getModelByIdQuery, addModelQuery, deleteModelQuery, updateModelQuery } from '../queries/modelQuery.js'

export class ModelService {

    async getModels(queryparams) {
        const queryModel = getModelsQuery(queryparams);
        const result = await executeQuery(queryModel);
        for (let i = 0; i < result.length; i++) {
            if (!result[i].image)
                result[i].image = `http://${process.env.DB_HOST}:${process.env.DB_PORT}/img/default image.jpg`
            else
                result[i].image = `http://${process.env.DB_HOST}:${process.env.DB_PORT}/img/${result[i].image}`
        }
        return result;
    }

    async getModelById(id) {
        const queryModel = getModelByIdQuery();
        const result = await executeQuery(queryModel, [id]);
        if (!result[0].image)
            result[0].image = `http://${process.env.DB_HOST}:${process.env.DB_PORT}/img/default image.jpg`
        else result[0].image = `http://${process.env.DB_HOST}:${process.env.DB_PORT}/img/${result[0].image}`
        return result;
    }

    async addModel(newModel) {
        try {
            console.log('newModel')
            console.log(newModel)
            //שיהיה אפשר להכניס בכל סדר
            const queryModel = addModelQuery(Object.keys(newModel));
            const result = await executeQuery(queryModel, Object.values(newModel));
            return result;
        }
        catch (err) {
            throw (err.errno == 1062 ? { statusCode: 409, message: "Model already exist" } : err)
        }
    }

    async deleteModel(id) {
        const queryModel = deleteModelQuery();
        const result = await executeQuery(queryModel, [id]);
        return result;
    }

    async updateModel(updatedModel, model) {
        console.log("updatedModel")
        console.log(updatedModel)
        let data = Object.values(updatedModel);
        data.push(model)
        console.log(data)
        const queryModel = updateModelQuery(Object.keys(updatedModel), model);
        const result = await executeQuery(queryModel, data);
        return result;
    }

}
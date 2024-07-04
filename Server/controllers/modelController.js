import { ModelService } from '../service/modelService.js'
const modelService = new ModelService();
export class ModelController {

    async getModels(req, res, next) {
        try {
            const resultItems = await modelService.getModels(req.query);
            if (resultItems.length == 0)
                throw new Error({ statusCode: 404 })
            return res.json(resultItems);
        }
        catch (ex) {
            const err = {}
            err.statusCode = ex.statusCode ?? 500;
            err.message = ex;
            next(err)
        }
    }

    async getModelById(req, res, next) {
        try {
            const resultItem = await modelService.getModelById(req.params.id);
            if (resultItem.length == 0)
                throw new Error({ statusCode: 404 })
            res.json(resultItem);
        }
        catch (ex) {
            const err = {}
            err.statusCode = ex.statusCode ?? 500;
            err.message = ex;
            next(err)
        }
    }

    async addModel(req, res, next) {
        try {
            const resultItem = await modelService.addModel(req.body);
            res.json(resultItem.insertId);
        }
        catch (ex) {
            const err = {}
            err.statusCode = ex.statusCode ?? 500;
            err.message = ex;
            next(err)
        }
    }

    async deleteModel(req, res, next) {
        try {
            await modelService.deleteModel(req.params.id);
            res.json(req.params.id);
        }
        catch (ex) {
            const err = {}
            err.statusCode = ex.statusCode ?? 500;
            err.message = ex;
            next(err)
        }
    }

    async updateModel(req, res, next) {
        try {
            const result = await modelService.updateModel(req.body, req.params.id);
            // if (result == null)
            //     throw ("this data cannot be updated")
            res.json(req.params.id);
        }
        catch (ex) {
            const err = {}
            // err.statusCode = ex == "this data cannot be updated" ? 409 : 500;
            err.statusCode = ex.statusCode ?? 500;
            err.message = ex;
            next(err)
        }
    }
}
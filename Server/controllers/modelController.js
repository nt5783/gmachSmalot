import { ModelService } from '../service/modelService.js'
const modelService = new ModelService();
export class ModelController {

    async getModels(req, res, next) {
        try {
            const resultItems = await modelService.getModels(req.query);
            if (resultItems.length == 0)
                throw { statusCode: 404, message: "Models not found" }
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
                throw { statusCode: 404, message: "Model not found" }
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
            if (!req.body.model || !req.body.colorId || !req.body.seasonId || !req.body.lengthId)
                throw { statusCode: 400, message: "Invalid parameters" }
            const resultItem = await modelService.addModel(req.body);
            if (resultItem.length == 0)
                throw { statusCode: 409, message: "Model already exist" }
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
            const result = await modelService.deleteModel(req.params.id);
            if (result.affectedRows === 0)
                throw { statusCode: 404, message: "Not valid action" }
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
            if (result.affectedRows === 0)
                throw { statusCode: 404, message: "Not valid action" }
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
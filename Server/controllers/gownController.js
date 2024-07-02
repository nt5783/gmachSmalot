import { GownService } from '../service/gownService.js'
            const gownService = new GownService();

export class GownController {
    async getGowns(req, res, next) {
        try {
            const resultItems = await gownService.getGowns(req.query);
            return res.status(200).json(resultItems);
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }

    async getGownById(req, res, next) {
        try {
            const resultItem = await gownService.getGownById(req.params.id);
            res.status(200).json(resultItem);
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }

    async addGown(req, res, next) {
        try {
            console.log(req.body)
            const resultItem = await gownService.addGown(req.body);
            res.status(200).json(resultItem.insertId);
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }

    async deleteGown(req, res, next) {
        try {
            await gownService.deleteGown(req.params.id)
            res.status(200).json(req.params.id);
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }

    async updateGown(req, res, next) {
        try {
            const result = await gownService.updateGown(req.body, req.params.id);
            // if (result == null)
            //     throw ("this data cannot be updated")
            res.status(200).json(req.params.id);
        }
        catch (ex) {
            const err = {}
            err.statusCode = ex == "this data cannot be updated" ? 409 : 500;
            err.message = ex;
            next(err)
        }
    }
}
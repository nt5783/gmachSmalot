import { LengthService } from '../service/lengthService.js'
            const lengthService = new LengthService();

export class LengthController {
    async getLengths(req, res, next) {
        try {
            const resultItems = await lengthService.getLengths(req.query);
            return res.status(200).json(resultItems);
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }

    async getLengthById(req, res, next) {
        try {
            const resultItem = await lengthService.getLengthById(req.params.id);
            res.status(200).json(resultItem);
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }

    async addLength(req, res, next) {
        try {
            console.log(req.body)
            const resultItem = await lengthService.addLength(req.body);
            res.status(200).json(resultItem.insertId);
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }

    async deleteLength(req, res, next) {
        try {
            await lengthService.deleteLength(req.params.id)
            res.status(200).json(req.params.id);
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }

    async updateLength(req, res, next) {
        try {
            const result = await lengthService.updateLength(req.body, req.params.id);
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
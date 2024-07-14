import { LengthService } from '../service/lengthService.js'
const lengthService = new LengthService();

export class LengthController {
    async getLengths(req, res, next) {
        try {
            const resultItems = await lengthService.getLengths(req.query);
            if (resultItems.length == 0)
                throw { statusCode: 404, message: "Lengths not found" }
            return res.json(resultItems);
        }
        catch (ex) {
            const err = {}
            err.statusCode = ex.statusCode ?? 500;
            err.message = ex;
            next(err)
        }
    }

    async getLengthById(req, res, next) {
        try {
            const resultItem = await lengthService.getLengthById(req.params.id);
            if (resultItem.length == 0)
                throw { statusCode: 404, message: "Length not found" }
            res.json(resultItem);
        }
        catch (ex) {
            const err = {}
            err.statusCode = ex.statusCode ?? 500;
            err.message = ex;
            next(err)
        }
    }

    async addLength(req, res, next) {
        try {
            if (!req.body.length)
                throw { statusCode: 400, message: "Invalid parameters" }
            const resultItem = await lengthService.addLength(req.body);
            res.json(resultItem.insertId);
        }
        catch (ex) {
            const err = {}
            err.statusCode = ex.statusCode ?? 500;
            err.message = ex;
            next(err)
        }
    }
}
import { SizeService } from '../service/sizeService.js'
const sizeService = new SizeService();

export class SizeController {
    async getSizes(req, res, next) {
        try {
            const resultItems = await sizeService.getSizes(req.query);
            if (resultItems.length == 0)
                throw { statusCode: 404, message: "Sizes not found" }
            return res.json(resultItems);
        }
        catch (ex) {
            const err = {}
            err.statusCode = ex.statusCode ?? 500;
            err.message = ex;
            next(err)
        }
    }

    async getSizeById(req, res, next) {
        try {
            const resultItem = await sizeService.getSizeById(req.params.id);
            if (resultItem.length == 0)
                throw { statusCode: 404, message: "Size not found" }
            res.json(resultItem);
        }
        catch (ex) {
            const err = {}
            err.statusCode = ex.statusCode ?? 500;
            err.message = ex;
            next(err)
        }
    }

    async addSize(req, res, next) {
        try {
            if (!req.body.size)
                throw { statusCode: 400, message: "Invalid parameters" }
            const resultItem = await sizeService.addSize(req.body);
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
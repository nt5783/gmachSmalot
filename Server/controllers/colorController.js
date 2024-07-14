import { ColorService } from '../service/colorService.js'
const colorService = new ColorService();

export class ColorController {
    async getColors(req, res, next) {
        try {
            const resultItems = await colorService.getColors(req.query);
            if (resultItems.length == 0)
                throw { statusCode: 404, message: "Colors not found" }
            return res.json(resultItems);
        }
        catch (ex) {
            const err = {}
            err.statusCode = ex.statusCode ?? 500;
            err.message = ex;
            next(err)
        }
    }

    async getColorById(req, res, next) {
        try {
            const resultItem = await colorService.getColorById(req.params.id);
            if (resultItem.length == 0)
                throw { statusCode: 404, message: "Color not found" }
            res.json(resultItem);
        }
        catch (ex) {
            const err = {}
            err.statusCode = ex.statusCode ?? 500;
            err.message = ex;
            next(err)
        }
    }

    async addColor(req, res, next) {
        try {
            if (!req.body.color)
                throw { statusCode: 400, message: "Invalid parameters" }
            const resultItem = await colorService.addColor(req.body);
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
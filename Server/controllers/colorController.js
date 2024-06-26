import { ColorService } from '../service/colorService.js'
            const colorService = new ColorService();

export class ColorController {
    async getColors(req, res, next) {
        try {
            const resultItems = await colorService.getColors(req.query);
            return res.status(200).json(resultItems);
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }

    async getColorById(req, res, next) {
        try {
            const resultItem = await colorService.getColorById(req.params.id);
            res.status(200).json(resultItem);
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }

    async addColor(req, res, next) {
        try {
            console.log(req.body)
            const resultItem = await colorService.addColor(req.body);
            res.status(200).json(resultItem.insertId);
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }

    async deleteColor(req, res, next) {
        try {
            await colorService.deleteColor(req.params.id)
            res.status(200).json(req.params.id);
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }

    async updateColor(req, res, next) {
        try {
            const result = await colorService.updateColor(req.body, req.params.id);
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
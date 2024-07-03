import { SizeService } from '../service/sizeService.js'
            const sizeService = new SizeService();

export class SizeController {
    async getSizes(req, res, next) {
        try {
            const resultItems = await sizeService.getSizes(req.query);
            return res.json(resultItems);
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }

    async getSizeById(req, res, next) {
        try {
            const resultItem = await sizeService.getSizeById(req.params.id);
            res.json(resultItem);
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }

    async addSize(req, res, next) {
        try {
            console.log(req.body)
            const resultItem = await sizeService.addSize(req.body);
            res.json(resultItem.insertId);
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }

    async deleteSize(req, res, next) {
        try {
            await sizeService.deleteSize(req.params.id)
            res.json(req.params.id);
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }

    async updateSize(req, res, next) {
        try {
            const result = await sizeService.updateSize(req.body, req.params.id);
            // if (result == null)
            //     throw ("this data cannot be updated")
            res.json(req.params.id);
        }
        catch (ex) {
            const err = {}
            err.statusCode = ex == "this data cannot be updated" ? 409 : 500;
            err.message = ex;
            next(err)
        }
    }
}
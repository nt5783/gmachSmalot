import { Service } from '../service/service.js'
            const gownService = new Service();

export class GownController {

    async getGowns(req, res, next) {
        try {
            const resultItems = Object.keys(req.query).length != 0 ? await gownService.getByParams('gowns', req.query) : await gownService.getAll('gowns')
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
            const resultItem = await gownService.getById('gowns', req.params.id);
            return res.status(200).json(resultItem[0]);
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
            const resultItem = await gownService.add('gowns', req.body);
            res.status(200).json({ id: resultItem.insertId });
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
            await gownService.delete('gowns', req.params.id);
            return res.status(200).json({});
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
            await gownService.update('gowns', req.params.id, req.body);
            res.status(200).json({ id: req.params.id });
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }
}
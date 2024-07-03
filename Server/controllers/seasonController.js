import { SeasonService } from '../service/seasonService.js'
            const seasonService = new SeasonService();

export class SeasonController {
    async getSeasons(req, res, next) {
        try {
            const resultItems = await seasonService.getSeasons(req.query);
            return res.json(resultItems);
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }

    async getSeasonById(req, res, next) {
        try {
            const resultItem = await seasonService.getSeasonById(req.params.id);
            res.json(resultItem);
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }

    async addSeason(req, res, next) {
        try {
            console.log(req.body)
            const resultItem = await seasonService.addSeason(req.body);
            res.json(resultItem.insertId);
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }

    async deleteSeason(req, res, next) {
        try {
            await seasonService.deleteSeason(req.params.id)
            res.json(req.params.id);
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }

    async updateSeason(req, res, next) {
        try {
            const result = await seasonService.updateSeason(req.body, req.params.id);
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
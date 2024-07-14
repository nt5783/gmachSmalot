import { SeasonService } from '../service/seasonService.js'
const seasonService = new SeasonService();

export class SeasonController {
    async getSeasons(req, res, next) {
        try {
            const resultItems = await seasonService.getSeasons(req.query);
            if (resultItems.length == 0)
                throw { statusCode: 404, message: "Seasons not found" }
            return res.json(resultItems);
        }
        catch (ex) {
            const err = {}
            err.statusCode = ex.statusCode ?? 500;
            err.message = ex;
            next(err)
        }
    }

    async getSeasonById(req, res, next) {
        try {
            const resultItem = await seasonService.getSeasonById(req.params.id);
            if (resultItem.length == 0)
                throw { statusCode: 404, message: "Season not found" }
            res.json(resultItem);
        }
        catch (ex) {
            const err = {}
            err.statusCode = ex.statusCode ?? 500;
            err.message = ex;
            next(err)
        }
    }

    async addSeason(req, res, next) {
        try {
            if (!req.body.season)
                throw { statusCode: 400, message: "Invalid parameters" }
            const resultItem = await seasonService.addSeason(req.body);
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
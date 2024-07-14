import { GownService } from '../service/gownService.js'
const gownService = new GownService();
//שולח שגיאה אם אין מידות אבל מבחינתי זה לא בעיה
export class GownController {
    async getGowns(req, res, next) {
        try {
            const resultItems = await gownService.getGowns(req.query);
            if (resultItems.length == 0)
                throw { statusCode: 404, message: "Gowns not found" }
            return res.json(resultItems);
        }
        catch (ex) {
            const err = {}
            err.statusCode = ex.statusCode ?? 500;
            err.message = ex;
            next(err)
        }
    }

    async getGownById(req, res, next) {
        try {
            const resultItem = await gownService.getGownById(req.params.id);
            if (resultItem.length == 0)
                throw { statusCode: 404, message: "Gown not found" }
            res.json(resultItem);
        }
        catch (ex) {
            const err = {}
            err.statusCode = ex.statusCode ?? 500;
            err.message = ex;
            next(err)
        }
    }

    async addGown(req, res, next) {
        try {
            if (!req.body.model || !req.body.size || !req.body.amount)
                throw { statusCode: 400, message: "Invalid parameters" }
            const resultItem = await gownService.addGown(req.body);
            res.json(resultItem.insertId);
        }
        catch (ex) {
            const err = {}
            err.statusCode = ex.statusCode ?? 500;
            err.message = ex;
            next(err)
        }
    }

    async deleteGown(req, res, next) {
        try {
            const result = await gownService.deleteGown(req.params.id)
            if (result.affectedRows === 0)
                throw { statusCode: 404, message: "Not valid action" }
            res.json(req.params.id);
        }
        catch (ex) {
            const err = {}
            err.statusCode = ex.statusCode ?? 500;
            err.message = ex;
            next(err)
        }
    }

    async updateGown(req, res, next) {
        try {
            const result = await gownService.updateGown(req.body, req.params.id);
            // if (result == null)
            //     throw ("this data cannot be updated")
            if (result.affectedRows === 0)
                throw { statusCode: 404, message: "Not valid action" }
            res.json(req.params.id);
        }
        catch (ex) {
            const err = {}
            // err.statusCode = ex == "this data cannot be updated" ? 409 : 500;
            err.statusCode = ex.statusCode ?? 500;
            err.message = ex;
            next(err)
        }
    }
}
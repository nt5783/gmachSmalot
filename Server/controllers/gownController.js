import { Service } from '../service/service.js'

export class TodoController {

    async getTodos(req, res, next) {
        try {
            const todoService = new Service();
            const resultItems = Object.keys(req.query).length != 0 ? await todoService.getByParams('todos', req.query) : await todoService.getAll('todos')
            return res.status(200).json(resultItems);
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }

    async getTodoById(req, res, next) {
        try {
            const todoService = new Service();
            const resultItem = await todoService.getById('todos', req.params.id);
            return res.status(200).json(resultItem[0]);
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }


    async addTodo(req, res, next) {
        try {
            const todoService = new Service();
            const resultItem = await todoService.add('todos', req.body);
            res.status(200).json({ id: resultItem.insertId });
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }

    async deleteTodo(req, res, next) {
        try {
            const todoService = new Service();
            await todoService.delete('todos', req.params.id);
            return res.status(200).json({});
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }

    async updateTodo(req, res, next) {
        try {
            const todoService = new Service();
            await todoService.update('todos', req.params.id, req.body);
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
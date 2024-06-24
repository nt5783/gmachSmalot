import { UserService } from "../service/userService.js";
const loginService = new UserService();

export class LoginController {

    async login(req, res, next) {
        try {
            if (req.body) {

                const resultItems = await loginService.login(req.body);
                if (resultItems.length == 0){
                    return res.status(409).json(resultItems);
                }
                return res.status(200).json(resultItems);
            }
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }

}
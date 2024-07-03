import { UserService } from "../service/userService.js";
const signupService = new UserService();

export class SignupController {

    async signUp(req, res, next) {
        try {
            if (req.body) {

                const resultItems = await signupService.signup(req.body);
                if (resultItems.length == 0){
                    return res.status(409).json(resultItems);
                }
                return res.json(resultItems);
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
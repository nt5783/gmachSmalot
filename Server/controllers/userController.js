import { UserService } from "../service/userService.js";
const userService = new UserService();

export class UserController {

    async signUp(req, res, next) {
        try {
            if (req.body) {

                const resultItems = await userService.signup(req.body);
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

    // async signup(req, res, next) {
    //     try {
    //         console.log("req.body")
    //         console.log(req.body)
    //         if (req.body) {
    //             const signupService = new Service();
    //             const hashPsw = sha256(req.body.psw.password);
    //             const userPsw = { username: req.body.psw.username, password: hashPsw };
    //             const resultItem = await signupService.getByParams('passwords', userPsw);
    //             if (resultItem.length > 0) {
    //                 res.status(409).json({});
    //             }
    //             else {
    //                 const resultItems = await signupService.add('users', req.body.user);
    //                 await signupService.add('passwords', userPsw);
    //                 res.status(200).json({ id: resultItems.insertId });
    //             }
    //         }
    //     }
    //     catch (ex) {
    //         const err = {};
    //         err.statusCode = 400;
    //         err.message = ex;
    //         next(err);
    //     }
    // }
}
import { UserService } from "../service/userService.js";
const signupService = new UserService();

export class SignupController {

    async signUp(req, res, next) {
        try {
            if (req.body) {
                const resultItems = await signupService.signup(req.body);
                if (resultItems.length == 0) {
                    //  return res.status(409).json(resultItems);
                    throw new Error({ statusCode: 409 })
                }
                const token = jwt.sign(
                    { userId: resultItems[0].userId, admin: resultItems[0].isManager },
                    process.env.RANDOM_TOKEN_SECRET,
                    { expiresIn: '20h' })
                return res.json({ token, data: resultItems[0] })
            }
        }
        catch (ex) {
            const err = {}
            err.statusCode = ex.statusCode ?? 500;
            err.message = ex;
            next(err)
        }
    }
}
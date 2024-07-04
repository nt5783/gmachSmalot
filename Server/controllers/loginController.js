import { UserService } from "../service/userService.js"
import jwt from 'jsonwebtoken'

const loginService = new UserService()

export class LoginController {

    async login(req, res, next) {
        try {
            if (req.body) {
                const resultItems = await loginService.login(req.body)
                if (resultItems.length == 0) return res.status(409).json(resultItems[0])
                const token = jwt.sign(
                    { userId: resultItems[0].userId, admin: resultItems[0].isManager },
                    process.env.RANDOM_TOKEN_SECRET,
                    { expiresIn: '20h' })
                return res.json({ token, data: resultItems[0] })
            }
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500
            err.message = ex
            next(err)
        }
    }

}
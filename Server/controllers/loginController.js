import { UserService } from "../service/userService.js";
const loginService = new UserService();
import jwt from 'jsonwebtoken'

export class LoginController {

    async login(req, res, next) {
        try {
            if (req.body) {

                const resultItems = await loginService.login(req.body);
                console.log('resultItems[0]')
                console.log(resultItems[0])
                console.log('resultItems length')
                console.log(resultItems.length)
                if (resultItems.length == 0) {
                    return res.status(409).json(resultItems[0]);
                }
                const token = jwt.sign(
                    { userId: resultItems.userId, admin: resultItems.isManager },
                    'A35nb4DLadJhM11h91xQ',
                    { expiresIn: '24h' });
                console.log('token')
                console.log(token)
                // resultItems[0].token = token
                delete resultItems[0].userId
                console.log('{ token: token, data: resultItems[0] }')
                console.log({ token: token, data: resultItems[0] })
                return res.status(200).json({ token: token, data: resultItems[0] });
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
import { executeQuery } from './db.js';
import { sha256 } from 'js-sha256'
import { getUserQuery, setUserQuery, getPasswordQuery, setPasswordQuery } from './queryUser.js'


export class UserService {

    async addUser(newUser) {
        //const queryModel = addModelQuery();
        // const result = await executeQuery(queryModel, [newModel])
        const queryUser = addModelQuery(Object.keys(newUser))
        const result = await executeQuery(queryUser, Object.values(queryUser))
        return result
    }

    async login(newUser) {
        const hashPsw = sha256(newUser.password)
        const queryPwd = getPasswordQuery()
        const doesUserExist = await executeQuery(queryPwd, [newUser.username, hashPsw]);
        if (doesUserExist.length > 0) {
            delete newUser.password

            const queryUser = getUserQuery()
            const user = await executeQuery(queryUser, [newUser.username])
            return user
        }
        return []
    }

    async signup(newUser) {
        const hashPsw = sha256(newUser.password)
        const queryPwd = getPasswordQuery()
        const doesUserExist = await executeQuery(queryPwd, [newUser.username, hashPsw])
        if (doesUserExist.length > 0) {
            return []
        }
        const addPwd = setPasswordQuery()
        const pwdResult = await executeQuery(addPwd, [newUser.username, hashPsw])
        delete newUser.password;
        if (pwdResult) {
            const addUser = setUserQuery(Object.keys(newUser))
            const userResult = await executeQuery(addUser, Object.values(newUser))
            const user = {username: newUser.username, fullName: newUser.fullName}
            return [user]
        }
        return []
    }

    // if (req.body) {
    //     const signupService = new Service()
    //     const hashPsw = sha256(req.body.psw.password)
    //     const userPsw = { username: req.body.psw.username, password: hashPsw }
    //     const resultItem = await signupService.getByParams('passwords', userPsw)
    //     if (resultItem.length > 0) {
    //         res.status(409).json({})
    //     }
    //     else {
    //         const resultItems = await signupService.add('users', req.body.user);
    //         await signupService.add('passwords', userPsw);
    //         res.status(200).json({ id: resultItems.insertId });
    //     }
    // }

}
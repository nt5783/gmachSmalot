import { executeQuery } from './db.js';
import { sha256 } from 'js-sha256'
import { getUserQuery, setUserQuery, getPasswordQuery, setPasswordQuery } from './queryUser.js'


export class UserService {

    async addUser(newUser) {
        const queryUser = addModelQuery(Object.keys(newUser))
        const result = await executeQuery(queryUser, Object.values(queryUser))
        return result
    }

    async login(newUser) {
        const hashPsw = sha256(newUser.password)
        const queryPwd = getPasswordQuery()
        const doesUserExist = await executeQuery(queryPwd, [newUser.username, hashPsw]);
        if (!doesUserExist || doesUserExist.length == 0) return [];
        const isManager = doesUserExist[0].isManager
        delete newUser.password;
        const queryUser = getUserQuery();
        const user = await executeQuery(queryUser, [newUser.username]);
        user[0].isManager = isManager
        return user
    }

    async signup(newUser) {
        const hashPsw = sha256(newUser.password)
        const queryPwd = getPasswordQuery()
        const doesUserExist = await executeQuery(queryPwd, [newUser.username, hashPsw])
        if (doesUserExist.length > 0) return []
        const addPwd = setPasswordQuery()
        const pwdResult = await executeQuery(addPwd, [newUser.username, hashPsw, 0])
        delete newUser.password;
        if (!pwdResult) return []
        const addUser = setUserQuery(Object.keys(newUser))
        const userResult = await executeQuery(addUser, Object.values(newUser))
        const user = { username: newUser.username, fullName: newUser.fullName }
        return [user]
    }
}
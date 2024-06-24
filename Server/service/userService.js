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
        console.log('newUser')
        console.log(newUser)
        const hashPsw = sha256(newUser.password)
        console.log('hashPsw')
        console.log(hashPsw)
        const queryPwd = getPasswordQuery()
        console.log('queryPwd')
        console.log(queryPwd)
        const doesUserExist = await executeQuery(queryPwd, [newUser.username, hashPsw]);
        console.log('doesUserExist')
        console.log(doesUserExist)
        if (doesUserExist.length > 0) {
            console.log('doesUserExist')
            console.log(doesUserExist.length)
            delete newUser.password
            
            const queryUser = getUserQuery()
            const user = await executeQuery(queryUser, [newUser.username])
            console.log('user')
            console.log(user)
            return user
        }
        return newUser
    }

    //צריכים לראות מה מחזירים
    async signup(newUser) {
        //check that not exist
        const hashPsw = sha256(newUser.password)
        const queryPwd = getPasswordQuery()
        const doesUserExist = await executeQuery(queryPwd, [newUser.username, hashPsw])
        console.log(doesUserExist)
        if (doesUserExist.length > 0) {
            return doesUserExist
        }
        const addPwd = setPasswordQuery()
        const pwdResult = await executeQuery(addPwd, [newUser.username, hashPsw])
        // const user = {username: body.username, }
        delete newUser.password;
        console.log(newUser)
        const addUser = setUserQuery(Object.keys(newUser))
        const userResult = await executeQuery(addUser, Object.values(newUser))
        console.log(userResult)
        return userResult
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
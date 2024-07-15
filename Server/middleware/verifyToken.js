import jwt from 'jsonwebtoken'

export function verifyToken(req, res, next) {
    const authorizationHeader = req.header('Authorization')
    if(authorizationHeader=='Bearer')
        throw { statusCode: 401, message: "Authorization token is missing" }
    const token = authorizationHeader.split(' ')[1].split('=')[1]
    if (!token)
        throw { statusCode: 401, message: "Authorization token is missing" }
    try {
        jwt.verify(token, process.env.RANDOM_TOKEN_SECRET)
        console.log('verified!!')
        next()
    } catch (ex) {
        console.log('not verified:(')
        const err = {}
        err.statusCode = ex.statusCode ?? 500;
        err.message = ex;
        next(err)
    }
}

export default verifyToken

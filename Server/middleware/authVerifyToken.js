import jwt from 'jsonwebtoken'

export function authVerifyToken(req, res, next) {
    const authorizationHeader = req.header('Authorization')
    if (authorizationHeader == 'Bearer')
        throw { statusCode: 401, message: "Authorization token is missing" }
    const token = authorizationHeader.split(' ')[1].split('=')[1]
    if (!token)
        throw { statusCode: 401, message: "Authorization token is missing" }
    try {
        const decodedToken = jwt.verify(token, process.env.RANDOM_TOKEN_SECRET)
        const isAdmin = decodedToken.admin;
        if (!isAdmin) throw { statusCode: 401, message: "Unauthorized" }
        next()
    } catch (ex) {
        const err = {}
        err.statusCode = ex.statusCode ?? 500;
        err.message = ex;
        next(err)
    }
}

export default authVerifyToken
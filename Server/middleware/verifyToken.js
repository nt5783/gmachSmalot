import jwt from 'jsonwebtoken'

export function verifyToken(req, res, next) {
    // const authorizationHeader = req.header('Authorization')
    // console.log('req')
    // console.log(req.headers)
    // console.log('authorizationHeader')
    // console.log(authorizationHeader)
    // const tokenParts = authorizationHeader.split(' ')
    // const tokenVar = tokenParts[1]
    // const token = tokenVar.split('=')[1]
    // // const token = authorizationHeader.split(' ')[1].split('=')[1]
    // console.log('token')
    // console.log(token)
    // if (!token) {
    //     return res.status(401).json({ message: 'Authorization token is missing' })
    // }
    try {
        // jwt.verify(token, process.env.RANDOM_TOKEN_SECRET)
        next()
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' })
    }
}

export default verifyToken

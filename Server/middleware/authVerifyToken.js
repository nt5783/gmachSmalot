import jwt from 'jsonwebtoken'

export function authVerifyToken(req, res, next) {
    const authorizationHeader = req.header('Authorization')
    const token = authorizationHeader.split(' ')[1].split('=')[1]
    if (!token) {
        return res.status(401).json({ message: 'Authorization token is missing' })
    }
    try {
        const decodedToken = jwt.verify(token, process.env.RANDOM_TOKEN_SECRET)
        const isAdmin = decodedToken.admin;
        console.log('isAdmin')
        console.log(isAdmin)
        if (!isAdmin) return res.status(401).json({ message: 'Unauthorized' })
        console.log('verified!!')
        next()
    } catch (error) {
        console.log('not verified:(')
        return res.status(401).json({ message: 'Invalid token' })
    }
}

export default authVerifyToken
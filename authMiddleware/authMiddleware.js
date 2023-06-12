import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

function authMiddleware(req, res, next) {
    const token = req.headers.authorization?.split(' ')[1] || req.query.token || req.cookies.token;

    if (!token ) {
        return res.status(401).json({ error: 'Token is not be provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.Secret_key);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Invalid Token' });
    }
}

export default authMiddleware;

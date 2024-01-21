const jwt = require('jsonwebtoken');
require('dotenv').config();

function verifyJWT(req, res, next) {
    const authHeader = req.headers.authorization;

    
    if (!authHeader)
        return res.status(401).json({ message: 'No token provided' });
    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err)
            return res.status(403).json({ message: 'Failed to authenticate token' });

        req.userId = decoded.userId;
        next();
    });
}

module.exports = verifyJWT;

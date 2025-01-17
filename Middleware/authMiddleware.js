const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).send({ message: "Access token not provided." });
    }

    jwt.verify(token, 'Nbyws45/^/.4', (err, decoded) => {
        if (err) {
            return res.status(403).send({ messagge: "Invalid token." });
        }
        req.user = decoded;
        next();
    });
}


// function isAdmin(req, res, next) {
//     if (req.user && req.user.role === 'admin') {
//         next();
//     } else {
//         return res.status(403).send("Unauthorized");
//     }
// }

module.exports = { authenticateToken };
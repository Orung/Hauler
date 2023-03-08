const jwt = require('jsonwebtoken');


const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if(!authHeader?.startsWith('Bearer ')) return  res.sendStatus(401);
    console.log(authHeader);
    const token = authHeader.split(' ')[1];
    jwt.verify(
        token,
        'dfc31d6452fa8ada3a2d55a54e42d669261604e8ef8fef7ffa0619d40452044680d8e04f022a16a2e0b48b020687125b0f031195efb572ae8f918db2e47d2e8d',
        (err, decoded) =>{
            if(err) return res.sendStatus(403); //invalid token
            req.user = decoded.UserInfo.username;
            req.roles = decoded.UserInfo.roles;
            next();
        }
    )
}

module.exports = verifyJWT
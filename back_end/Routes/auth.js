const jwt = require('jsonwebtoken')

const authToken = (req, res, next)=>{
    const authHeader = req.headers['authorisation']
    const token = authHeader && authHeader.split(" ")[1]

    if(!token){
        return res.status(400).json({message : "Authorisation token est requis"})
    }

    jwt.verify(token, 'TM', (err, user)=>{
        if(err){
            return res.status(400).json({message : "Token Incorrect ou expriré"})
        }

        req.user = user
        next()
    })
}

module.exports = authToken
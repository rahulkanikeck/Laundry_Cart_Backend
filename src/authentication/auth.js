const jwt = require('jsonwebtoken')
const secret = 'JWTAUTH'

const authentication = (req , res , next) => {
    const token = req.headers.authorization;

    if(!token){
        return res.status(401).json({
            status : "Failed",
            meaasage: "Token is Missing / Not a valid User"
        })
    }
    else{
        try{
            jwt.verify(token, secret, function(err, decoded) {
                if(err){
                    return res.status(403).json({
                        status: "Failed",
                        message: "Not a valid token"
                    })
                }
                req.user = decoded.data
                //console.log(typeof(req.user));
                next()
            });
        }
        catch(e){
            return res.status(500).json({
                status: "Failed",
                message: "Internal Server Error " + err.message,
              });
        }
    }
}

module.exports = authentication
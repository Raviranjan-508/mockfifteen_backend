const jwt = require('jsonwebtoken');
require('dotenv').config();

const authentication = (req,res,next) => {
    if(!req.headers.authentication)
    {
        res.status(422).json({ error : "1Please Login Again" })
    }

    const token = req.headers.authentication.split(" ")[1];
    jwt.verify(token , process.env.SECRET , function(err , decoded) {
        if(err){
            res.send('2Please Login');
        }
        else{
            req.body.userId = decoded.userId;
            next();
        }
    })
}

module.exports = {
    authentication
}
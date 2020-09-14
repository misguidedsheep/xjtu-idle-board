let express = require('express');
let router = express.Router();
var jwt = require('jsonwebtoken');
var constant = require('../private/constant');

/* GET home page. */
router.use(function(req, res, next) {
    console.log('be about to get token')
    let token = req.headers.authorization.replace("Bearer ", "");
    console.log(token)
    jwt.verify(token, constant.secretKey, function(err, decoded){
        if(err){
            console.log('Error (from getUserName.js)')
            res.send('ERROR');
            res.end();
        }else{
            res.send(decoded.userName);
            res.end();
        }
    })
});

module.exports = router;
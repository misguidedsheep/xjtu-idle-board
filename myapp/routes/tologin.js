let express = require('express');
let router = express.Router();
var jwt = require('jsonwebtoken')
var constant = require('../private/constant')

/* GET home page. */
router.use(function(req, res, next){
    id = req.body.userID;
    key = req.body.key;
    signJWT(res, id);
})

function signJWT(res, id){
    var resMsg = JSON.stringify({
        result: 'ok',
        token: jwt.sign ({
          // algorithm默认为HS256, 其实不加也行
          algorithm: 'HS256',
          //以秒表示或描述时间跨度zeit / ms的字符串。如60，"2days"，"10h"，"7d"，Expiration time，过期时间
          issuer: 'Reina',
          subject: 'normal',
          user_name: id,
        }, constant.secretKey,
        {expiresIn: 60})
    });
    res.send(resMsg)
}

module.exports = router;
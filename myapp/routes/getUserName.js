let express = require('express');
let router = express.Router();
var jwt = require('jsonwebtoken');
var constant = require('../private/constant');

// 根据Token获取用户名
// 错误处理标准化 √√
router.use(function(req, res, next) {
    console.log('be about to get token')
    let token = req.headers.authorization.replace("Bearer ", "");
    console.log(token)
    jwt.verify(token, constant.secretKey, function(err, decoded){
        if(err){
            // ! JWT验证错误
            errorMsg = 'ERROR: TOKEN_VERIFY_ERROR (Router: getUserName)'
            res.send(errorMsg);
            console.log(errorMsg, err)
        }else{
            // √ JWT验证成功
            res.send(decoded.userName);
        }
    })
});

module.exports = router;
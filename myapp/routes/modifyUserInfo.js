let express = require('express');
let router = express.Router();
const database = require('../database');
const jwt = require('jsonwebtoken');
const constant = require('../private/constant')

/* GET home page. */
router.use(function(req, res, next) {
    console.log('be about to get userInfo')
    // 验证token, 获取用户名
    let token = req.headers.authorization.replace("Bearer ", "");
    var userName;
    console.log('getToken: ', token)
    jwt.verify(token, constant.secretKey, function(err, decoded){
        if(err){
            console.log('Error: routes/getUserInfo.js')
            res.end('ERROR');
        }else{
            userName = decoded.userName;
        }
    })

    var userDescription = req.query.userDescription;
    var userQQ = req.query.userQQ;
    var userWeChat = req.query.userWeChat;

    // 从mysql查询
    sql = `UPDATE Users SET UserDescription='${userDescription}',UserQQ='${userQQ}',UserWeChat='${userWeChat}' WHERE UserName='${userName}'`
    console.log('sql', sql);
    database.connection.query(sql, function(err, result){
        if(err){
            console.error(err);
            res.send("ERROR")
        }
        else{
            console.log(result);
            res.send("OK")
        }
    })

});

module.exports = router;
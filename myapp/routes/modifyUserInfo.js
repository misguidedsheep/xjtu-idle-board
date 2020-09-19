let express = require('express');
let router = express.Router();
const database = require('../database');
const jwt = require('jsonwebtoken');
const constant = require('../private/constant')

// 修改用户信息
// 错误处理标准化 √√
router.use(function(req, res, next) {
    // 验证 token, 获取用户名
    let token = req.headers.authorization.replace("Bearer ", "");
    var userName;
    jwt.verify(token, constant.secretKey, function(err, decoded){
        if(err){
            // ! JWT验证错误
            let errMsg = 'ERROR: JWT_VERIFY_ERROR (Router: modifyUserInfo)'
            res.send(errMsg);
            console.log(errMsg, err);
        }else{
            userName = decoded.userName;
        }
    })

    var userDescription = req.query.userDescription;
    var userQQ = req.query.userQQ;
    var userWeChat = req.query.userWeChat;

    // 从mysql查询
    sql = `UPDATE Users SET UserDescription='${userDescription}',UserQQ='${userQQ}',UserWeChat='${userWeChat}' WHERE UserName='${userName}'`
    database.connection.query(sql, function(err, result){
        if(err){
            // ! SQL查询错误
            let errMsg = "ERROR: SQL_QUERY_ERROR (Router: modifyUserInfo)";
            res.send(errMsg);
            console.log(errMsg, err);
        }else{
            // √ SQL查询成功
            res.send("OK")
        }
    })

});

module.exports = router;
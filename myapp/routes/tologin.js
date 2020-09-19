let express = require('express');
let router = express.Router();
var jwt = require('jsonwebtoken')
var constant = require('../private/constant')
const database = require('../database')

// 登录, 签发 token
// 错误处理标准化 √√
router.use(function(req, res, next){
    id = req.body.userID;
    key = req.body.key;
    sql = `SELECT * FROM Users WHERE (NetID='${id}' AND  UserKey='${key}') OR (UserName='${id}' AND UserKey='${key}')`;
    database.connection.query(sql, function(err, result){
        if (err){
            // ! SQL查询错误
            let errMsg = "ERROR: SQL_QUERY_ERROR (Router: tologin)";
            res.send(errMsg);
            console.log(errMsg, err);
        }else{
            // % SQL查询成功
            if(result.length!=0){
                // √ 查询结果有结果, 签发 token
                var userID = result[0].UserID;
                var netID = result[0].NetID;
                var userName = result[0].UserName;

                console.log(sql);
                var resMsg = JSON.stringify({
                    result: 'ok',
                    token: jwt.sign ({
                    // algorithm默认为HS256, 其实不加也行
                    algorithm: 'HS256',
                    subject: 'normal',
                    issuer: 'Reina',
                    userID: userID,
                    netID: netID,
                    userName: userName
                    }, constant.secretKey,{
                        expiresIn: constant.expiresIn
                    })
                });
                res.send(resMsg)
            }else{
                // ! SQL查询无结果错误
                let errMsg = "ERROR: SQL_NO_RESULT (Router: tologin)";
                res.send(errMsg);
                console.log(errMsg, err);
            }
        }
    })
});


module.exports = router;
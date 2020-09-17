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
            return;
        }else{
            //jwt验证成功
            userName = decoded.userName;
            sql = `SELECT * FROM Users WHERE UserName='${userName}'`
            console.log('sql', sql);
            database.connection.query(sql, function(err, result){
                if(err) console.error(err);
                else{
                    if(result.length != 0){
                        user = result[0]
                        res.json({
                            userID: user.UserID,
                            netID : user.NetID,
                            userName : user.UserName,
                            userDescription: user.UserDescription,
                            userOldNewRate: user.userOldNewRate,
                            userQQ: user.UserQQ,
                            userWeChat: user.UserWeChat
                        })
                        return;
                    }else{
                        res.send("ERROR from getuserInfo.js")
                        return;
                    }
                }
            })
        }
    })

    // 从mysql查询
    

});

module.exports = router;
let express = require('express');
let router = express.Router();
var jwt = require('jsonwebtoken')
var constant = require('../private/constant')
const database = require('../database')

/* GET home page. */
router.use(function(req, res, next){
    id = req.body.userID;
    key = req.body.key;
    sql = `SELECT * FROM Users WHERE (NetID='${id}' AND  UserKey='${key}') OR (UserName='${id}' AND UserKey='${key}')`;
    database.connection.query(sql, function(err, result){
        if (err){
            console.log(err);
            res.send("ERROR");
        }else{
            console.log(result);
            if(result.length!=0){
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
                res.send("ERROR");
            }
        }
    })
});


module.exports = router;
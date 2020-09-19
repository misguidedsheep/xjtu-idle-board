let express = require('express');
let router = express.Router();
const database = require('../database');
const jwt = require('jsonwebtoken');
const constant = require('../private/constant')

// 获取卖家信息
// 错误处理标准化 √√
router.use(function (req, res, next) {

    // 验证token, 获取用户名
    let token = req.headers.authorization.replace("Bearer ", "");
    jwt.verify(token, constant.secretKey, function (err, decoded) {
        if (err) {
            // ! JWT验证错误
            let errMsg = 'ERROR: JWT_VERIFY_ERROR (Router: getItemUserInfo)'
            res.send(errMsg);
            console.log(errMsg, err);
            return;
        } else {
            // % JWT验证成功, 获取要查询的用户名 (得到商品卖家的信息, 用户名不可以直接用Token中的信息)
            let userName = req.query.userName
            let sql = `SELECT * FROM Users WHERE UserName='${userName}'`
            console.log('sql', sql);
            database.connection.query(sql, function (err, result) {
                if (err) {
                    // ! SQL查询错误
                    let errMsg = 'ERROR: SQL_QUERY_ERROR (Router: getItemUserInfo)'
                    res.send(errMsg);
                    // 特例不作log
                    // console.log(errMsg);
                    return;
                } else {
                    // % SQL查询成功
                    if (result.length != 0) {
                        // √ 查询结果有结果, 返回SQL结果
                        user = result[0]
                        res.send(user)
                        return;
                    } else {
                        // ! SQL查询无结果错误
                        let errMsg = "ERROR: SQL_NO_RESULT (Router: getItemUserInfo)"
                        res.send(errMsg);
                        console.log(errMsg, err);
                        return;
                    }
                }
            })
        }
    })
});

module.exports = router;
let express = require('express');
let router = express.Router();
const database = require('../database');
const jwt = require('jsonwebtoken');
const constant = require('../private/constant')

// 更改商品状态 
// 错误处理标准化 √√
router.use(function (req, res, next) {
    // 验证token, 获取用户名
    let token = req.headers.authorization.replace("Bearer ", "");
    var userName;
    console.log('getToken: ', token)
    jwt.verify(token, constant.secretKey, function (err, decoded) {
        if (err) {
            // ! JWT验证错误
            let errMsg = 'ERROR: JWT_VERIFY_ERROR (Router: changeItemStatus)'
            res.send(errMsg);
            console.log(errMsg);
            return;
        } else {
            // % JWT验证成功
            let isOnSale = ''
            if (req.query.onSale == 'true') isOnSale = 'true'; else isOnSale = 'false';
            let itemID = req.query.itemID;

            console.log('isOnSale', isOnSale)
            sql = `UPDATE Items set OnSale=${isOnSale} WHERE ItemID='${itemID}'`
            if (req.query.toDelete == 'true') {
                sql = `DELETE FROM Items WHERE ItemID='${itemID}'`
            }
            console.log('sql', sql);
            database.connection.query(sql, function (err, result) {
                if (err) {
                    // ! SQL查询错误
                    let errMsg = 'ERROR: SQL_QUERY_ERROR (Router: changeItemStatus)'
                    res.send(errMsg);
                    console.log(errMsg);
                } else {
                    // % SQL查询成功
                    if (result.length != 0) {
                        // √ SQL查询有结果
                        res.send(result)
                    } else {
                        // ! SQL查询无结果错误
                        let errMsg = "ERROR: SQL_NO_RESULT (Router: getItemUserInfo)"
                        res.send(errMsg);
                        console.log(errMsg);
                        return;
                    }
                }
            })
        }
    })
});


module.exports = router;
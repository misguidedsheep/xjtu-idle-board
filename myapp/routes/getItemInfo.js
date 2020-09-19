let express = require('express');
let router = express.Router();
const database = require('../database');



// 获取商品信息
// 错误处理标准化 √√
router.use(function (req, res, next) {

    itemID = parseInt(req.query.itemID);
    sql = `SELECT * FROM Items WHERE ItemID=${itemID}`
    database.connection.query(sql, function (err, result) {
        if (err) {
            // ! SQL查询错误
            errMsg = "ERROR: SQL_QUERY_ERROR (Router: getItemInfo)";
            res.send(errMsg);
            console.log(errMsg);
        } else {
            // % SQL查询成功
            if (result.length != 0) {
                // √ 查询成功, 返回SQL查询结果
                res.send(result[0])
            } else {
                // ! SQL查询无结果错误
                errMsg = "ERROR: SQL_NO_RESULT (Router: getItemInfo)";
                res.send(errMsg);
                console.log(errMsg);
            }
        }
    })

});

module.exports = router;
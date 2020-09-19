let express = require('express');
let router = express.Router();
const database = require('../database');
const jwt = require('jsonwebtoken');
const constant = require('../private/constant')

// 验证注册链接
// 错误处理标准化 √√
router.use(function (req, res, next) {
	var urlToken = req.query.urlToken;
	var token = urlToken.replace("@@", '.').replace("@@", '.');
	jwt.verify(token, constant.secretKey, function (err, decoded) {
		if (err) {
			// ! JWT验证错误
			let errMsg = 'ERROR: JWT_VERIFY_ERROR (Router: registerVerify)'
			res.send(errMsg);
			console.log(errMsg, err)
			return;
		} else {
			// % JWT验证成功, 添加数据到数据库
			var netID = decoded.netID
			var userName = decoded.userName
			var key = decoded.key

			sql = `INSERT INTO Users  (NetID, UserName, UserKey) value ("${netID}", "${userName}", '${key}');`;
			database.connection.query(sql, function (err, result) {
				if (err) {
					// ! SQL查询错误
					let errMsg = 'ERROR: SQL_QUERY_ERROR (Router: registerVerify)'
					res.send(errMsg);
					console.log(errMsg, err)
				}
				else {
					// √ 正常返回
					// 成功反馈
					res.send("注册成功");
				}
			})
		}
	})

	// 从mysql查询


});

module.exports = router;
let express = require('express');
let router = express.Router();
const database = require('../database');
const jwt = require('jsonwebtoken');
const constant = require('../private/constant')

// 获取用户发布的商品信息
// 错误处理标准化 √√
router.use(function (req, res, next) {
	// 验证 token, 获取用户名
	let token = req.headers.authorization.replace("Bearer ", "");
	var userName;
	jwt.verify(token, constant.secretKey, function (err, decoded) {
		if (err) {
			// ! JWT验证错误
			let errMsg = 'ERROR: JWT_VERIFY_ERROR (Router: getUserItemInfo)'
			res.send(errMsg);
			console.log(errMsg, err);
		} else {
			// % JWT验证成功
			userName = decoded.userName;
			sql = `SELECT * FROM Items WHERE UserName='${userName}'`
			database.connection.query(sql, function (err, result) {
				if (err) {
					// ! SQL查询错误
					let errMsg = "ERROR: SQL_QUERY_ERROR (Router: getUserItemInfo)";
					res.send(errMsg);
					console.log(errMsg, err);
				} else {
					// % SQL查询成功
					if (result.length != 0) {
						// √ 查询结果有结果, 返回SQL结果
						res.send(result)
					} else {
						// ! SQL查询无结果错误
						let errMsg = "ERROR: SQL_NO_RESULT (Router: getUserItemInfo)";
						res.send(errMsg);
						console.log(errMsg, err);
					}
				}
			})
		}
	})
});


module.exports = router;
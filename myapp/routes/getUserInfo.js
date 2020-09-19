let express = require('express');
let router = express.Router();
const database = require('../database');
const jwt = require('jsonwebtoken');
const constant = require('../private/constant');

// 获取用户信息
// 错误处理标准化 √√
router.use(function (req, res, next) {
	console.log('be about to get userInfo')
	// 验证token, 获取用户名
	let token = req.headers.authorization.replace("Bearer ", "");
	jwt.verify(token, constant.secretKey, function (err, decoded) {
		if (err) {
			// ! JWT验证错误
			let errMsg = 'ERROR: JWT_VERIFY_ERROR (Router: getUserInfo)'
			res.send(errMsg);
			console.log(errMsg);
			console.log('Error: routes/getUserInfo.js')
			res.end('ERROR');
			return;
		} else {
			// % JWT验证成功
			var userName = decoded.userName;
			sql = `SELECT * FROM Users WHERE UserName='${userName}'`
			console.log('sql', sql);
			database.connection.query(sql, function (err, result) {
				if (err) {
					// ! SQL查询错误
					let errMsg = "ERROR: SQL_QUERY_ERROR (Router: getUserInfo)";
					res.send(errMsg);
					console.log(errMsg);
				} else {
					// % SQL查询成功
					if (result.length != 0) {
						// √ 查询结果有结果, 返回SQL结果
						res.send(result[0])
						return;
					} else {
						// ! SQL查询无结果错误
						let errMsg = "ERROR: SQL_NO_RESULT (Router: getUserInfo)";
						res.send(errMsg);
						console.log(errMsg);
						res.send("ERROR from getuserInfo.js")
						return;
					}
				}
			})
		}
	})
});

module.exports = router;
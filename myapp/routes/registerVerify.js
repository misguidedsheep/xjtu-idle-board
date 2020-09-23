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
			var sql = "SELECT * FROM Users Where NetID ='${netID}'";
			database.connection.query(sql, function(err, result){
				if (result.length != 0){
					// 已经注册过了, 防止重复注册
					res.render('registerSuccess', {
						reiminder: '<h3>已经注册成功，请不要重新注册</h3>' + 
						`<a href="/index" class="btn btn-success"返回主页 &raquo;</a>`
					})
					console.log(errMsg, err)
				}else{
					// 注册成功, 写入用户表
					var sql = `INSERT INTO Users  (NetID, UserName, UserKey) value ("${netID}", "${userName}", '${key}');`;
					database.connection.query(sql, function (err, result) {
						if (err) {
							// ! SQL查询错误
							let errMsg = 'ERROR: SQL_QUERY_ERROR (Router: registerVerify)'
						}
						else {
							// √ 正常返回
							// 成功反馈
							res.render('registerSuccess', {
								reminder: `<h3>注册成功</h3><hr><h5>NetID: ${netID}</h5>  <h5>用户名: ${userName}</h5> <br> <h5>登录后即可发布闲置 | 进入用户页可以改变商品上架状态</h5> <br> ` + 
								`<a href="/login" class="btn btn-success">现在登录 &raquo;</a>`
							})
						}
					})
				}
			})
			
		}
	})

	// 从mysql查询


});

module.exports = router;
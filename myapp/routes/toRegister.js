let express = require('express');
let router = express.Router();
var jwt = require('jsonwebtoken');
var constant = require('../private/constant');
const nodemailer = require("nodemailer");
const database = require('../database');

// 定义邮件服务器
var transporter = nodemailer.createTransport({
	host: constant.emailHost,
	service: constant.emailService,
	secure: true,
	auth: {
		user: constant.emailUser,
		pass: constant.emailSMTPSecret
	}
});

// 根据注册信息发送验证邮件
// 错误处理标准化 √√
router.use(function (req, res, next) {

	// 获取前端传递过来的参数
	var netID = req.body.netID;
	var userName = req.body.userName;
	var key = req.body.key;



	// 查询数据库 查看netID和用户名是否已经存在
	sql = `SELECT * FROM Users WHERE NetID='${netID}' OR UserName='${userName}'`;
	database.connection.query(sql, function (err, result) {
		if (err) {
			// ! SQL查询错误
			let errMsg = 'ERROR: SQL_QUERY_ERROR (Router: toRegister)'
			res.send(errMsg)
			console.log(errMsg, err)
		} else {
			// % SQL查询成功
			if (result.length != 0) {
				// ! 用户已经存在错误
				let errMsg = "ERROR: USER_EXIST_ERROR (Router: toRegister)"
				res.send(errMsg);
				console.log(errMsg, err);
				return;
			} else {
				// % 无重复用户，允许生成注册链接
				var token = jwt.sign({
					subject: 'register',
					issuer: 'Reina',
					netID: netID,
					userName: userName,
					key: key
				}, constant.secretKey, {
					// 过期时间:20分钟
					expiresIn: 1200
				});

				// 对token特殊处理, 以适应网址 (由于replace()只能替换一次，所以使用两次就没问题了)
				url_token = token.toString().replace(".", "@@").replace(".", "@@");
				let url = `${constant.host}/verify?urlToken=${url_token}`;

				// 发送邮件
				var sendHtml = `<div><img src="https://s1.ax1x.com/2020/09/18/w4RjII.jpg" alt="w4RjII.jpg" border="0" /></div><h4>最后一步！点击链接完成注册: <a href="${url}">验证链接</a></h4>`;

				var mailOptions = {
					// 发送邮件的地址
					from: 'reinaxxxxa@163.com', 
					// 接收邮件的地址
					to: `${netID}@stu.xjtu.edu.cn`,
					// 邮件主题
					subject: '闲置公告板注册验证',
					// 以HTML的格式显示，这样可以显示图片、链接、字体颜色等信息
					html: sendHtml
				};

				// ? 发送邮件，并有回调函数
				transporter.sendMail(mailOptions, function (err, info) {
					if (err) {
						// ! 发送邮件错误
						let errMsg = 'ERROR: MAIL_SEND_ERROR (Router: toRegister)';
						res.send(errMsg)
						console.log(errMsg, err)
						return;
					} else {
						// √ 正常返回
						console.log('Message sent: ' + info.response);
						res.send('OK');
					}
				});

			}
		}
	})

});

module.exports = router;
let express = require('express');
let router = express.Router();
const database = require('../database');

// 提交商品信息
// 错误处理标准化 √√
router.use(function (req, res, next) {
	form = JSON.parse(req.body.formData)
	sql = 'Insert into Items' +
		' (ItemName, ItemPrice, ItemDescription, ItemOldNewRate, ' +
		'CoverFileName, DeliverByPost,' +
		' DeliverByFace, DeliverNoNeed, ' +
		'Remarks, UserName) values' + `('${form.itemName}', ${form.itemPrice}, '${form.itemDescription}', '${form.itemOldNewRate}', ` +
		`'${form.coverFileName}', ${(form.hasOwnProperty("deliverByPost")) ? true : false}, ` +
		`${(form.hasOwnProperty("deliverByFace")) ? true : false}, ${(form.hasOwnProperty("deliverNoNeed")) ? true : false}, ` +
		`'${form.remarks}' , '${form.userName}')`;
	result = database.connection.query(sql, function (err, result) {
		if (err) {
			// ! SQL查询错误
			let errMsg = "ERROR: SQL_QUERY_ERROR (Router: tosubmit)";
			res.send(errMsg);
			console.log(errMsg, err);
		} else {
			// √ SQL查询成功
			res.send("OK")
		}
	})

});

module.exports = router;
var express = require('express');
var router = express.Router();
var fs = require('fs');
var imageSize = require("image-size");
const database = require('../database');
const { join } = require('path');
const ejs = require('ejs');



// 错误处理标准化 √√
function getCardSet(sql, res) {
	database.connection.query(sql, function (err, result) {
		if (err) {
			// ! SQL查询错误
			errMsg = 'ERROR: SQL_QUERY_ERROR (Router: index)'
			res.send(errMsg);
			console.log(errMsg, err);
			return;
		} else {
			// √ 查询成功, 可以返回卡片组
			var cardSet = ''
			var cardDir = join(__dirname, '../views/especial/index/card.ejs');
			var cardOffShelfDir = join(__dirname, '../views/especial/index/cardOffShelf.ejs');
			var generatorCard = ejs.compile(fs.readFileSync(cardDir, 'utf8'));
			var generatorCardOffShelf = ejs.compile(fs.readFileSync(cardOffShelfDir, 'utf8'));
			result.forEach(item => {
				shape = imageSize(join(__dirname, `../public/upload/${item.CoverFileName}`))
				if (item.OnSale){
					// 如果在售
					cardSet += generatorCard({
						coverFileName: item.CoverFileName,
						aspectRatio: shape.width/shape.height,
						itemName: item.ItemName,
						itemPrice: item.ItemPrice,
						itemDescription: item.ItemDescription,
						itemID: item.ItemID,
						trans: {
							deliverByPost: item.DeliverByPost ? true : false,
							deliverByFace: item.DeliverByFace ? true : false,
							deliverNoNeed: item.DeliverNoNeed ? true : false
						}
					});
				}else{
					// 如果下架
					cardSet += generatorCardOffShelf({
						coverFileName: item.CoverFileName,
						aspectRatio: shape.width/shape.height,
						// coverFileHeight: shape.height,
						// coverFileWidth: shape.width,
						itemName: item.ItemName,
						itemPrice: item.ItemPrice,
						itemDescription: item.ItemDescription,
						itemID: item.ItemID,
						trans: {
							deliverByPost: item.DeliverByPost ? true : false,
							deliverByFace: item.DeliverByFace ? true : false,
							deliverNoNeed: item.DeliverNoNeed ? true : false
						}
					})
				}
			});
			res.json({
				'cardNum': result.length,
				'cardSet': cardSet
			})
		}
	});
}


router.get('/search=:searchExp-sort=:sortMode-min=:minPrice-max=:maxPrice-start=:loadStart-limit=:loadLimit', function (req, res) {

	let toSearch = true;
	let toSort = true;

	let sortMode = req.params.sortMode;
	let searchExp = req.params.searchExp;

	let rangeCode = 'ItemPrice BETWEEN ' + req.params.minPrice + ' and ' + req.params.maxPrice;

	switch (sortMode) {
		case 'price_up': sortCode = 'ORDER BY ItemPrice ASC'; break;
		case 'price_down': sortCode = 'ORDER BY ItemPrice DESC'; break;
		case 'date_down': sortCode = 'ORDER BY ItemID DESC'; break;
		case 'null': toSort = false; break;
		default: res.send('Invalid Sort Method ERROR'); break;
	}

	if (searchExp == 'null' || searchExp == '') toSearch = false;
	else searchCode = "and ItemName LIKE \'%" + searchExp + "%\'";
	let sqlCode = `SELECT * FROM Items WHERE ${rangeCode} ${(toSearch ? searchCode : '')} ${(toSort ? sortCode : '')} LIMIT ${req.params.loadStart},${req.params.loadLimit};`;
	getCardSet(sqlCode, res)
});


router.get('/', function (req, res, next) {
	res.render('index');
});


module.exports = router;
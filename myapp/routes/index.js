var express = require('express');
var router = express.Router();
var fs = require('fs');
const database = require('../database');
const { join } = require('path');
// const { send } = require('process');
const ejs = require('ejs');
// const { render } = require('pug');

/* GET home page. */
router.get('/', function(req, res, next) {
  let query_sql = 'SELECT * FROM item';
  database.connection.query(query_sql, function(err, result){
    if (err) console.error(err);
    let cardSet = ''
    result.forEach(item => {
      cardDir = join(__dirname, '../views/especial/index/card.ejs');
      generator = ejs.compile(fs.readFileSync(cardDir, 'utf8'));
      cardSet += generator({
        itemPicPath : 'images/Reina.jpg',
        itemName : item.item_name,
        itemPrice : item.item_price,
        itemDesc: item.item_desc,
        trans:{
          postSupport: item.trans_post? true : false,
          faceToFace:  item.trans_face? true : false,
          noNeedTrans: item.trans_null? true : false
        },
        oldNewRate: item.old_new_rate
      }); 
    });
    res.render('index', {
      cardSet: cardSet
    });
  });  
});

module.exports = router;
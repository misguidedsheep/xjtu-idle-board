var express = require('express');
var router = express.Router();
var fs = require('fs');
const database = require('../database');
const { join } = require('path');
// const { send } = require('process');
const ejs = require('ejs');
const { search } = require('../app');
// const { render } = require('pug');

function sql_respond(sql, res){
  database.connection.query(sql, function(err, result){
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
}


router.get('/search=:searchExp-sort=:sortMode-min=:minPrice-max=:maxPrice', function(req, res){
  
  let toSearch = true;
  let toSort = true;

  let sortMode = req.params.sortMode;
  let searchExp = req.params.searchExp;
  
  let rangeCode = ' item_price BETWEEN ' + req.params.minPrice + ' and ' + req.params.maxPrice;
  
  // for-debug
  console.log('SORT MATCHED!')
  
  switch (sortMode){
    case 'price_up': sortCode = ' ORDER BY item_price ASC'; break;
    case 'price_down': sortCode = ' ORDER BY item_price DESC'; break;
    case 'date_down': sortCode = ' ORDER BY item_id DESC'; break;
    case 'new_to_old': sortCode = ' ORDER BY old_new_rate DESC'; break
    case 'null': toSort = false; break;
    default: res.send('Invalid Sort Method ERROR'); break;
  }

  if(searchExp == 'null' ||  searchExp == '') toSearch = false; 
  else searchCode = " and item_name LIKE \'%" + searchExp + "%\'";
  let sqlCode = 'SELECT * FROM item WHERE' + rangeCode + (toSearch? searchCode : '') + (toSort? sortCode : ''); 
  sql_respond(sqlCode, res)
});



/* GET home page. */
router.get('/', function(req, res, next) {
  let query_sql = 'SELECT * FROM item ORDER BY item_id desc';
  sql_respond(query_sql, res);
});







module.exports = router;
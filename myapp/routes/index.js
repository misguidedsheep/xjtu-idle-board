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
    var cardDir = join(__dirname, '../views/especial/index/card.ejs');
    var generator = ejs.compile(fs.readFileSync(cardDir, 'utf8'));
    result.forEach(item => {
      cardSet += generator({
        coverFileName : item.CoverFileName,
        itemName : item.ItemName,
        itemPrice : item.ItemPrice,
        itemDescription: item.ItemDescription,
        trans:{
          deliverByPost: item.DeliverByPost? true : false,
          deliverByFace:  item.DeliverByFace? true : false,
          deliverNoNeed: item.DeliverNoNeed? true : false
        }
      }); 
    });
    res.send(cardSet);
  });  
}


router.get('/search=:searchExp-sort=:sortMode-min=:minPrice-max=:maxPrice', function(req, res){
  
  let toSearch = true;
  let toSort = true;

  let sortMode = req.params.sortMode;
  let searchExp = req.params.searchExp;
  
  let rangeCode = ' ItemPrice BETWEEN ' + req.params.minPrice + ' and ' + req.params.maxPrice;
  
  // for-debug
  console.log('SORT MATCHED!')
  
  switch (sortMode){
    case 'price_up': sortCode = ' ORDER BY ItemPrice ASC'; break;
    case 'price_down': sortCode = ' ORDER BY ItemPrice DESC'; break;
    case 'date_down': sortCode = ' ORDER BY ItemID DESC'; break;
    case 'null': toSort = false; break;
    default: res.send('Invalid Sort Method ERROR'); break;
  }

  if(searchExp == 'null' ||  searchExp == '') toSearch = false; 
  else searchCode = " and ItemName LIKE \'%" + searchExp + "%\'";
  let sqlCode = 'SELECT * FROM Items WHERE' + rangeCode + (toSearch? searchCode : '') + (toSort? sortCode : ''); 
  sql_respond(sqlCode, res)
});



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});







module.exports = router;
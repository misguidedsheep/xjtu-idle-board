var express = require('express');
var router = express.Router();
const database = require('../database');

/* GET home page. */
router.use(function(req, res, next) {
    itemName = req.body.itemName;
    price = req.body.itemDesc;

    var insert_sql = 'INSERT INTO test (item_name, price) VALUES (' + '\'' +  itemName + '\'' + ',' + price + ')';
    console.log(insert_sql);
    database.connection.query(insert_sql);
    //res.send('提交完成，三秒后重定向至主页...');
    setTimeout(() => {
        res.redirect('/')
    }, 3000);

});

module.exports = router;


// `INSERT INTO item_info(item_name, owner_id, submission_date, '
//                     + 'item_price, item_description, old_new_rate, transportation, remark)`
//                     + 'VALUES(${req.body})'
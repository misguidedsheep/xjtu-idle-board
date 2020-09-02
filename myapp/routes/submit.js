let express = require('express');
let router = express.Router();
const database = require('../database');

/* GET home page. */
router.use(function(req, res, next) {
    itemName = req.body.itemName;
    price = req.body.itemDesc;

    let insert_sql = 'INSERT INTO test (item_name, price) VALUES (' + '\'' +  itemName + '\'' + ',' + price + ')';
    console.log(insert_sql);
    database.connection.query(insert_sql);
    //res.send('提交完成，三秒后重定向至主页...');
    setTimeout(() => {
        res.redirect('/')
    }, 3000);

});

module.exports = router;
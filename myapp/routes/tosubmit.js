let express = require('express');
let router = express.Router();
const database = require('../database');
const jwt = require('jsonwebtoken');
const constant = require('../private/constant');

/* GET home page. */
router.use(function(req, res, next) {
    form = JSON.parse(req.body.formData)
    sql = 'Insert into Items' + 
            ' (ItemName, ItemPrice, ItemDescription, ItemOldNewRate, ' + 
            'CoverFileName, DeliverByPost,' + 
            ' DeliverByFace, DeliverNoNeed, ' + 
            'Remarks, UserName) values' + `('${form.itemName}', ${form.itemPrice}, '${form.itemDescription}', '${form.itemOldNewRate}', ` + 
            `'${form.coverFileName}', ${(form.hasOwnProperty("deliverByPost"))? true: false}, ` + 
            `${(form.hasOwnProperty("deliverByFace"))? true: false}, ${(form.hasOwnProperty("deliverNoNeed"))? true: false}, ` + 
            `'${form.remarks}' , '${form.userName}')`;
    result = database.connection.query(sql, function(err, result){
        if(err) console.error(err);
        else{
            console.log(result);
        }
    })
    res.send("Database Query OK")
});

module.exports = router;
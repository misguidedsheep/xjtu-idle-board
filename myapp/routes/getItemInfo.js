let express = require('express');
let router = express.Router();
const database = require('../database');

/* GET home page. */
router.use(function(req, res, next) {
    console.log('be about to get itemInfo')
    //itemID = req.body.itemID;
    console.log(req.query);
    itemID = parseInt(req.query.itemID);
    sql = `SELECT * FROM Items WHERE ItemID=${itemID}`
    database.connection.query(sql, function(err, result){
        if(err) console.error(err);
        else{
            if(result.length != 0){
                item = result[0]
                res.json({
                    itemID: item.ItemID,
                    coverFileName : item.CoverFileName,
                    itemName : item.ItemName,
                    itemPrice : item.ItemPrice,
                    itemDescription: item.ItemDescription,
                    itemOldNewRate: item.ItemOldNewRate,
                    deliverByPost: item.DeliverByPost? true : false,
                    deliverByFace: item.DeliverByFace? true : false,
                    deliverNoNeed: item.DeliverNoNeed? true : false,
                    remarks:item.Remarks
                })
            }else{
                res.send("ERROR from getItemInfo.js")
            }
        }
    })

});

module.exports = router;
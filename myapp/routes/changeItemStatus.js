let express = require('express');
let router = express.Router();
const database = require('../database');
const jwt = require('jsonwebtoken');
const constant = require('../private/constant')

/* GET home page. */
router.use(function(req, res, next) {
    console.log('be about to get getUserItemInfo')
    // 验证token, 获取用户名
    let token = req.headers.authorization.replace("Bearer ", "");
    var userName;
    console.log('getToken: ', token)
    jwt.verify(token, constant.secretKey, function(err, decoded){
        if(err){
            console.log('Error: routes/getUserItemInfo.js')
            res.end('ERROR');
            return;
        }else{
            //jwt验证成功

            //提取变量
            let isOnSale = ''
            if(req.query.onSale == 'true') isOnSale = 'true'; else isOnSale = 'false';
            let itemID = req.query.itemID;
            
            console.log('isOnSale', isOnSale)
            sql = `UPDATE Items set OnSale=${isOnSale} WHERE ItemID='${itemID}'`
            if(req.query.toDelete == 'true'){
                sql = `DELETE FROM Items WHERE ItemID='${itemID}'`
            }
            console.log('sql', sql);
            database.connection.query(sql, function(err, result){
                if(err) console.error(err);
                else{
                    if(result.length != 0){
                        res.send(result)
                    }else{
                        res.send("ERROR: routes/changeItemStatus.js")
                        return;
                    }
                }
            })
        }
    })
});


module.exports = router;
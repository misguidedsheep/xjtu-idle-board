const constant = require("../private/constant");



let express = require('express');
let router = express.Router();
const database = require('../database');

/* GET home page. */
router.use(function(req, res, next) {
    var token = jwt.sign(data, constant.secretKey, {
        expiresIn: 60 //*60*24 (单位: s)
    })
    res.json({
        success: true,
        message: 'success',
        token: token
    })
    res.render('getToken');

});

module.exports = router;
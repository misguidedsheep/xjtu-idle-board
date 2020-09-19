let express = require('express');
let router = express.Router();

// 渲染发布页
router.use(function(req, res, next){
    res.render('submit');
})


module.exports = router;
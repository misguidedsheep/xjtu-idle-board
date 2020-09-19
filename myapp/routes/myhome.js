let express = require('express');
let router = express.Router();

// 渲染用户页
router.use(function(req, res, next) {
    res.render('myhome');
});

module.exports = router;
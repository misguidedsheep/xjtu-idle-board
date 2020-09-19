let express = require('express');
let router = express.Router();

// 渲染登录页
router.use(function(req, res, next) {
    res.render('login');
});

module.exports = router;
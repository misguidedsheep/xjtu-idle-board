let express = require('express');
let router = express.Router();

// 渲染注册页
router.use(function(req, res, next) {
    res.render('register');
});

module.exports = router;
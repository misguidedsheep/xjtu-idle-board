let express = require('express');
let router = express.Router();

/* GET login page. */
router.use(function(req, res, next) {
    res.render('register');
});

module.exports = router;
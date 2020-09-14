let express = require('express');
const { path } = require('../app');
let router = express.Router();

/* GET home page. */
router.use(function(req, res, next){
    console.log('be about to response...')
    res.json({
        fileName: req.file.filename
    })
})


module.exports = router;
let express = require('express');
let router = express.Router();

// 
router.use(function(req, res, next){
    // 返回文件名
    res.json({
        fileName: req.file.filename
    })
})


module.exports = router;
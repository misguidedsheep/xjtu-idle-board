let express = require('express');
let router = express.Router();
var tinify = require("tinify");
var constant = require("../private/constant")
var path = require("path")

tinify.key = constant.tinifyKey;

router.use(function(req, res, next){
    // 调用TinyPNG API，实现压缩
    var picFileName = req.file.filename;
    var picFilePath = path.join( __dirname, `../public/upload/${picFileName}`)
    tinify.fromFile(picFilePath).toFile(picFilePath);
    res.json({
        fileName: picFileName
    })
})


module.exports = router;
var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');
const database = require('../database');
const { join } = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index',{
    itemPicPath: 'images/ibasso-dx160.jpg',
    itemName: 'iBasso dx160 播放器',
    itemPrice: 1800,
    itemDesc: '作为一款定位于不足3K的中端HIFI播放器，iBasso DX160相比上一代DX150来说，虽然取消了可更换耳放卡设计，对于资深老烧来说，缺少了后期更多可玩性和素质提升，但对于中意这个价格区间的hifi初烧友来说，DX160具有更时尚的高颜值外观，以及相比DX150标配版更好听的声音潜力，无疑是预算有限的烧友一个理想的选择。在笔者这几天的试听过程中，DX160还算是一个杂食性不错的播放器，从参数上来看，推力和适配上无论是对于不同耳塞的驱动性和适配性，还是对于流行、古典、摇滚等不同风格的包容性，DX160都表现出了出色的宽容度，兼具耐听、好听的特点。',
    trans:{
      postSupport: true,
      faceToFace: true,
      noNeedTrans: true
    },
    oldNewRate: 95
  });
});

module.exports = router;

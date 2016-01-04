/**
 * Created by Biousco on 1/4.
 */
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('zhihu/daily', { title: 'Express' });
});

module.exports = router;

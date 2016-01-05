/**
 * Created by Biousco on 1/4.
 */
var express = require('express');
var router = express.Router();
var zhihuapi = require('../lib/dailyapi');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('zhihu/daily', { title: 'Express' });
});

router.get('/api/getLatest', function (req, res) {
    zhihuapi.getLatest(req, function (response, data) {
        res.send(data);
    })
})


module.exports = router;

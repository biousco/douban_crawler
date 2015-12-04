var express = require('express');
var router = express.Router();
var eventproxy = require('eventproxy');
var crawlerLib = require('../lib/crawler_q.js');
var DOUBAN = require('../lib/douban.js');

router.get('/a', function (req, res, next) {
	var render_res = res;
	var bookList = [];
	var bookUrllist;
	var count = 0;

	crawlerLib.getUrlContent(DOUBAN.index)
		.then(function (content) {
			return crawlerLib.getBookListUrl(content);
		})
		.then(function (result) {
			bookUrllist = result;
			var ep = new eventproxy();

			ep.after('craw_finished', bookUrllist.length, function () {
				render_res.render('crawler', { 
					title: 'Crawler',
					bookList: bookList
				});
			})

			bookUrllist.forEach(function (bookurl) {
				crawlerLib.getUrlContent(bookurl).then(function (abook) {
					var book = crawlerLib.getBookInfo(abook);
					console.log(book);
					bookList.push(book);
					console.log("has finished: " + count + " total: " + bookUrllist.length);
					ep.emit('craw_finished');
					count++;
				})
			})
		})
})










module.exports = router;

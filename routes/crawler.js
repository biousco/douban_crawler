var express = require('express');
var router = express.Router();
var eventproxy = require('eventproxy');
var crawlerLib = require('../lib/crawler_q.js');
var DOUBAN = require('../lib/douban.js');
var server = require('http').Server(express());
var io = require('socket.io')(server);

router.get('/index', function (req, res) {
	var render_res = res;
	var bookList = [];
	var bookUrllist;
	var count = 0;
	var total = 5,
		_total = 5;

	crawlerLib.getUrlContent(DOUBAN.index)
		.then(function (content) {
			return crawlerLib.getBookListUrl(content);
		})
		.then(function (result) {
			bookUrllist = result;
			var ep = new eventproxy();

			ep.after('craw_finished', total, function () {
				render_res.render('crawler', { 
					title: 'Crawler',
					bookList: bookList
				});
			});

			bookUrllist.forEach(function (bookurl) {
				if(_total < 0) return;
				_total--;
				crawlerLib.getUrlContent(bookurl).then(function (abook) {
					var book = crawlerLib.getBookInfo(abook);
					console.log(book);
					bookList.push(book);
					console.log("has finished: " + count + " total: " + total);
					ep.emit('craw_finished');
					console.log('Start append to file ' + DOUBAN.resultFile + '...');
					crawlerLib.appendFile(DOUBAN.resultFile, crawlerLib.generateStr(book));
					count++;
				})
			})
		})
});










module.exports = router;

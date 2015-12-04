var express = require('express');
var router = express.Router();
var url = require('url');
var superagent = require('superagent');
var cheerio = require('cheerio');
var eventproxy = require('eventproxy');
var crawlerLib = require('../lib/crawler.js');

/* crawler home page. */
router.get('/', function(req, res, next) {
	var render_res = res;
	var bookList = [];
	var bookUrllist;
	var count = 0;

	crawlerLib.getBookListUrl(function (result) {
		bookUrllist = result;
		var ep = new eventproxy();

		ep.after('craw_finished', bookUrllist.length, function () {
			render_res.render('crawler', { 
				title: 'Crawler',
				bookList: bookList
			});
		})

		bookUrllist.forEach(function (bookurl) {
			crawlerLib.getUrlContent(bookurl,function (abook) {
				var book = crawlerLib.getBookInfo(abook);
				bookList.push(book);
				console.log("has finished: " + count + " total: " + bookUrllist.length);
				ep.emit('craw_finished');
				count++;
			})
		})

		// for(var i = 0; i < bookUrllist.length; i++) {
		// 	crawlerLib.getUrlContent(bookUrllist[i],function (abook) {

		// 		count++;
				
		// 	})
		// }

		// var timer = setInterval(function () {
		// 	if(count < bookUrllist.length) return;
		// 	console.log('yep!');

		// 	clearInterval(timer);
		// },2000);

	});


	

});

module.exports = router;

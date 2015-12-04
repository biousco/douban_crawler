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
		for(var i = 0; i < bookUrllist.length; i++) {
			crawlerLib.getUrlContent(bookUrllist[i],function (abook) {
				var book = crawlerLib.getBookInfo(abook);
				bookList.push(book);
				count++;
				console.log("has finished: " + count + " total: " + bookUrllist.length);
			})
		}

		setInterval(function () {
			if(count < bookUrllist.length) return;
			console.log('yep!');
			render_res.render('crawler', { 
				title: 'Crawler',
				bookList: bookList
			});
		},2000);

	});


	

});

module.exports = router;

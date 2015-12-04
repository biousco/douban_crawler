var cheerio = require('cheerio');
var eventproxy = require('eventproxy');
var superagent = require('superagent');
var Q = require('q');
var defer = Q.defer();

var Crawler = {
	getBookInfo : function (content) {
		var book = {},
			$ = cheerio.load(content);
		book.name = $('#wrapper > h1 span').text();
		book.author = $('#info > span a').text();
		var _text = $('#info').text();
		_textarr = _text.split(':');
		book.ISBN = _textarr[_textarr.length-1];
		return book;
	},
	getUrlContent : function (targetUrl) {
		var defer = Q.defer();
		console.log("start pull " + targetUrl + "...");
		superagent.get(targetUrl)
		    .end(function (err, res) {
		    	if(!err) {
		    		console.log(targetUrl + " has finished!");
		    		defer.resolve(res.text)
		    	} else {
		    		defer.reject(err);
		    	}
		});
		return defer.promise;
	},
	getBookListUrl : function (html) {
		var $ = cheerio.load(html),
			booklist = [];
		$('li .cover a').each(function (edx, element) {
			var href = $(element).attr('href');
			booklist.push(href);
		})
		return booklist;
	},
	eventProxy : function () {
		var ep = new eventproxy();
		ep.after('getBook_html', booklist.length, function (booklist) {
			booklist = booklist.map(function (abook) {
			})
		})
	}
}


module.exports = Crawler;
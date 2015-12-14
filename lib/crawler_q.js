var cheerio = require('cheerio');
var eventproxy = require('eventproxy');
var superagent = require('superagent');
var Q = require('q');
var defer = Q.defer();
var fs = require('fs');

var Crawler = {
	getBookInfo : function (content) {
		var book = {},
			$ = cheerio.load(content);
		book.name = $('#wrapper > h1 span').text();
		book.author = $('#info > span a').text();
		var _text = $('#info').text();
		_textarr = _text.split(':');
		book.ISBN = _textarr[_textarr.length-1].replace(/[\s\n]/g,"");
		book.publisher = _textarr[2].split(' ')[1].replace(/\n/g,"");
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
	},
	appendFile : function (file,data) {
		fs.appendFile(file,data,'utf8',function (err) {
			if(err) console.log(err);
			console.log('append success!');
		})
	},
	generateStr : function (ele) {
		var str = "insert into Book(b_id,b_name,author,publisher,amount) values('" + ele.ISBN + "','" + ele.name + "','" + ele.author + "','" + ele.publisher + "'," + Math.floor(Math.random()*100+25) + ")";
		str = str.replace(/[\r]/g," ") + "\n";
		return str;
	}
}


module.exports = Crawler;
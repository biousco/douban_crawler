/**
 * Created by Biousco on 1/5.
 */
var http = require('http');

var getApi = {
    getLatest : function (req, success) {
        var headers = req.headers;
        headers.host = "news-at.zhihu.com";
        var opt = {
            host: "news-at.zhihu.com",
            port: 80,
            path: "/api/3/news/latest",
            method: 'GET',
            headers: headers
        };
        req = http.request(opt, function (res) {
            res.on('data', function (data) {
                success(res, data);
            });
        });

        req.on('error', function (e) {
            console.log('error in latest!');
        });
        req.end();
   1 }
};

module.exports = getApi;
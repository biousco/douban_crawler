/**
 * Created by Biousco on 1/5.
 */
(function () {
    $.get('/zhihu/api/getLatest', function (data) {
        console.log(data);
    })
})()
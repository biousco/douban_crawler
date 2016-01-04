# douban_crawler
node写的豆瓣图书爬虫。数据库大作业里的数据少的可怜，就写了个爬虫爬一点数据放到数据库里面。

## 安装
````javascript
npm install
```

## 运行
```javascript
npm start
```
用浏览器打开`http://localhost:3000/crawler/a`
由于还没做请求数的控制，所以应该是一口气并行爬了50个链接。后面有空再加上控制。
会拿到书籍的名字，作者，出版社，ISBN号。现在是写成了sql语句。
数据写在`data/result.txt`

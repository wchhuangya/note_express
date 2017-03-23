/**
 * Created by wchya on 17/3/23.
 */
var express = require('express');
var app = express();
var handlebars = require('express3-handlebars').create({ defaultLayout: 'main'});
var fortune = require('./lib/fortune');

// 设置端口,如果环境变量设置了,就使用环境变量的值；否则,使用 3000 作为端口
app.set('port', process.env.PORT || 3000);
// 设置渲染 view 的默认引擎
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
// 设置静态资源目录
app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
    /*res.type('text/plain');
    res.send('Meadowlark Travel');*/
    res.render('home');
});
app.get('/about', function (req, res) {
    /*res.type('text/plain');
     res.send('About Meadowlark Travel');*/
    res.render('about', { fortune: fortune.getFortune() });
});

app.use(function (req, res, next) {
    /*res.type('text/plain');
    res.send('404 - Not Found');*/
    res.status(404);
    res.render('404');
});
app.use(function (err, req, res, next) {
    /*res.type('text/plain');
    res.send('500 - Server Error');*/
    console.error(err.stack);
    res.status(500);
    res.render('500');
});

app.listen(app.get('port'), function () {
    console.log('Meadowlark server started on ' + app.get('port'));
});
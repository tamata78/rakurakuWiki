
/**
 * Module dependencies.
 */

// DB設定
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fjkw');
var Schema = mongoose.Schema;

// DBスキーマ設定
var WikiContent = new Schema({
    id        : Number
  , title     : String
  , body      : String
  , date      : Date
});

mongoose.model('WikiContent', WikiContent);
WikiContent = mongoose.model('WikiContent');

var express = require('express');

// サーバー作成
var app = module.exports = express.createServer();

// Markdown
var md = require("node-markdown").Markdown;

// handler 
var create_handler = require('./routes/create')
var register_handler = require('./routes/register')

// Configuration

//共通設定
app.configure(function(){
  app.set('views', __dirname + '/views');//画面ファイル置き場
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));//画像,ライブラリ、CSSファイル置き場
});

// 開発環境設定
app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

//プロダクト環境設定
app.configure('production', function(){
  app.use(express.errorHandler()); 
});

// Routes
//TOP画面を表示する
app.get('/', function(req, res){
  res.render('index', {
    title: 'rakurakuWiki'
  });
});

//指定URLの記事を取得する
//app.get('/:title', function(req, res){
//  WikiContent.findOne({title: req.params.title}, function (err, content) {
//      if (content == null) {
//        res.render('form', {
//          title: req.params.title
//        });
//      } else {
//        res.render('wiki', {
//        title: content.title,
//        body: md(content.body),
//        date: content.date
//        });
//      }
//  });
//});

//タイトルなしで内容のみを表示
app.get('/md/:title', function(req, res){
  WikiContent.findOne({title: req.params.title}, function (err, content) {
    res.send(content.body);
  });
});

//記事の登録
app.post('/register', register_handler.index);

//記事内容の登録・更新
app.post('/:title', function(req, res){
  WikiContent.findOne({title: req.params.title}, function (err, content) {
	// コンテンツが取得できなかった場合
    if (content == null) {
        // 新規記事を作成する
      new WikiContent({title:  req.params.title, body: req.param('body'), date: new Date()}).save( 
        function (){
          res.redirect('/'+req.params.title);
      });       
    } else {
        // コンテンツが取得できた場合
        // 記事の更新
      content.body = req.param('body');
      content.date = new Date();
      content.save( 
        function (){
          res.send(md(req.param('body')));
      });       
    }
  });
});

//記事の新規作成
app.get('/create', create_handler.index);

app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);


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
WikiContent = module.exports = mongoose.model('WikiContent');

var express = require('express');

// サーバー作成
var app = express.createServer();

// Markdown
var md = require("node-markdown").Markdown;

// handler 
var create_handler = require('./routes/create')
var register_handler = require('./routes/register')
var edit_handler = require('./routes/edit')

// Configuration

// 共通設定
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

// プロダクト環境設定
app.configure('production', function(){
  app.use(express.errorHandler()); 
});

// Routes
// TOP画面を表示する
app.get('/', function(req, res){
  res.render('index', {
      title: 'rakurakuWiki'
    , displayName: 'top'
  });
});

// 記事の新規作成画面を開く
app.get('/create', create_handler.index);

// 記事の新規登録
app.post('/register', register_handler.index);

// 指定IDの記事を表示する
app.get('/wiki/:articleId', function(req, res){
  WikiContent.findOne({id: req.params.articleId}, function (err, content) {
      var title = '選択されたページは存在しません。'; 
      if (content != null) {
        title = content.title;       
      }

      res.render('wiki', {
          content: content
        , displayName: 'wiki'
      });
  });
});

app.get('/md/:title', function(req, res){
  WikiContent.findOne({title: req.params.title}, function (err, content) {
    res.send(content.body);
  });
});

// 記事の編集
app.get('/edit/:articleId', edit_handler.index);

// 記事の更新
app.post('/edit/update/:articleId', edit_handler.update);

app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);

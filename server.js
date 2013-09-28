
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
var wiki_handler = require('./routes/wiki')
var edit_handler = require('./routes/edit')

// 環境設定
require('./configure')(express, app);

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
app.post('/create/register', create_handler.register);

// 指定IDの記事を表示する
app.get('/wiki/:articleId', wiki_handler.index);

// 記事の編集
app.get('/edit/:articleId', edit_handler.index);

// 記事の更新
app.post('/edit/update/:articleId', edit_handler.update);

app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);

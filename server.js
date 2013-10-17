/**
 * Module dependencies.
 */

// DB設定
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/rakurakuwiki');

// DBスキーマ設定
var WikiContent = new mongoose.Schema({
    id        : Number
  , title     : String
  , body      : String
  , date      : Date
});

mongoose.model('WikiContent', WikiContent);
module.exports = mongoose.model('WikiContent');

// ユーザー情報取得 
var model = require('./models/user.js')(mongoose);

var express = require('express');

// サーバー作成
var app = express.createServer();

// 環境設定
require('./configure')(express, app);

// Routes
//require('./router')(app, model.User);
require('./router')(app);

app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);

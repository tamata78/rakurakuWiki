
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

// 環境設定
require('./configure')(express, app);

// Routes
require('./router')(app);

app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);

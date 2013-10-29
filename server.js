/**
 * Module dependencies.
 */

// サーバー作成
var express = require('express');
var app = express.createServer();

// モデル作成
var models = module.exports = require('./model.js');

// 環境設定
require('./configure')(express, app);

// Routes
require('./router')(app);

app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);

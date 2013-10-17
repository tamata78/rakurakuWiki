/**
 * Module dependencies.
 */ 

var domain = (process.env.NODE_ENV === 'producEtion')?'exsample.com':'localhost';

// 共通設定
module.exports = function(express, app) {
  // セッション情報格納用モジュール読み込み
  var MongoStore = require('connect-mongo')(express);
  app.configure(function(){
    app.set('views', __dirname + '/views');//画面ファイル置き場
    app.set('view engine', 'jade');
    app.locals.pretty = true;
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.cookieParser());
    app.use(express.session({
      secret: 'secret',
      store: new MongoStore({
        db: 'session',
        host: domain,
        clear_interval: 60 * 60
      }),
      cookie: {
        httpOnly: false,
        maxAge: new Date(Date.now() + 60 * 60 * 1000)
      }
    }));
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
}

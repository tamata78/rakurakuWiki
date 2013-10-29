/**
 * Module dependencies.
 */ 

// 共通設定
module.exports = function(express, app) {
  app.configure(function(){
    app.set('views', __dirname + '/views');//画面ファイル置き場
    app.set('view engine', 'jade');
    app.locals.pretty = true;
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.cookieParser('secret', 'sample'));
    app.use(express.session({ //セッション設定
      secret: 'sess_id'
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

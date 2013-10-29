/**
 * Module dependencies.
 */

module.exports = function(app){
  // handler
  var index_handler = require('./routes/index')
  var user_handler = require('./routes/user')
  var create_handler = require('./routes/create')
  var wiki_handler = require('./routes/wiki')
  var edit_handler = require('./routes/edit')
  var chat_handler = require('./routes/chat');

  // socket.ioのモジュール読み込み
  var io = require('socket.io');
  var io = io.listen(app);

  // TOP画面を表示する
  app.get('/', index_handler.index);

  // ログイン 
  app.post('/login', index_handler.login);

  // ログアウト 
  app.get('/logout', index_handler.logout);

  // 新規ユーザー登録画面を開く
  app.get('/createUser', user_handler.createUser);
  
  // 新規ユーザー登録
  app.post('/createUser/register', user_handler.register);
  
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

  // チャット画面
  app.get('/chat', chat_handler.index);
  io.sockets.on('connection', function(socket){
    chat_handler.message(socket);
  });

}


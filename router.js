module.exports = function(app){
  // handler
  var create_handler = require('./routes/create')
  var wiki_handler = require('./routes/wiki')
  var edit_handler = require('./routes/edit')

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
}
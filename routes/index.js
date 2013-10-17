/*
 * GET home page.
 */

// TOP画面を表示する
exports.index = function(req, res){
  res.render('index', {
      title: 'rakurakuWiki'
    , displayName: 'top'
    , login: 'false'
  });
}

// ログイン
var User = module.parent.exports
exports.login = function(req, res){
  var email    = req.param("email");
  var password = req.param("password");
  var query = { "email": email, "password": password };

  User.find(query, function(err, data) {
    if(err) {
      console.log(err);
    }
    if (data == "") {
      res.render('index', {
          title: 'ユーザーを新規登録してください'});
    } else {
      req.session.user = email;
      res.redirect('/');
    }
  });
};

// ログアウト

// 新規ユーザー登録
exports.createUser = function(req, res){
  res.render('createUser', {
      title: '新規ユーザー登録'
  });
}

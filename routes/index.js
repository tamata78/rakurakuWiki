/*
 * GET home page.
 */

// TOP画面を表示する
exports.index = function(req, res){
  res.render('index', {
      title: 'rakurakuWiki'
    , displayName: 'top'
    , userId: req.session.userId
  });
}

// ログイン
var modules = module.parent.parent.exports;
var User = modules.User;
exports.login = function(req, res){
  var userId    = req.param("userId");
  var password = req.param("password");
  var query = { "userId": userId, "password": password };

  User.find(query, function(err, userInfo) {
    if(err) {
      console.log(err);
    }
    if (userInfo == "") {
      res.render('index', {
          title: 'rakurakuWiki'
        , message: 'ID,またはパスワードが異なります'
        , displayName: 'top'
      });
    } else {
      req.session.userId = userId;
      res.redirect('/');
    }
  });
}

// ログアウト
exports.logout = function(req, res){
  req.session.userId = null;
  res.redirect('/');
}


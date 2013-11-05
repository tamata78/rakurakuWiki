
/*
 * GET home page.
 */

// 新規ユーザー登録画面を開く
exports.createUser = function(req, res){
  renderCreateUser(res, ''); 
}

// 新規ユーザー登録
var modules = module.parent.parent.exports;
var user = modules.User;

exports.register = function(req, res){
  id = req.param('userId');
  password = req.param('password');
  
  user.findOne({userId: id}, function (err, userInfo) {
    if (userInfo != null) {
      renderCreateUser(res, 'すでに存在するユーザーIDです'); 
      return;
    }
    // ユーザー登録
    userInfo = {
        userId: id
      , password: password
    };
    registerUser(res, userInfo);

  });
};

// ユーザー登録 
function registerUser(res, userInfo) {
  new user(userInfo).save(
    function (){
      res.redirect('/');
  }); 
}

// 新規ユーザー登録画面をレンダリングする
function renderCreateUser(res, message) {
  res.render('createUser', {
    title: '新規ユーザー登録'         
    ,  message: message 
  });
}


/*
 * GET home page.
 */

//新規登録画面の表示
exports.index = function(req, res){
   res.render('create', {
      title: '新規記事作成'
    , displayName: 'create'
   })
};

//記事内容の登録
var WikiContent = module.parent.parent.exports

exports.register = function(req, res){
  WikiContent.count({}, function (err, count) {
     var content = {
         id:  count+1
       , title:  req.param('title')
       , body: req.param('body')
       , date: new Date()
       , displayName: 'register'
     };
     new WikiContent(content).save(
        function (){
          res.redirect('/wiki/'+(count+1));
      });
  });
};


/*
 * GET home page.
 */

exports.index = function(req, res){
//   console.log(req.params.id)
//   req.session.message = 'セッションに保存したいメッセージ'
   res.render('create', {title: '新規記事作成'})
};


/*
 * GET home page.
 */

//記事編集画面に遷移する
var WikiContent = module.parent.parent.exports
exports.index = function(req, res){
  WikiContent.findOne({id: req.params.articleId}, function (err, content) {
      var title = '選択されたページは存在しません。';
      if (content != null) {
        title = content.title;
      }

      res.render('edit', {
          content: content
        , displayName: 'edit'
      });
  });
}

// 記事の更新
exports.update = function(req, res){
  WikiContent.findOne({id: req.params.articleId}, function (err, content) {
    var title = '選択されたページは存在しません。';
    if (content != null) {
      // 更新元データが存在する場合、更新
      content.body = req.param('body');
      content.date = new Date();
      content.save(function (){
        res.render('wiki', {
            content: content
          , displayName: 'wiki'
        });
      });
    }
  });
}



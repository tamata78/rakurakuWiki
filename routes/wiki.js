
/**
 * Module dependencies.
 */


var WikiContent = module.parent.exports
exports.index = function(req, res){
  WikiContent.findOne({id: req.params.articleId}, function (err, content) {
      var title = '選択されたページは存在しません。'; 
      if (content != null) {
        title = content.title;       
      }

      res.render('wiki', {
          content: content
        , displayName: 'wiki'
      });
  });
}

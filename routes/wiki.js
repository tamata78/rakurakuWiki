
/**
 * Module dependencies.
 */

var models = module.parent.parent.exports;
var WikiContent = models.WikiContent;

exports.index = function(req, res){
  WikiContent.findOne({id: req.params.articleId}, function (err, content) {
      var title = '選択されたページは存在しません。';
      if (content != null) {
        title = content.title;
      }

      res.render('wiki', {
          content: content
        , userId: req.session.userId
      });
  });
}


/*
 * GET home page.
 */

//記事内容の登録
exports.index = function(req, res){
  WikiContent.count({}, function (err, count) {
      // 新規記事を作成する
      debugger;
      new WikiContent({id:  count+1, title:  req.param('title'), body: req.param('body'), date: new Date()}).save( 
        function (){
          res.redirect('/'+req.params.title);
      });       
  });
};

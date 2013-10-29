/**
 *  Modelの定義 
 */

// DB設定
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/rakurakuwiki');

// Wiki記事情報  
var WikiContent = new mongoose.Schema({
    id        : Number
  , title     : String
  , body      : String
  , date      : Date
});
mongoose.model('WikiContent', WikiContent);
    
// ユーザー情報
var UserInfo = new mongoose.Schema({
    userId    : String
  , password  : String
});
mongoose.model('UserInfo', UserInfo);

module.exports = {
    WikiContent:  mongoose.model('WikiContent') 
  , User: mongoose.model('UserInfo')
}

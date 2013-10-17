/**
 * Module dependencies.
 */

module.exports = function(mongoose){
  // Modelの定義
  var UserInfo = new mongoose.Schema({
      email     : String
    , password  : String
  },{collection: 'info'});
  
  var User = mongoose.model('User', UserInfo);
}

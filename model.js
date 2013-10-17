/**
 * Module dependencies.
 */

module.exports = function(model){
  var domain = (process.env.NODE_ENV === 'production')?'exsample.com':'localhost';

  var mongoose = require('mongoose');
  var url = 'mongodb://' + domain + '/' + model;
  var dbConnect = exports.dbConnect = mongoose.createConnection(url, function(err, res){
    if(err) {
      console.log('Error connected: ' + url + ' - ' + err);
    } else{
      console.log('Success connected: ' + url);
    }
  });

  
// Modelの定義
var UserInfo = new mongoose.Schema({
    email     : String
  , password  : String
},{collection: 'info'});

 dbConnect.model('User', UserInfo);
}


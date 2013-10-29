/*
 * チャット機能
 */

var messages = [];
exports.index = function(req, res){
  var message = req.body.message;
  messages.push(message);
  res.render('chat', { messages: messages });
};

exports.message = function(socket){
  // socketがmessageイベントを受けたらmessages配列にpushし、
  // その後全体にbroadcastする
  socket.on('message', function(message){
    messages.push(message);
    socket.broadcast.emit('message', message);
  });
};

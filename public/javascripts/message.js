$(function(){
  var socket = io.connect();
  socket.on('connect', function(){
    // messageイベントを受けたらメッセージを追加する
    socket.on('message', function(message){
      appendMessage(message);
    });

    // submitボタンを押したらmessageを送る
    $('#submit').click(function(){
      var message = $('#message').val();
      $('#message').val('');
      if (message && socket){
        // 自分のメッセージを追加してからemit
        appendMessage(message);
        socket.emit('message', message);
      }
    });
    
    function appendMessage(message){
      var li = $('<li></li>').text(message);
      var list = $('#list');
      list.append(li);
    }
  });
});

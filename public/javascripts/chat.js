$(function(){
  var socket = io.connect();
  socket.on('connect', function(){
    // messageイベントを受けたらメッセージを追加する
    socket.on('message', function(message){
      appendMessage(message);
    });

    // submitボタンを押したらmessageを送る
    $('#submit').click(function(){
      var name = $('#name').val();
      var message = $('#message').val();
      var message = '('+name+') '+ message;
      $('#message').val('');
      if (message && socket){
        // 自分のメッセージを追加してからemit
        appendMessage(message);
        socket.emit('message', message);
      }
    });
    
    function appendMessage(message){
      var tr = $('<tr><td></td></tr>').text(message);
      var list = $('#list');
      list.append(tr);
    }
  });
});

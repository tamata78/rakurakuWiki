function isRegAlphaNum(str){
  var tmp=str.match(/[0-9a-zA-Z\-\.]+/g);
  console.log('isRegAlphaNum' + tmp);
  if (tmp!=str){
    return false;
  }
  return true;
}

function isRegHan(str){
  var tmp=str.match(/[0-9a-zA-Z\+\-\/\*\,\.]+/g);
  console.log('isRegHan' + tmp);
  if (tmp!=str){
    return false;
  }
  return true;
}

function chkUsername(str){
  var userNameLength = 6;
  if(str==""){
    alert("ユーザーIDを入力して下さい");
    return false;
  }
  if(str.length < userNameLength){
    alert("ユーザーIDは"+ userNameLength + "文字以上入力して下さい");
    return false;
  }

  if(isRegAlphaNum(str)){
    return true;
  }else{
    alert('ユーザーIDに不正な文字が入力されました');
    return false;
  }
}

function chkPassword(str){
  var passwordLength = 6;
  if(str==""){
    alert("パスワードを入力して下さい");
    return false;
  }

  if(str.length > passwordLength){
    alert("パスワードは"+ passwordLength + "文字以上入力して下さい");
    return false;
  }
  if(isRegHan(str)){
    return true;
  }else{
    alert('パスワードに不正な文字が入力されました');
    return false;
  }
}

function checkForm(){
  var str = $('#userId').val();
  if( !chkUsername(str) ){
    $('#userId').focus();
    return false;
  }
  var password = $('#password').val();
  if( !chkPassword(password) ){
    $('#password').focus();
    return false;
  }

  return true;
}

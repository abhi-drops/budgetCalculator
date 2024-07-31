// This is a JavaScript function that handles user sign-in functionality. It checks if the user exists in the localStorage based on the provided username, verifies the password, and redirects the user to the user.html page upon successful login.

function signin() {
  if (uname.value == '' || upass.value == '') {
    alert('Please enter your username and password!');
  }else{
    if (uname.value in localStorage) {
      user = JSON.parse(localStorage.getItem(uname.value));
      if (user.upass == upass.value) {
        console.log( user.uname);
        localStorage.setItem("ACTIVEUSER", user.uname);
        alert("user successfully logined");
        window.location.href = "./user.html";
      } else {
        alert("wrong password");
      }
    } else {
      alert("wrong username");
    }
  }


}
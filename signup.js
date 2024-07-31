

function signup() {
  if (uname.value == '' || upass.value == '' || uemail.value == '') {
    alert("Please fill in all the fields");
  }else{
    if (uname.value in localStorage) {
      alert("account number already in use ")
    }else{
      user = {
        uname : uname.value,
        upass : upass.value,
        uemail : uemail.value,
        uinc : [],
        uexp : []
    }

    localStorage.setItem(uname.value,JSON.stringify(user))
        uname.value = ""
        upass.value = ""
        alert("User data successfully stored");
        window.location = './index.html';
    }
  }

}
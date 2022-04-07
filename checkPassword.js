function passwordCheck() {
    var password = document.getElementById("password").value;
    var confPassword = document.getElementById("confPassword").value;
    var para = document.getElementById("status")
    if (password == confPassword) {
        return true;
    }else{
        para.innerHTML = "Passwords dont match!";
        para.style.fontSize = "16pt";
        return false;
    }
}
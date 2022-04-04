var messageStyle = "background-color: grey;width: 500px;box-shadow: 5px 5px;text-align: center;margin: auto;position: absolute;top: 50%;left: 50%;"

function loggedin(name) {
    var div = document.getElementById("login");
    var header = document.createElement("h2");
    var button = document.createElement("button");
    var para = document.createElement("p")
    var hyper = document.createElement("a");
    hyper.setAttribute("href", "tetris.php");
    hyper.innerHTML = "Click here to play";
    header.innerHTML = "Welcome to Tetris";
    para.innerHTML = name
    div.appendChild(header);
    header.after(para);
    para.after(button);
    button.appendChild(hyper);
    div.style.cssText = messageStyle + "transform: translate(-50%, -200%);";
    console.log("Loghged in");
}

function signin() {
    var div = document.getElementById("login");
    var header = document.createElement("h2");
    const br = document.createElement("br");
    div.appendChild(header);
    header.innerHTML = "Sign in";
    var form = document.createElement("form");
    form.setAttribute("method", "POST");
    form.setAttribute("action", "index.php");
    var username = document.createElement("input");
    var userLabel = document.createElement("label");
    userLabel.innerHTML = "Username:"
    userLabel.setAttribute("for", "logUser");
    username.setAttribute("type", "text");
    username.setAttribute("name", "logUser");
    username.setAttribute("id", "logUser");
    username.setAttribute("placeholder", "username");
    var password = document.createElement("input");
    var passLabel = document.createElement("label");
    passLabel.innerHTML = "Password:";
    passLabel.setAttribute("for", "logPass");
    password.setAttribute("type", "text");
    password.setAttribute("name", "logPass");
    password.setAttribute("id", "logPass");
    password.setAttribute("placeholder", "password");
    header.after(form);
    form.appendChild(userLabel);
    userLabel.outerHTML = br;
    userLabel.after(username);
    username.after(passLabel);
    passLabel.after(password);
    div.style.cssText = messageStyle + "transform: translate(-50%, -200%);";
    console.log("Not logged in");
}
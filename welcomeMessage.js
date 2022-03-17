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
}
document.addEventListener("DOMContentLoaded", () => {
    const tetrisGrid = Array.from(document.getElementsByClassName("block"));
    const startButton = document.querySelector("#start-button");
    let rows = new Array(20);
    let timerId;
    for(let i = 0; i < 20; i++) {
        let row = new Array(10);
        row.fill("");
        rows[i] = row;
    }
    let score = 0;
    
    const lShape = [
        [[1,1], [1,2], [1,3], [2,3]],
        [[0,1], [1,1], [2,1], [0,2]],
        [[2,1], [2,2], [2,3], [1,1]],
        [[2,1], [1,1], [0,1], [2,2]]
    ];
    const zShape = [
        [[1,1], [2,1], [2,2], [3,2]],
        [[2,1], [2,2], [1,2], [1,3]],
        [[2,1], [1,1], [2,2], [3,2]],
        [[2,2], [2,1], [1,2], [1,3]]
    ];

    const sShape = [
        [[1,2], [2,1], [2,2], [3,1]],
        [[1,2], [2,1], [2,2], [3,1]],
        [[2,2], [2,1], [3,2], [3,3]],
        [[2,2], [2,1], [3,2], [3,3]]
    ];

    const tShape = [
        [[1,1], [2,1], [2,2], [3,1]],
        [[2,1], [2,2], [2,3], [3,2]],
        [[1,2], [2,2], [2,1], [3,2]],
        [[2,1], [2,2], [2,3], [1,2]],
    ];

    const oShape = [
        [[1,1], [1,2], [2,1], [2,2]],
        [[1,1], [1,2], [2,1], [2,2]],
        [[1,1], [1,2], [2,1], [2,2]],
        [[1,1], [1,2], [2,1], [2,2]]
    ];

    const iShape = [
        [[1,1], [1,2], [1,3], [1,4]],
        [[1,1], [2,1], [3,1], [4,1]],
        [[1,1], [1,2], [1,3], [1,4]],
        [[1,1], [2,1], [3,1], [4,1]],
    ];

    const tetrominos = [[lShape, "l"], [zShape, "z"], [sShape, "s"], [tShape, "t"], [oShape, "o"], [iShape, "i"]];
    const colors = ["lightblue", "darkblue", "orange", "yellow", "green", "red", "magenta"];
    let currentBlock = tetrominos[Math.floor(Math.random()*tetrominos.length)];
    let color = colors[Math.floor(Math.random()*colors.length)];
    let deltaPosition = 0;
    let deltaTranslate = 0;
    let currentRotation = 0;

    function drawPiece() {
        currentBlock[0][currentRotation].forEach(index => {
            var startingIndex = deltaPosition + (3 + index[0]) + (index[1]*10 - 10);
            tetrisGrid[startingIndex].classList.add("drawn");
        })
        var blocks = document.getElementsByClassName("block drawn");
        for (let i = 0; i < blocks.length; i++) {
            blocks[i].style.backgroundColor = color;
            blocks[i].style.width = "25px";
            blocks[i].style.height = "25px";
            blocks[i].style.border = "2px black solid";
        }
    }
    function removePiece() {
        currentBlock[0][currentRotation].forEach(index => {
            var startingIndex = deltaPosition + (3 + index[0]) + (index[1]*10 - 10);
            tetrisGrid[startingIndex].removeAttribute("style");
            tetrisGrid[startingIndex].classList.remove("drawn");
        })
    }
    function moveDown() {
        removePiece();
        deltaPosition += 10;
        drawPiece();
        placeBlock();
    }
    function placeBlock() {
        if(currentBlock[0][currentRotation].some(index => deltaPosition + (3 + index[0]) + (index[1]*10 - 10) >= 190 || tetrisGrid[deltaPosition + (3 + index[0]) + (index[1]*10)].getAttribute("id") != null)) {
            currentBlock[0][currentRotation].forEach(index => {
                var position = deltaPosition + (3 + index[0]) + (index[1]*10 - 10);
                tetrisGrid[position].setAttribute("id", currentBlock[1]);
                tetrisGrid[position].classList.remove("drawn");
                tetrisGrid[position].classList.add("placed");
                var row = Math.floor(position/10);
                var rowPosition = position - (row*10);
                rows[row][rowPosition] = currentBlock[1];
            });
            currentBlock = tetrominos[Math.floor(Math.random()*tetrominos.length)];
            color = colors[Math.floor(Math.random()*colors.length)];
            deltaPosition = 0;
            score += 1;
            currentRotation = 0;
            var scoreDiv = document.getElementById("sheet");
            scoreDiv.innerHTML = score;
            drawPiece();
            gameOver();
        }
    }
    function gameOver() {
        const finished = currentBlock[0][currentRotation].some(index => tetrisGrid[(deltaPosition + (3 + index[0]) + (index[1]*10 - 10))].classList.contains("placed"))
        if(finished) {
            clearInterval(timerId);
            var audio = document.getElementById("audio");
            audio.pause();
            audio.currentTime = 0;
            var scoreSend = document.getElementById("send-score");
            scoreSend.style.display = "block";
            var finalScore = document.createElement("input");
            finalScore.setAttribute("type", "text");
            finalScore.setAttribute("value", score);
            finalScore.setAttribute("name", "score");
            finalScore.style.backgroundColor = "blue";
            finalScore.style.fontFamily = "cursive";
            finalScore.style.fontSize = "14pt";
            finalScore.style.color = "red";
            finalScore.style.textAlign = "center";
            var submit = document.getElementById("submit");
            submit.before(finalScore);
        }
    }
    function movePieceLeft(){
        const boundry = currentBlock[0][currentRotation].some(index => (deltaPosition + (3 + index[0]) + (index[1]*10 - 10)) % 10 === 0)
        const takenBlock = currentBlock[0][currentRotation].some(index => tetrisGrid[((deltaPosition - 1) + (3 + index[0]) + (index[1]*10 - 10))].classList.contains("placed"))
        const takenDiogonal = currentBlock[0][currentRotation].some(index => tetrisGrid[((deltaPosition - 1) + (3 + index[0]) + (index[1]*10))].classList.contains("placed"))
        var blocks = document.getElementsByClassName("block drawn");
        removePiece();
        if(!boundry && !takenBlock && !takenDiogonal) {
            for(let i = 0; i < blocks.length; i++) {
                blocks[i].style.transform = "translate(" + (deltaTranslate - 30) +"px, 0px)";
            }
            deltaPosition -= 1;
            deltaTranslate -=30;
        }
        drawPiece();
    }
    function movePieceRight(){
        var multiplier = 9;
        const boundry = currentBlock[0][currentRotation].some(index => (deltaPosition + (3 + index[0]) + (index[1]*10 - 10)) % 10 === multiplier%10)
        const takenBlock = currentBlock[0][currentRotation].some(index => tetrisGrid[((deltaPosition + 1) + (3 + index[0]) + (index[1]*10 - 10))].classList.contains("placed"))
        const takenDiogonal = currentBlock[0][currentRotation].some(index => tetrisGrid[((deltaPosition + 1) + (3 + index[0]) + (index[1]*10))].classList.contains("placed"))
        var blocks = document.getElementsByClassName("block drawn");
        removePiece();
        if(!boundry && !takenBlock && !takenDiogonal) {
            for(let i = 0; i < blocks.length; i++) {
                blocks[i].style.transform = "translate(" + (deltaTranslate + 30) +"px, 0px)";
            }
            deltaPosition += 1;
            deltaTranslate +=30;
            multiplier += 10;
        }
        drawPiece();
    }
    function rotatePiece() {
        removePiece();
        currentRotation++;
        if(currentRotation > 3) {
            currentRotation = 0;
        }
        drawPiece();
    }
    function checkKey(e) {
        if(e.keyCode === 37) {
            movePieceLeft();
        }
        if(e.keyCode === 39)  {
            movePieceRight();
        }
        if(e.keyCode === 40) {
            moveDown();
        }
        if (e.keyCode == 38) {
            rotatePiece();
        }
    }
    document.addEventListener("keyup", checkKey);
    startButton.addEventListener("click", () => {
        if(timerId) {
            clearInterval(timerId);
            timerId = null;
        }else{
            var buttonDiv = document.getElementById("start");
            buttonDiv.style.display = "none";
            var scoreDiv = document.getElementById("sheet");
            scoreDiv.innerHTML = score;
            var audio = document.getElementById("audio");
            audio.play();
            audio.loop = true;
            drawPiece();
            timerId = setInterval(moveDown, 1000);
        }
    })
})


document.addEventListener("DOMContentLoaded", () => {
    const width = 30;
    const height = 30;
    const board = document.getElementsByClassName("tetris-bg");
    const tetrisGrid = Array.from(document.getElementsByClassName("block"));
    
    const lShape = [[1, 1], [1, 2], [1, 3], [2, 3]];
    const zShape = [[1, 1], [2, 1], [2, 2], [3, 2]];
    const sShape = [[1, 2], [2, 1], [2, 2], [3, 1]];
    const tShape = [[1, 1], [2, 1], [2, 2], [3, 1]];
    const oShape = [[1, 1], [1, 2], [2, 1], [2, 2]];
    const iShape = [[1, 1], [1, 2], [1, 3], [1, 4]];
    const tetrominos = [[lShape, "l"], [zShape, "z"], [sShape, "s"], [tShape, "t"], [oShape, "o"], [iShape, "i"]];
    const colors = ["lightblue", "darkblue", "orange", "yellow", "green", "red", "magenta"];
    let currentBlock = tetrominos[Math.floor(Math.random()*tetrominos.length)];
    let color = colors[Math.floor(Math.random()*colors.length)];
    let deltaPosition = 0;
    let deltaTranslate = 0;

    function drawPiece() {
        currentBlock[0].forEach(index => {
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
        currentBlock[0].forEach(index => {
            var startingIndex = deltaPosition + (3 + index[0]) + (index[1]*10 - 10);
            tetrisGrid[startingIndex].removeAttribute("style");
            tetrisGrid[startingIndex].classList.remove("drawn");
        })
    }
    drawPiece();
    timerId = setInterval(moveDown, 1000);
    function moveDown() {
        removePiece();
        deltaPosition += 10;
        drawPiece();
        placeBlock();
    }
    function placeBlock() {
        if(currentBlock[0].some(index => deltaPosition + (3 + index[0]) + (index[1]*10 - 10) >= 190 || tetrisGrid[deltaPosition + (3 + index[0]) + (index[1]*10)].getAttribute("id") != null)) {
            currentBlock[0].forEach(index => {
                tetrisGrid[deltaPosition + (3 + index[0]) + (index[1]*10 - 10)].setAttribute("id", currentBlock[1]);
                tetrisGrid[deltaPosition + (3 + index[0]) + (index[1]*10 - 10)].classList.remove("drawn");
                tetrisGrid[deltaPosition + (3 + index[0]) + (index[1]*10 - 10)].classList.add("placed");
            });
            currentBlock = tetrominos[Math.floor(Math.random()*tetrominos.length)];
            color = colors[Math.floor(Math.random()*colors.length)];
            deltaPosition = 0;
            drawPiece();
            gameOver();
        }
    }
    function gameOver() {
        const finished = currentBlock[0].some(index => tetrisGrid[(deltaPosition + (3 + index[0]) + (index[1]*10 - 10))].classList.contains("placed"))
        if(finished) {
            clearInterval(timerId);
        }
    }
    function movePieceLeft(){
        const boundry = currentBlock[0].some(index => (deltaPosition + (3 + index[0]) + (index[1]*10 - 10)) % 10 === 0)
        const takenBlock = currentBlock[0].some(index => tetrisGrid[((deltaPosition - 1) + (3 + index[0]) + (index[1]*10 - 10))].classList.contains("placed"))
        const takenDiogonal = currentBlock[0].some(index => tetrisGrid[((deltaPosition - 1) + (3 + index[0]) + (index[1]*10))].classList.contains("placed"))
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
        const boundry = currentBlock[0].some(index => (deltaPosition + (3 + index[0]) + (index[1]*10 - 10)) % 10 === multiplier%10)
        const takenBlock = currentBlock[0].some(index => tetrisGrid[((deltaPosition + 1) + (3 + index[0]) + (index[1]*10 - 10))].classList.contains("placed"))
        const takenDiogonal = currentBlock[0].some(index => tetrisGrid[((deltaPosition + 1) + (3 + index[0]) + (index[1]*10))].classList.contains("placed"))
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
    function checkKey(e) {
        if(e.keyCode === 37) {
            movePieceLeft();
        }
        if(e.keyCode === 39)  {
            movePieceRight();
        }
    }
    document.addEventListener("keyup", checkKey);
})


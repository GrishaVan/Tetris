document.addEventListener("DOMContentLoaded", () => {
    const width = 30;
    const height = 30;
    const board = document.getElementsByClassName("tetris-bg");
    const tetrisGrid = Array.from(document.getElementsByClassName("block"));
    var blockInfo = new Array(tetrisGrid.length);
    for (let i = 0; i < tetrisGrid.length; i++) {
        var info = new Array(2);
        info[0] = "";
        info[1] = "";
        blockInfo[0] = info;
    }

    
    const lShape = [[1, 1], [1, 2], [1, 3], [2, 3]];
    const zShape = [[1, 1], [2, 1], [2, 2], [2, 3]];
    const sShape = [[1, 2], [2, 1], [2, 2], [3, 1]];
    const tShape = [[1, 1], [2, 1], [2, 2], [3, 1]];
    const oShape = [[1, 1], [1, 2], [2, 1], [2, 2]];
    const iShape = [[1, 1], [1, 2], [1, 3], [1, 4]];
    const tetrominos = [[lShape, "l"], [zShape, "z"], [sShape, "s"], [tShape, "t"], [oShape, "o"], [iShape, "i"]];
    let currentBlock = tetrominos[Math.floor(Math.random()*tetrominos.length)];

    function drawPiece() {
        currentBlock[0].forEach(index => {
            var startingIndex = (3 +index[0]) + (index[1]*10 - 10);
            tetrisGrid[startingIndex].setAttribute("id", currentBlock[1]);
            tetrisGrid[startingIndex].classList.add("placed");
        });
        var blocks = document.getElementsByClassName("block placed");
        for (let i = 0; i < blocks.length; i++) {
            blocks[i].style.backgroundColor = "red";
        };
    };
    function removePiece() {
        currentBlock[0].forEach(index => {
            startingIndex = (3 +index[0]) + (index[1]*10 - 10);
            tetrisGrid[startingIndex].removeAttribute("id");
        });
    };
    drawPiece();
});


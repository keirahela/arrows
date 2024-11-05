const possibleTexts = ["LEFT", "UP", "DOWN", "RIGHT"]
const possibleMoves = ["ArrowRight", "ArrowLeft", "ArrowUp", "ArrowDown"]

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

let gameRunning = false;
let currentMove = null;

function generateNewMove() {
    let _move = possibleTexts[getRndInteger(0, possibleTexts.length - 1)].toLowerCase()
    document.getElementById('randomtext').innerText = _move;
    currentMove = "Arrow"+_move.charAt(0).toUpperCase() + _move.slice(1);
    console.log(currentMove);
}


document.addEventListener("DOMContentLoaded", (event) => {
    document.onkeydown = function (e) {
        e = e || window.Event;
        // use e.keyCode
        console.log(currentMove)
        console.log(e.key)
        if(currentMove == e.key) {
            generateNewMove();
        }
    };

    document.getElementById('start').onclick = () => {
        if(gameRunning) return;
        gameRunning = true;
        generateNewMove();
    }

    document.getElementById('stop').onclick = () => {
        if(gameRunning) return;
        gameRunning = true;
        generateNewMove();
    }
});
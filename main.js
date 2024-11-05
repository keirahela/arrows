const possibleTexts = ["LEFT", "UP", "DOWN", "RIGHT"]
const possibleMoves = ["ArrowRight", "ArrowLeft", "ArrowUp", "ArrowDown"]

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

let gameRunning = false;
let currentMove = null;
let currentInfo = { Correct: 0, Incorrect: 0 };

function generateNewMove() {
    let _move = possibleTexts[getRndInteger(0, possibleTexts.length - 1)].toLowerCase()
    document.getElementById('randomtext').innerText = _move;
    currentMove = "Arrow"+_move.charAt(0).toUpperCase() + _move.slice(1);
    console.log(currentMove);
}

async function showInfo(currentArrow, isValid) {
    document.getElementById(currentArrow).style.backgroundColor = isValid ? "lightgreen" : "lightcoral";
    await sleep(200);
    document.getElementById(currentArrow).style.backgroundColor = "rgb(228, 228, 228)";
    currentInfo[isValid ? "Correct" : "Incorrect"] += 1
}

function showResults() {
    document.getElementById('randomtext').innerText = `${currentInfo["Correct"]}/${currentInfo["Correct"] + currentInfo["Incorrect"]}. Avg: ${(currentInfo["Correct"] / (currentInfo["Correct"] + currentInfo["Incorrect"])).toFixed(3)}%`
}

function startGame() {
    if(gameRunning) return;
    gameRunning = true;
    generateNewMove();
    setTimeout(() => {
        stopGame();
    }, 20000)
}

function stopGame() {
    if(!gameRunning) return;
    showResults();
    gameRunning = false
}


document.addEventListener("DOMContentLoaded", (event) => {
    document.onkeydown = async function (e) {
        e = e || window.Event;

        if(e.key == "Enter") {
            startGame();
        } else if(e.key == "Escape") {
            stopGame();
        } else {
            if(possibleMoves.includes(e.key)) {
                if(currentMove == e.key) {
                    await showInfo(e.key, true);
                    generateNewMove();
                } else {
                    await showInfo(e.key, false);
                    generateNewMove();
                }
            }
        }
    };

    document.getElementById('start').onclick = () => {
        startGame();
    }

    document.getElementById('stop').onclick = () => {
        stopGame();
    }
});
const possibleTexts = ["LEFT", "UP", "DOWN", "RIGHT"]
const possibleMoves = ["ArrowRight", "ArrowLeft", "ArrowUp", "ArrowDown"]

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

let gameRunning = false;
let currentMove = null;
let currentInfo = { Correct: 0, Incorrect: 0 };
let count = 20;
let interval = null;

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

function updateCounter() {
    if(!gameRunning) {
        clearInterval(interval);
        return;
    }
    count--;
    document.getElementById('counter').innerText = count;

    if(count === 0) {
        return stopGame();
    }
}

function startGame() {
    if(gameRunning) return;
    gameRunning = true;
    generateNewMove();
    interval = setInterval(updateCounter, 1000);
}

function stopGame() {
    if(!gameRunning) return;
    gameRunning = false;
    showResults();
    count = 20;
    document.getElementById('counter').innerText = count;
}

async function onKeyPress(currentKey) {
    if(!gameRunning) return;
    if(currentMove == currentKey) {
        await showInfo(currentKey, true);
        generateNewMove();
    } else {
        await showInfo(currentKey, false);
        generateNewMove();
    }
}


document.addEventListener("DOMContentLoaded", (event) => {

    for(const child of document.getElementById('arrows').children) {
        child.style.cursor = 'pointer';
        child.onclick = async function() {
            onKeyPress(child.id);
        }
    }

    document.onkeydown = async function (e) {
        e = e || window.Event;
        
        if(e.key == "Enter") {
            if(gameRunning) return;
            startGame();
        } else if(e.key == "Escape") {
            if(!gameRunning) return;
            stopGame();
        } else {
            if(!gameRunning) return;
            if(possibleMoves.includes(e.key)) {
                onKeyPress(e.key);
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
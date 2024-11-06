var isGameStarted = false
var successInterval
var turns = 0
var successes = 0

var time = 0
var timeInterval
var pressTimes = []
var updateTime

function Start() {
    if (isGameStarted) { return }

    isGameStarted = true
    
    time = 20
    document.getElementById("timeDisplay").innerText = "Time left: " + time + " seconds"
    timeInterval = setInterval(() => {
        time--
        document.getElementById("timeDisplay").innerText = "Time left: " + time + " seconds"
        if (time <= 0) {
            Stop()
        }
    }, 1000);

    GameUpdate()
}

function Stop() {
    if (!isGameStarted) { return }

    isGameStarted = false
    document.getElementById("display").innerText = "DISPLAY_PLACEHOLDER"
    document.getElementById("timeDisplay").innerText = ""

    ClearSuccessInterval()
    clearInterval(timeInterval)

    let reactionTime = 0
    for (let index = 0; index < pressTimes.length; index++) {
        reactionTime += pressTimes[index]
    }

    window.alert("Fordulók/Helyes találatok: " + turns + "/" + successes + "\nÁtlagos reakció idő: " + Math.round(reactionTime/pressTimes.length) + " ms")
}

document.addEventListener("keydown", OnKeyPress, false)
document.addEventListener("keydown", ShowButtonPress, false)
document.addEventListener("keyup", ClearButtonPress, false)



var keys = [
    "LEFT",
    "RIGHT",
    "UP",
    "DOWN"
]
var currentKey = ""

function GameUpdate() {
    ClearSuccessInterval()

    let next
    do {
        next = keys[randomIntFromInterval(0, keys.length - 1)]
    } while (next == currentKey);

    currentKey = next

    document.getElementById("display").innerText = currentKey
    document.getElementById("displayContainer").style.backgroundColor = "white"

    updateTime = new Date()
}

function OnKeyPress(event) {
    if (event.key == "Enter") {
        Start()
        return;
    }
    if(event.key == "Backspace") {
        Stop()
        return;
    }

    if (successInterval != null || !isGameStarted) { return }

    turns++

    if (currentKey == event.key.substring(5, 10).toUpperCase()) {
        successes++
        document.getElementById("displayContainer").style.backgroundColor = "green"
        successInterval = setInterval(GameUpdate, 250);
    }
    else {
        GameUpdate()
    }

    pressTimes.push(new Date() - updateTime)
}

function ClearSuccessInterval() {
    if (successInterval != null) {
        clearInterval(successInterval)
        successInterval = null
    }
}

function ShowButtonPress(event) {
    let key = event.key.substring(5, 10).toUpperCase();
    if (!keys.includes(key)) { return }

    document.getElementById(key).style.backgroundColor = "green";
}

function ClearButtonPress(event) {
    let key = event.key.substring(5, 10).toUpperCase();
    if (!keys.includes(key)) { return }

    document.getElementById(key).style = null
}




function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

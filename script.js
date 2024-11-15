let timerDuration = .5 * 60 * 1000; // 5 minutes in milliseconds
let remainingTime = timerDuration;
let intervalId;
let last10SecPlayed = false;


const last10SecSound = document.getElementById("last10SecSound");
const alarmSound = document.getElementById("alarmSound");
const stopAlarmButton = document.getElementById("stopAlarm");

function start() {
    if (!intervalId && remainingTime > 0) {
        const startTime = Date.now();
        intervalId = setInterval(() => {
            const elapsed = Date.now() - startTime;
            remainingTime = timerDuration - elapsed;

            
            if (remainingTime <= 10 * 1000 && !last10SecPlayed) {
                last10SecSound.play();
                last10SecPlayed = true; 
            }

            if (remainingTime <= 0) {
                clearInterval(intervalId);
                intervalId = null;
                remainingTime = 0;
                updateDisplay();
                alarmSound.play(); 
                stopAlarmButton.style.display = "inline-block"; 
            } else {
                updateDisplay();
            }
        }, 100);
    }
}

function stop() {
    clearInterval(intervalId);
    intervalId = null;
}

function reset() {
    clearInterval(intervalId);
    intervalId = null;
    remainingTime = timerDuration;
    last10SecPlayed = false; 
    alarmSound.pause();
    alarmSound.currentTime = 0; 
    stopAlarmButton.style.display = "none";
    updateDisplay();
}

function stopAlarm() {
    alarmSound.pause(); 
    alarmSound.currentTime = 0;
    stopAlarmButton.style.display = "none"; 
}

function updateDisplay() {
    const totalSeconds = Math.floor(remainingTime / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    document.getElementById("display").textContent =
        `${String(minutes).padStart(2, '0')}:` +
        `${String(seconds).padStart(2, '0')}`;
}

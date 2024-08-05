let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let isRunning = false;

const display = document.getElementById('display');
const startPauseBtn = document.getElementById('startPauseBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const saveLapsBtn = document.getElementById('saveLapsBtn');
const viewLapsBtn = document.getElementById('viewLapsBtn');
const themeToggleBtn = document.getElementById('themeToggleBtn');
const lapsList = document.getElementById('lapsList');
const clock = document.getElementById('clock');
const clickSound = document.getElementById('clickSound');

startPauseBtn.addEventListener('click', () => {
    startPause();
    playSound();
});
resetBtn.addEventListener('click', () => {
    reset();
    playSound();
});
lapBtn.addEventListener('click', () => {
    lap();
    playSound();
});
saveLapsBtn.addEventListener('click', () => {
    saveLaps();
    playSound();
});
viewLapsBtn.addEventListener('click', () => {
    viewLaps();
    playSound();
});
themeToggleBtn.addEventListener('click', () => {
    toggleTheme();
    playSound();
});

function startPause() {
    if (isRunning) {
        clearInterval(timerInterval);
        startPauseBtn.textContent = 'Start';
    } else {
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(updateTime, 10);
        startPauseBtn.textContent = 'Pause';
    }
    isRunning = !isRunning;
}

function reset() {
    clearInterval(timerInterval);
    isRunning = false;
    elapsedTime = 0;
    display.textContent = '00:00:00.00';
    startPauseBtn.textContent = 'Start';
    lapsList.innerHTML = '';
}

function lap() {
    if (isRunning) {
        const lapTime = document.createElement('li');
        lapTime.textContent = formatTime(elapsedTime);
        lapsList.appendChild(lapTime);
    }
}

function saveLaps() {
    if (lapsList.innerHTML.trim()) {
        const laps = lapsList.innerHTML;
        localStorage.setItem('laps', laps);
        alert('Laps saved!');
    }
}

function viewLaps() {
    const savedLaps = localStorage.getItem('laps');
    if (savedLaps) {
        lapsList.innerHTML = savedLaps;
        alert('Laps loaded!');
    } else {
        alert('No saved laps found.');
    }
}

function updateTime() {
    elapsedTime = Date.now() - startTime;
    display.textContent = formatTime(elapsedTime);
}

function formatTime(time) {
    const date = new Date(time);
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    const seconds = String(date.getUTCSeconds()).padStart(2, '0');
    const milliseconds = String(date.getUTCMilliseconds()).padStart(3, '0');
    return `${minutes}:${seconds}.${milliseconds.slice(0, 2)}`;
}

function toggleTheme() {
    document.body.classList.toggle('dark');
}

function playSound() {
    clickSound.currentTime = 0;
    clickSound.play();
}

function updateClock() {
    const now = new Date();
    clock.textContent = now.toLocaleTimeString();
}

setInterval(updateClock, 1000);

// Load saved laps from localStorage on page load
window.onload = () => {
    const savedLaps = localStorage.getItem('laps');
    if (savedLaps) {
        lapsList.innerHTML = savedLaps;
    }
    updateClock();
};

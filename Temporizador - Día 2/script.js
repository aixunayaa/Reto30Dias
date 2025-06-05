let centiseconds = 0;
let seconds = 0;
let minutes = 0;
let hours = 0;
let timer;
let running = false;

function updateDisplay() {
  const display = document.getElementById('display');
  const h = String(hours).padStart(2, '0');
  const m = String(minutes).padStart(2, '0');
  const s = String(seconds).padStart(2, '0');
  const cs = String(centiseconds).padStart(2, '0');
  display.textContent = `${h}:${m}:${s}:${cs}`;
}

function tick() {
  centiseconds++;
  if (centiseconds === 100) {
    centiseconds = 0;
    seconds++;
    if (seconds === 60) {
      seconds = 0;
      minutes++;
      if (minutes === 60) {
        minutes = 0;
        hours++;
      }
    }
  }
  updateDisplay();
}

function startTimer() {
  if (!running) {
    timer = setInterval(tick, 10); // Cada 10 ms = 1 centésima
    running = true;
  }
}

function pauseTimer() {
  clearInterval(timer);
  running = false;
}

function resetTimer() {
  clearInterval(timer);
  centiseconds = 0;
  seconds = 0;
  minutes = 0;
  hours = 0;
  running = false;
  updateDisplay();
}

updateDisplay();

let count = 0;

const counterDisplay = document.getElementById('numero-contador');
const decreaseBtn = document.getElementById('btn-disminuir');
const resetBtn = document.getElementById('btn-reiniciar');
const increaseBtn = document.getElementById('btn-aumentar');

decreaseBtn.addEventListener('click', () => {
    count--;
    counterDisplay.textContent = count;
});

resetBtn.addEventListener('click', () => {
    count = 0;
    counterDisplay.textContent = count;
});

increaseBtn.addEventListener('click', () => {
    count++;
    counterDisplay.textContent = count;
});
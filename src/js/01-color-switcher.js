function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const refs = {
    body: document.querySelector('body'),
    btnStart: document.querySelector('[data-start]'),
    btnStop: document.querySelector('[data-stop]'),
};

let  timerId = null;

refs.btnStart.addEventListener('click', onClickBtnStart);
refs.btnStop.addEventListener('click', onClickBtnStop);

function onClickBtnStart() {
    refs.btnStart.disabled = true;
    refs.btnStop.disabled = false;

    timerId = setInterval(() => {
        refs.body.style.background = getRandomHexColor();
    }, 1000);
 
};
    
function  onClickBtnStop() {
    refs.btnStart.disabled = false;
    refs.btnStop.disabled = true;

    clearInterval(timerId);
};


import Notiflix from 'notiflix';
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const refs = {
    btnStart: document.querySelector('button[data-start]'),
    inputField: document.querySelector('#datetime-picker'),
    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    minutes: document.querySelector('[data-minutes]'),
    seconds: document.querySelector('[data-seconds]'),
};
 
let selectedTime = null;
const currentDate =  new Date();
let intervalId = null;

refs.btnStart.setAttribute('disabled', true);

const options = {
  enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      if(selectedDates[0] < currentDate) {
        Notiflix.Notify.failure("Please choose a date in the future"); 
        refs.btnStart.setAttribute('disabled', true);
      }

      if(selectedDates[0] > currentDate) {
        selectedTime = selectedDates[0];
        refs.btnStart.disabled = false;
      }
      console.log(selectedDates[0]);
    },
};

flatpickr(refs.inputField, options);


refs.btnStart.addEventListener('click',onStartTimer);


function onStartTimer() {
  refs.btnStart.setAttribute('disabled', true);
  

  intervalId = setInterval(() => {
   const deltaTime =  selectedTime - Date.now();
   if(deltaTime <= 1000) {
    clearInterval(intervalId);
   }
   const { days, hours, minutes, seconds } = convertMs(deltaTime);
   console.log(`${days}:${hours}:${minutes}:${seconds}`);

    refs.days.textContent = addLeadingZero(days);
    refs.hours.textContent = addLeadingZero(hours);
    refs.minutes.textContent = addLeadingZero(minutes);
    refs.seconds.textContent = addLeadingZero(seconds);
    
  }, 1000);

};


function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    const days = addLeadingZero(Math.floor(ms / day));
    const hours = addLeadingZero(Math.floor((ms % day) / hour));
    const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
    const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));
  
    return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}

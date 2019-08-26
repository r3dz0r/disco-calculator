'use strict';

var
   btnsBlock = document.querySelector('.calculator__wrap'),
   input = document.querySelector('.calculator__input'),
   pageBody = document.body,
   disco = false,
   audio = new Audio('audio/TheBeeGees-StayinAlive.mp3'),
   sphere = document.querySelector('.sphere'),
   discoBtn = document.querySelector('.disco'),
   btnsArr = document.querySelectorAll('.calculator__button'),
   REG_NUMBER = /^[0-9]$/;

/**
 * method for for get random index
 * @param {number} length of array
 */
function getRandomIndex(length) {
   return Math.floor(Math.random() * length);
};

/**
 * method for get random number
 * @param {number} max number
 * @param {number} min number
 */
function getRandomNumber(max, min) {
   return Math.floor(Math.random() * (max - min + 1) + min);
};

// listener for buttons
btnsBlock.onclick = function(evt) {
   switch (evt.target.value) {
      case 'C':
         // clear button
         input.value = '';
         toNormalView();
         break;
      case '=':
         // equal button
         input.value = eval(input.value);
         valueChecker();
         break;
      case '<':
         // backspace button
         input.value = input.value.substring(0, input.value.length - 1);
         valueChecker();
         break;
      default:
         if (!evt.target.value) {
            return false;
         }
         var lastLetter = input.value.slice(-1);

         // check last letter of input
         switch (lastLetter) {
            case '*':
            case '+':
            case '/':
            case '.':
            case '-':

               // if value is not a number - return
               if (!+evt.target.value) {
                  return false;
               }
         }
         input.value += evt.target.value;
         valueChecker();
   }
};

/**
 * key ups events
 */
document.addEventListener('keyup', function(evt) {
   if (REG_NUMBER.exec(evt.key)) {
      input.value += evt.key;
      valueChecker();
   }
});

// click listener too rule them all
discoBtn.addEventListener('click', function() {
   disco = !disco;
   if (disco) {
      audio.play().then(function() {
         sphere.classList.add('sphere--shown');
         discoBtn.innerHTML = 'STOP IT!';
      });
   } else {
      audio.pause();
      sphere.classList.remove('sphere--shown');
      discoBtn.innerHTML = 'if u want disco';
   }
});

/**
 * method to return buttons on default positions
 */
function toNormalView() {
   btnsArr.forEach(function(btn) {
      if (btn.classList.contains('calculator__button--zero') ||
         btn.classList.contains('calculator__button--dot')) {
         btn.style.position = 'relative';
         btn.style.top = -60 + 'px';
      } else {
         btn.style.position = 'static';
         btn.style.top = 0 + 'px';
      }
      btn.style.left = 0 + 'px';
   })
};

/**
 * easter egg
 */
function valueChecker() {
   if (+input.value === 5051) {
      var
         clientWidth = document.body.clientWidth,
         clientHeight = document.body.clientHeight,
         btnPoisitionX,
         btnPoisitionY;
      btnsArr.forEach(function(btn) {
         btn.style.position = 'absolute';
         btnPoisitionX = getRandomNumber(0, clientWidth);
         btnPoisitionY = getRandomNumber(0, clientHeight);
         btn.style.left = (clientWidth - btnPoisitionX) < btn.offsetWidth ?
            clientWidth - btn.offsetWidth - 10 + 'px' :
            btnPoisitionX + 'px';
         btn.style.top = (clientHeight - btnPoisitionY) < btn.offsetHeight ?
            clientHeight - btn.offsetHeight - 10 + 'px' :
            btnPoisitionY + 'px';
      })
   }
};

/**
 * interval for change linear gradient
 */
setInterval(function() {
   if (disco) {
      var
         firstColor = 'rgb(' + getRandomNumber(255, 0).toString() + ', ' + getRandomNumber(255, 0).toString() + ', ' + getRandomNumber(255, 0).toString() + ')',
         secondColor = 'rgb(' + getRandomNumber(255, 0).toString() + ', ' + getRandomNumber(255, 0).toString() + ', ' + getRandomNumber(255, 0).toString() + ')',
         isPositive = Math.random() >= 0.5 ? '' : '-',
         gradientDeg = getRandomNumber(360, 0).toString() + 'deg,';
      pageBody.style.background = 'linear-gradient(' + isPositive + gradientDeg + firstColor + ',' + secondColor;
   }
}, 500);
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
   colorArr = [
      'white',
      'blue',
      'black',
      'magenta',
      'red',
      'green',
      'brown',
      'crimson',
      'pink',
      'gold',
      'lightsalmon',
      'indianred',
      'aqua',
      'lightcyan',
      'moccasin',
      'lavender',
      'snow',
      'lime'
   ];

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
         input.value = input.value + evt.target.value;
         valueChecker();
   }
};

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
         clientHeight = document.body.clientHeight;
      btnsArr.forEach(function(btn) {
         btn.style.position = 'absolute';
         btn.style.left = getRandomNumber(0, clientWidth) + 'px';
         btn.style.top = getRandomNumber(0, clientHeight) + 'px';
      })
   }
};

/**
 * interval for change linear gradient
 */
setInterval(function() {
   if (disco) {
      var
         firstColor = colorArr[getRandomIndex(colorArr.length)],
         secondColor = colorArr[getRandomIndex(colorArr.length)];
      pageBody.style.background = 'linear-gradient(45deg,' + firstColor + ',' + secondColor;
   }
}, 500);
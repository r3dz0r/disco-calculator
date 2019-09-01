(function() {
   const
      btnsBlock = document.querySelector('.calculator__wrap'),
      input = document.querySelector('.calculator__input'),
      pageBody = document.body,
      songs = ['audio/TheBeeGees-StayinAlive.mp3',
         'audio/BoneyM-Rasputin.mp3',
         'audio/GloriaGayno-IWillSurvive.mp3',
         'audio/AnitaWard-RingMyBell.mp3',
      ],
      sphere = document.querySelector('.sphere'),
      discoBtn = document.querySelector('.disco'),
      valueBtnsSmall = [
         'C', '<', '/', '*', '7', '8', '9', '-', '4', '5', '6', '+', '1', '2', '3', '=', '0', '.'
      ],
      REG_NUMBER = /^[0-9]$/;

   let
      calculatorSmall = {

         // song title
         songTitle: null,

         // audio obj
         audio: null,

         // boolean if need disco
         disco: false,

         // array of buttons

         btnsArr: null,

         /**
          * init calc app
          */
         init: function() {
            this.initElements();

            this.btnsArr = document.querySelectorAll('.calculator__button');
            this.songTitle = songs[this.getRandomIndex(songs.length)];
            this.audio = new Audio(this.songTitle);

            // interval for change linear gradient
            setInterval(function() {
               if (this.disco) {
                  let
                     firstColor = 'rgb(' + this.getRandomNumber(255, 0).toString() + ', ' + this.getRandomNumber(255, 0).toString() + ', ' + this.getRandomNumber(255, 0).toString() + ')',
                     secondColor = 'rgb(' + this.getRandomNumber(255, 0).toString() + ', ' + this.getRandomNumber(255, 0).toString() + ', ' + this.getRandomNumber(255, 0).toString() + ')',
                     isPositive = Math.random() >= 0.5 ? '' : '-',
                     gradientDeg = this.getRandomNumber(360, 0).toString() + 'deg,';
                  pageBody.style.background = 'linear-gradient(' + isPositive + gradientDeg + firstColor + ',' + secondColor;
               }
            }.bind(this), 500);
            this.initListeners();
         },

         initElements: function() {
            let elemBtn;
            valueBtnsSmall.forEach(function(btn) {
               elemBtn = document.createElement('button');
               elemBtn.type = 'button';
               elemBtn.value = btn;
               elemBtn.innerHTML = btn;
               elemBtn.classList.add('calculator__button');
               switch (btn) {
                  case '=':
                     elemBtn.classList.add('calculator__button--equal');
                     break;
                  case '0':
                     elemBtn.classList.add('calculator__button--zero');
                     break;
                  case '.':
                     elemBtn.classList.add('calculator__button--dot');
                     break;
               }
               btnsBlock.appendChild(elemBtn);
            }.bind(this));
         },

         /**
          * init app listeners
          */
         initListeners: function() {
            let self = this;
            // listener for buttons
            btnsBlock.onclick = function(evt) {
               switch (evt.target.value) {
                  case 'C':
                     // clear button
                     input.value = '';
                     self.toNormalView();
                     break;
                  case '=':
                     // equal button
                     input.value = eval(input.value);
                     self.valueChecker();
                     break;
                  case '<':
                     // backspace button
                     input.value = input.value.substring(0, input.value.length - 1);
                     self.valueChecker();
                     break;
                  default:
                     if (!evt.target.value) {
                        return false;
                     }
                     let lastLetter = input.value.slice(-1);

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
                     self.valueChecker();
               }
            };

            // key ups events
            document.addEventListener('keyup', function(evt) {
               if (REG_NUMBER.exec(evt.key)) {
                  input.value += evt.key;
                  this.valueChecker();
               }
            }.bind(this));

            // click listener too rule them all
            discoBtn.addEventListener('click', function() {
               this.disco = !this.disco;
               if (this.disco) {
                  this.audio.play().then(function() {
                     sphere.classList.add('sphere--shown');
                     discoBtn.innerHTML = 'STOP IT!';
                  });
               } else {
                  this.audio.pause();
                  sphere.classList.remove('sphere--shown');
                  discoBtn.innerHTML = 'if u want disco';
               }
            }.bind(this));
         },

         /**
          * method for for get random index
          * @param {number} length of array
          */
         getRandomIndex: function(length) {
            return Math.floor(Math.random() * length);
         },

         /**
          * method for get random number
          * @param {number} max number
          * @param {number} min number
          */
         getRandomNumber: function(max, min) {
            return Math.floor(Math.random() * (max - min + 1) + min);
         },

         /**
          * method to return buttons on default positions
          */
         toNormalView: function() {
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
         },

         /**
          * easter egg
          */
         valueChecker: function() {
            if (+input.value === 5051) {
               let
                  clientWidth = document.body.clientWidth,
                  clientHeight = document.body.clientHeight,
                  btnPoisitionX,
                  btnPoisitionY;
               btnsArr.forEach(function(btn) {
                  btn.style.position = 'absolute';
                  btnPoisitionX = this.getRandomNumber(0, clientWidth);
                  btnPoisitionY = this.getRandomNumber(0, clientHeight);
                  btn.style.left = (clientWidth - btnPoisitionX) < btn.offsetWidth ?
                     clientWidth - btn.offsetWidth - 10 + 'px' :
                     btnPoisitionX + 'px';
                  btn.style.top = (clientHeight - btnPoisitionY) < btn.offsetHeight ?
                     clientHeight - btn.offsetHeight - 10 + 'px' :
                     btnPoisitionY + 'px';
               }.bind(this));
            }
         }
      }

   calculatorSmall.init();
})();
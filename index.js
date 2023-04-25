var todo_of_the_day = [{
    "Title": "Complimenti oggi andrete a fare un Puzzle da 1000 pz",
    "Todo": "Fare un Puzzle",
    "Date": "2023-04-24T21:00:00.000Z"
}, {
    "Title": "Cosa ne pensate di una gita fuori?",
    "Todo": "Prendete il pranzo al sacco e andate a fare una gita fuori città",
    "Date": "2023-04-25T21:00:00.000Z"
}, {
    "Title": "Ti stai annoiando?",
    "Todo": "È arrivato il momento di prendere un video di tik tok che si possa fare in 2 e che va di moda.\n Poi registratevi mentre lo fate finchè non è almeno decente :)",
    "Date": "2023-04-26T21:00:00.000Z"
}, {
    "Title": "Sapete cos'è wordle?",
    "Todo": "Cercate su google Wordle e sfidatevi, vince chi trova la parola corretta in meno tentativi, una sfida senza regole!",
    "Date": "2023-04-27T21:00:00.000Z"
}, {
    "Title": "Complimenti oggi dovrete fare un allenamento intensivo per 3 ore",
    "Todo": "Fare un allenamento intensivo",
    "Date": "2023-04-28T21:00:00.000Z"
}, {
    "Title": "Complimenti oggi vi mangerete un bel Sushi",
    "Todo": "Mangerete Sushi",
    "Date": "2023-04-29T21:00:00.000Z"
}, {
    "Title": "Complimenti oggi mangerete Pizza",
    "Todo": "Mangerete una pizza",
    "Date": "2023-04-30T21:00:00.000Z"
}, {
    "Title": "Complimenti oggi mangerete Hamburger",
    "Todo": "Mangerete un Hamburger",
    "Date": "2023-05-01T21:00:00.000Z"
}]

// Add a random integer to Math, as it should be.
Math.randInt = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  
  
  // Get a string back from the input where all characters not including spaces are replaced by a random character.
  function getRandStringFrom(chars, string) {
    var random_string = "";
  
    for (var char = 0; char < string.length + 1; char++) {
      if (string[char] == " ") random_string += " ";
      else random_string += chars.charAt(Math.randInt(0, chars.length));
    }
  
    return random_string;
  }

function isToday(date) {
    const now = new Date()

    return date.getDate() === now.getDate() &&
        date.getMonth() === now.getMonth() &&
        date.getFullYear() === now.getFullYear()
}


const composeTodo = () => {
    const activity = todo_of_the_day.find(el => isToday(new Date(el.Date)))
    const title_todo = document.getElementById('title_todo');
    title_todo.innerText = activity.Title;

    const activity_todo = document.getElementById('activity_todo');
    // activity_todo.innerText = activity.Todo;


    /*new WordShuffler(title_todo, {
        textColor: '#59c4f9',
        timeOffset: 2,
        mixCapital: true,
        mixSpecialCharacters: true
    });*/

    setTimeout(() => {
        activity_todo.style.display = "block";
        
        (function loop() {
            var original_content = activity.Todo;
            var current_length = 0;
        
            // This is the update loop that updates for every character in the original string.
            var appearUpdate = setInterval(function() {
              // Get the current length substring from the orifinal content.
              var substring_section = original_content.substring(0, current_length);
              
              // If the first or last characters are spaces, make them non-breaking so the text doesn't stagger.
              substring_section = substring_section.replace(/^ /, "\xa0").replace(/ $/, "\xa0");
              
              // Get the randomised version of the substring above.
              var random_string = getRandStringFrom("@#$%^", substring_section);
        
              // Set the respective elements.
              // random_appear.innerText = random_string;
              activity_todo.innerText = substring_section;
        
              // Increase the length and prepare for the next update.
              current_length++;
        
              // If the current string length is as long as the final message, it must be done.
              if (current_length > original_content.length) clearInterval(appearUpdate);
            }, 50);
        
            // Run this current loop again.
            // setTimeout(loop, 5000);
          })();
    }, 1000)

    
}

function WordShuffler(holder, opt) {
    var that = this;
    var time = 0;
    this.now;
    this.then = Date.now();

    this.delta;
    this.currentTimeOffset = 0;

    this.word = null;
    this.currentWord = null;
    this.currentCharacter = 0;
    this.currentWordLength = 0;


    var options = {
        fps: 20,
        timeOffset: 5,
        textColor: '#000',
        fontSize: "50px",
        useCanvas: false,
        mixCapital: false,
        mixSpecialCharacters: false,
        needUpdate: true,
        colors: [
            '#f44336', '#e91e63', '#9c27b0',
            '#673ab7', '#3f51b5', '#2196f3',
            '#03a9f4', '#00bcd4', '#009688',
            '#4caf50', '#8bc34a', '#cddc39',
            '#ffeb3b', '#ffc107', '#ff9800',
            '#ff5722', '#795548', '#9e9e9e',
            '#607d8b'
        ]
    }

    if (typeof opt != "undefined") {
        for (key in opt) {
            options[key] = opt[key];
        }
    }



    this.needUpdate = true;
    this.fps = options.fps;
    this.interval = 1000 / this.fps;
    this.timeOffset = options.timeOffset;
    this.textColor = options.textColor;
    this.fontSize = options.fontSize;
    this.mixCapital = options.mixCapital;
    this.mixSpecialCharacters = options.mixSpecialCharacters;
    this.colors = options.colors;

    this.useCanvas = options.useCanvas;

    this.chars = [
        'A', 'B', 'C', 'D',
        'E', 'F', 'G', 'H',
        'I', 'J', 'K', 'L',
        'M', 'N', 'O', 'P',
        'Q', 'R', 'S', 'T',
        'U', 'V', 'W', 'X',
        'Y', 'Z'
    ];
    this.specialCharacters = [
        '!', '§', '$', '%',
        '&', '/', '(', ')',
        '=', '?', '_', '<',
        '>', '^', '°', '*',
        '#', '-', ':', ';', '~'
    ]

    if (this.mixSpecialCharacters) {
        this.chars = this.chars.concat(this.specialCharacters);
    }

    this.getRandomColor = function () {
        var randNum = Math.floor(Math.random() * this.colors.length);
        return this.colors[randNum];
    }

    //if Canvas

    this.position = {
        x: 0,
        y: 50
    }

    //if DOM
    if (typeof holder != "undefined") {
        this.holder = holder;
    }

    if (!this.useCanvas && typeof this.holder == "undefined") {
        console.warn('Holder must be defined in DOM Mode. Use Canvas or define Holder');
    }


    this.getRandCharacter = function (characterToReplace) {
        if (characterToReplace == " ") {
            return ' ';
        }
        var randNum = Math.floor(Math.random() * this.chars.length);
        var lowChoice = -.5 + Math.random();
        var picketCharacter = this.chars[randNum];
        var choosen = picketCharacter.toLowerCase();
        if (this.mixCapital) {
            choosen = lowChoice < 0 ? picketCharacter.toLowerCase() : picketCharacter;
        }
        return choosen;

    }

    this.writeWord = function (word) {
        this.word = word;
        this.currentWord = word.split('');
        this.currentWordLength = this.currentWord.length;

    }

    this.generateSingleCharacter = function (color, character) {
        var span = document.createElement('span');
        span.style.color = color;
        span.innerHTML = character;
        return span;
    }

    this.updateCharacter = function (time) {

        this.now = Date.now();
        this.delta = this.now - this.then;



        if (this.delta > this.interval) {
            this.currentTimeOffset++;

            var word = [];

            if (this.currentTimeOffset === this.timeOffset && this.currentCharacter !== this.currentWordLength) {
                this.currentCharacter++;
                this.currentTimeOffset = 0;
            }
            for (var k = 0; k < this.currentCharacter; k++) {
                word.push(this.currentWord[k]);
            }

            for (var i = 0; i < this.currentWordLength - this.currentCharacter; i++) {
                word.push(this.getRandCharacter(this.currentWord[this.currentCharacter + i]));
            }


            if (that.useCanvas) {
                c.clearRect(0, 0, stage.x * stage.dpr, stage.y * stage.dpr);
                c.font = that.fontSize + " sans-serif";
                var spacing = 0;
                word.forEach(function (w, index) {
                    if (index > that.currentCharacter) {
                        c.fillStyle = that.getRandomColor();
                    } else {
                        c.fillStyle = that.textColor;
                    }
                    c.fillText(w, that.position.x + spacing, that.position.y);
                    spacing += c.measureText(w).width;
                });
            } else {

                if (that.currentCharacter === that.currentWordLength) {
                    that.needUpdate = false;
                }
                this.holder.innerHTML = '';
                word.forEach(function (w, index) {
                    var color = null
                    if (index > that.currentCharacter) {
                        color = that.getRandomColor();
                    } else {
                        color = that.textColor;
                    }
                    that.holder.appendChild(that.generateSingleCharacter(color, w));
                });
            }
            this.then = this.now - (this.delta % this.interval);
        }
    }

    this.restart = function () {
        this.currentCharacter = 0;
        this.needUpdate = true;
    }

    function update(time) {
        time++;
        if (that.needUpdate) {
            that.updateCharacter(time);
        }
        requestAnimationFrame(update);
    }

    this.writeWord(this.holder.innerHTML);


    console.log(this.currentWord);
    update(time);
}



function init() {

    //animating form


    const name = document.querySelector('.name')
    const comment = document.querySelector('.comment')
    const cover = document.querySelector('.cover')
    const form = document.querySelector('form')
    let letterCount = 0


    const createGhostLetters = (text, className) => {
        return text.split('').map(letter => {
            return `
          <div class="${className} ${letter === ' ' ? ' blank' : ''}" >
            ${letter}
          </div>
        `
        }).join('')
    }


    const createGhostDiv = (target, className) => {
        if (!target.value) return
        target.placeholder = ''
        const ghostDiv = document.createElement('div')
        const targetSpec = target.getBoundingClientRect()
        ghostDiv.classList.add('ghost')
        ghostDiv.innerHTML = createGhostLetters(target.value, className)

        ghostDiv.style.top = `${targetSpec.y}px`
        ghostDiv.style.left = `${targetSpec.x}px`
        ghostDiv.style.height = `${targetSpec.height}px`
        ghostDiv.style.width = `${targetSpec.width}px`

        cover.appendChild(ghostDiv)
        target.value = ''
    }


    const setupGhostLetterMotion = (target, className) => {
        createGhostDiv(target, className)

        const letters = document.querySelectorAll(`.${className}`)
        letters.forEach((letter, i) => {
            const letterSpec = letter.getBoundingClientRect()

            letter.style.top = `${letterSpec.y}px`
            letter.style.left = `${letterSpec.x}px`
            letter.style.color = 'white'
            letter.style.transition = '1s'

            setTimeout(() => {
                letter.style.position = 'fixed'
                letter.style.transition = '5s'
                letter.style.top = `-${window.innerHeight / 2}px`
                letter.style.left = `${letterSpec.x + window.innerWidth / 2}px`
            }, (letters.length - i) * 150)
        })
        letterCount = letterCount < letters.length ? letters.length : letterCount
    }


    const starSvg = `
    <svg x="0px" y="0px" width="565.4px" height="51.4px" viewBox="0 0 565.4 51.4" >
      <style type="text/css">
      .st0{fill:#91a7b4;}
      .st1{fill:#b69269;}
      .st2{fill:#FFFFFF;}
      </style>
      <path class="st0" d="M559.7,28.5h-11.5v5.7h-5.7v0.1v17.1h-5.7V34.3v-0.1h-5.7v-5.7h-11.4v-5.7h11.4v-5.7h5.7V0h5.7v17.1h5.7v5.7
      h11.5V28.5z"/>
      <path class="st0" d="M445.5,28.7h-5.7v5.7h-5.7v-5.7h-5.7V23h5.7v-5.7h5.7V23h5.7V28.7z"/>
      <path class="st0" d="M496.9,28.6h-5.7V40h-5.7V28.6h-5.7v-5.7h5.7V11.5h5.7v11.4h5.7V28.6z"/>
      <path class="st1" d="M405.5,28.6H394v5.7h-5.7v0.1v17.1h-5.7V34.4v-0.1h-5.7v-5.7h-11.4v-5.7h11.4v-5.7h5.7V0.1h5.7v17.1h5.7v5.7
      h11.5V28.6z"/>
      <path class="st2" d="M148.5,28.5H137v5.7h-5.7v0.1v17.1h-5.7V34.3v-0.1h-5.7v-5.7h-11.4v-5.7h11.4v-5.7h5.7V0h5.7v17.1h5.7v5.7h11.5
      V28.5z"/>
      <path class="st2" d="M34.3,28.7h-5.7v5.7h-5.7v-5.7h-5.7V23h5.7v-5.7h5.7V23h5.7V28.7z"/>
      <path class="st2" d="M85.7,28.6H80V40h-5.7V28.6h-5.7v-5.7h5.7V11.5H80v11.4h5.7V28.6z"/>
      <path class="st1" d="M291.2,28.7h-5.7v11.4h-5.7V28.7h-5.7V23h5.7V11.6h5.7V23h5.7V28.7z"/>
      <path class="st1" d="M348.4,28.6h-5.7v5.7H337v11.5h-5.7V34.3h-5.7v-5.7h-5.7v-5.7h5.7v-5.7h5.7V5.8h5.7v11.4h5.7v5.7h5.7
      L348.4,28.6L348.4,28.6z"/>
      <g>
      <g id="XMLID_7_">
        <g>
          <rect x="177.1" y="22.9" class="st1" width="5.7" height="5.7"/>
        </g>
      </g>
      </g>
      <g>
      <g id="XMLID_6_">
        <g>
          <rect x="225.6" y="20" class="st1" width="11.5" height="11.4"/>
        </g>
      </g>
      </g>
    </svg>
    `

    const animationPatterns = [
        ['0', '1'], ['0', '1'], ['0', '1'], ['0', '1'], ['0', '1'],
        ['1', '1'], ['1', '1'], ['1', '1'], ['1', '1'],
        ['2', '2'], ['2', '2'],
        ['0', '2'], ['0', '2'],
        ['3', '5'], ['3', '5'],
        ['8', '9'], ['8', '9'],
        ['3', '6'], ['3', '6'],
        ['9', '10'], ['9', '10'],
        ['10', '10'], ['10', '10'],
        ['3', '7'],
        ['6', '7']
    ]

    const wrapper = document.querySelector('.wrapper')
    const frameSize = 15


    //star blinking animation
    const animateStar = (target, start, end, speed) => {
        let i = start
        setInterval(function () {
            target.style.margin = `0px ${-(i * frameSize)}px`
            if (i >= end) {
                i = start
            } else {
                i++
            }
        }, speed)
    }


    //position stars
    const stars = new Array(70).fill('')
    stars.forEach(() => {
        const animationPattern = animationPatterns[Math.floor(Math.random() * animationPatterns.length)]
        const speed = Math.random() < 0.1 ?
            140
            :
            300

        const starDiv = document.createElement('div')
        starDiv.classList.add('star')

        const starInside = document.createElement('div')
        starInside.classList.add('star_inner')
        starInside.innerHTML = starSvg
        starInside.style.width = `${frameSize * 11}px`

        starDiv.appendChild(starInside)
        starDiv.style.top = `${Math.ceil(Math.random() * 100)}%`
        starDiv.style.left = `${Math.ceil(Math.random() * 100)}%`
        wrapper.appendChild(starDiv)

        animateStar(starInside, animationPattern[0], animationPattern[1], speed)
    })


    composeTodo();

    var start_challange_button = document.getElementById('start_challange');
    start_challange_button.addEventListener("mouseover", (event) => {
        start_challange_button.innerText = "Arriverà presto!"
    });
    start_challange_button.addEventListener("mouseout", (event) => {
        start_challange_button.innerText = "Start your challange"
    });
}

window.addEventListener('DOMContentLoaded', init)




// Card data  
const cardsArray = [  
    {  
     name: "Cartoon1",  
     img: "https://img.freepik.com/free-vector/cute-penguin-flying-with-balloons-cartoon-vector-illustration-animal-love-concept-isolated-vector-flat-cartoon-style_138676-2016.jpg?size=338&ext=jpg&ga=GA1.1.967060102.1709078400&semt=ais",  
    },  
    {  
     name: "Cartoon2",  
     img: "https://img.freepik.com/free-vector/cute-koala-with-cub-cartoon-icon-illustration_138676-2839.jpg?size=338&ext=jpg&ga=GA1.1.1395880969.1709078400&semt=sph",  
    },  
    {  
     name: "Cartoon3",  
     img: "https://img.freepik.com/free-vector/cute-koala-sleeping-cartoon-illustration_138676-2778.jpg",
    },  
    {  
     name: "Cartoon4",  
     img: "https://img.freepik.com/premium-vector/cute-koala-cartoon-sleeping-tree-branch-animal-icon-concept_11393-556.jpg",  
    },  
    {  
     name: "Cartoon5",  
     img: "https://img.freepik.com/premium-vector/cute-koala-tree-vector-illustration-cartoon_159446-945.jpg",  
    },  
    {  
     name: "Cartoon6",  
     img: "https://img.freepik.com/premium-vector/cartoon-koala-bear-illustration-vector_594747-260.jpg",  
    },  
    {  
     name: "Cartoon7",  
     img: "https://img.freepik.com/premium-vector/cute-koala-tree-vector-illustration-cartoon_159446-945.jpg",  
    },  
    {  
     name: "Cartoon8",  
     img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlU9Un22eCKgszYX4s_IIxV_i8wOCdPk55msjBNCpuGIrursbgZDReR7JKauwCdVUOTe8&usqp=CAU",  
    },  
    {  
     name: "Cartoon9",  
     img: "https://img.freepik.com/premium-vector/cute-mouse-with-laptop-cartoon-design_346903-196.jpg",  
    },  
    {  
     name: "Cartoon10",  
     img: "https://img.freepik.com/premium-vector/cute-mouse-writing-book-with-pencil-cartoon_346903-208.jpg?w=360",  
    },  
    {  
     name: "Cartoon11",  
     img: "https://img.freepik.com/premium-vector/cute-mouse-play-skateboard-cartoon_346903-336.jpg",  
    },  
    {  
     name: "Cartoon12",  
     img: "https://img.freepik.com/premium-vector/cute-mouse-singing-cartoon-design_346903-857.jpg",  
    },  
   ];  
   // GAME   
   const game = document.getElementById("game");  
   const grid = document.createElement("section");  
   grid.classList.add("grid");  
   // game.addEventListener("click", secCount);  
   game.appendChild(grid);  
   // DOUBLE ARREY  
   let gameGrid = cardsArray.concat(cardsArray);  
   // FOR RAMDOMISING THE CARDS EVERY TIME WE REFERESH THE PAGE  
   gameGrid.sort(() => 0.5 - Math.random());  
   // CREATE CARDS  
   gameGrid.forEach((item) => {  
    const card = document.createElement("div");  
    card.classList.add(`card`,`${item.name}`);  
    card.dataset.name = item.name;  
    const front = document.createElement("div");  
    front.classList.add("front");  
    const back = document.createElement("div");  
    back.classList.add("back");  
    back.style.backgroundImage = `url(${item.img})`;  
    grid.appendChild(card);  
    card.appendChild(front);  
    card.appendChild(back);  
   });  
   // ATTEMPTS COUNT  
   let attemptCount = 0;  
   let attempts = document.querySelector(".count");  
   attempts.innerText = attemptCount;  
   // TIME COUNT  
   var sec = 0;  
   var timeInSec;  
   let min = 0;  
   function secCount() {  
    sec = sec + 1;  
    document.querySelector(".sec-count").innerText = Math.floor(sec % 60);  
    timeInSec = setTimeout(secCount, 1000);  
    min = Math.floor(sec / 60);  
    document.querySelector(".min-count").innerText = min;  
   }  
   var timeStarted = false;  
   // secCount();  
   // RESET ALL  
   let reset = document.querySelector(".reset");  
   reset.addEventListener("click", () => {  
    let confirmReset = confirm("Whole game will start again. continue to reset?");  
    if (confirmReset === true) {  
     window.location.reload();  
    }   
   });  
   // VARIABLES FOR THE GAME  
   let firstGuess = "";  
   let secondGuess = "";  
   let previousTarget = null;  
   let count = 0;  
   let delay = 1200;  
   // FUNCTIONS FOR THE GAME  
   const match = () => {  
    var selected = document.querySelectorAll(".selected");  
    selected.forEach((card) => {  
     card.classList.add("match");  
    });  
   };  
   const resetGuesses = () => {  
    firstGuess = "";  
    secondGuess = "";  
    count = 0;  
    var selected = document.querySelectorAll(".selected");  
    selected.forEach((card) => {  
     card.classList.remove("selected");  
    });  
   };  
   // GAME LOGICS  
   grid.addEventListener("click", function (event) {  
    !timeStarted && secCount();  
    timeStarted = true;  
    let clicked = event.target;   
    attemptCount++;  
    attempts.innerText = attemptCount;  
    if (  
     clicked.nodeName === "SECTION" ||  
     clicked === previousTarget ||  
     clicked.parentNode.classList.contains("selected")  
    ) {  
     return;  
    }  
    if (count < 2) {  
     count++;  
     if (count === 1) {  
      // Assign first guess  
      firstGuess = clicked.parentNode.dataset.name;  
      clicked.parentNode.classList.add("selected");  
     } else {  
      // Assign second guess  
      secondGuess = clicked.parentNode.dataset.name;  
      clicked.parentNode.classList.add("selected");  
     }  
     // If both guesses are not empty...  
     if (firstGuess !== "" && secondGuess !== "") {  
      // and the first guess matches the second match...  
      if (firstGuess === secondGuess) {  
       // run the match function  
       // match();  
       // resetGuesses();  
       setTimeout(match, delay);  
       setTimeout(resetGuesses, delay);  
       var matched = document.querySelectorAll(`.${firstGuess}`);  
       matched.forEach(node => node.addEventListener('click',function (e) {    
        e.stopPropagation();  
       }))  
      } else {  
       setTimeout(resetGuesses, delay);  
      }  
     }  
    }  
    // Set previous target to clicked  
    previousTarget = clicked;  
   });
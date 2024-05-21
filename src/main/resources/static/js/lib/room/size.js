const matchView = document.querySelector(".match-view");
const gameContainer = document.querySelector(".game-container");
const canvas = document.querySelector(".game-canvas");
const quizView = document.querySelector(".quiz-view");

const ctx = canvas.getContext('2d');


function resizeCanvas() {
    
    matchView.style.width = quizView.offsetWidth + "px";
    gameContainer.style.width = quizView.offsetWidth + "px";

    canvas.width = quizView.offsetWidth;
    canvas.height = matchView.offsetHeight;
    ctx.scale(5,5);
    ctx.imageSmoothingEnabled = false;

 
}

window.addEventListener('resize', resizeCanvas);

resizeCanvas();
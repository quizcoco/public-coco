let quizCard = document.querySelector(".card-container");
let leftSide = document.querySelector(".left-card");


quizCard.addEventListener("dragstart", (event) => {

    // quizCard.classList.add("d:none");
    // event.dataTransfer.
    // make it half transparent
    leftSide.ondragover = function(e){
    
    
        quizCard.classList.add("dragging");
    
        console.log("ddd")
    }
  });



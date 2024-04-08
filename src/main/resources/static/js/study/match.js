let skillMenus =  document.querySelector("#skill-menus");
let skillUpperBtn = skillMenus.querySelectorAll(".skill-grid>div"); //스킬 상위
let skillSubBtn = skillMenus.querySelectorAll("nav"); //스킬 하위
let atkItems = skillMenus.querySelectorAll(".atk-item>li");

let quizBox = document.querySelector("#quiz");
let quizDivs = quizBox.querySelectorAll("#quiz>div");
let useBtn = quizBox.querySelector("#quiz>div>button");
let answerBtns = quizBox.querySelectorAll("div>div>div>input")

quizBox.addEventListener("click",function(){
     
     quizDivs[1].classList.add("d:none"); //상대는 강해 보인다
     quizDivs[2].classList.remove("d:none"); //어떻게 할까요?
     skillMenus.classList.remove("vis:hidden"); //스킬 창 보이기

     quizBox.removeEventListener("click", arguments.callee);//제거

     
    })

    // skillUpperBtn.addEventListener("click",function(){
        
        // // TODO 버튼 색상변경
        
        // })
        
    skillUpperBtn[1].addEventListener("click",function(){ //공격클릭
        
        skillSubBtn[0].classList.remove("vis:hidden");
    })
        
    atkItems[0].addEventListener("click",function(e){
        
        quizDivs[2].classList.add("d:none"); //어떻게 할까요?
        quizDivs[3].classList.remove("d:none"); //사용버튼
  
})

useBtn.addEventListener("click",function(e){
    e.stopPropagation();

    quizDivs[3].classList.add("d:none"); //사용버튼
    quizDivs[0].classList.remove("d:none"); //어떻게 할까요?

})

for (let v of answerBtns) {
    
    // if(v.target.tagName != "BUTTON")
    //      return;
    let quiz ={};
    quiz.id = quizBox.dataset.id;
    quiz.answer = quizBox.dataset.answer;
    
    console.log(quiz.id);
    console.log(quiz.answer);
    
    v.addEventListener("click",function(e){
        
        if(e.target.dataset.value==quiz.answer)
        alert("정답");
        if(e.target.dataset.value!=quiz.answer)
        quiz.wrong = e.target.dataset.value;
    })
    
}
let skillMenus =  document.querySelector("#skill-menus");
let skillUpperBtn = skillMenus.querySelectorAll(".skill-grid button"); //스킬 상위
let skillSubBtn = skillMenus.querySelectorAll("nav"); //스킬 하위
//let atkItems = skillMenus.querySelectorAll(".atk-item>li");

//예본
//let menuList = skillMenus.querySelector(".menu-list");
let bntDetail = skillMenus.querySelector(".bnt-detail");


let quizBox = document.querySelector("#quiz");
let quizDivs = quizBox.querySelectorAll("#quiz>div");
let useBtn = quizBox.querySelector("#quiz>div>button");
let submitBtn = quizBox.querySelector("div button");
let answerInputs = quizBox.querySelectorAll("input[type='radio']");

quizBox.addEventListener("click",function(){
     
     quizDivs[1].classList.add("d:none"); //상대는 강해 보인다
     quizDivs[2].classList.remove("d:none"); //어떻게 할까요?
     skillMenus.classList.remove("vis:hidden"); //스킬 창 보이기

     quizBox.removeEventListener("click", arguments.callee);//제거

     
    })
//======예본 존=====
skillMenus.addEventListener("click",function(e){
        
    if(e.target.tagName!='BUTTON')
    return;

let state = e.target.dataset.btn;

switch (state) {
    case 'base' :
        break;
    case 'attack' :
        skillUpperBtn[1].classList.replace("n-btn:filled-4","btn-on");
        bntDetail.innerHTML ="";

        let attackHtml=
                    `<ul class="atk-item d:flex gap:4 mt:1 jc:start">
                        <li><button class="btn-base n-btn:filled-4 ac:center txt-al:center">발차기</button></li>
                        <li><button class="btn-base n-btn:filled-4 ac:center txt-al:center">파이어볼</button></li>
                        <li><button class="btn-base n-btn:filled-4 ac:center txt-al:center w:2">공격 디버프</button></li>
                    </ul>`;
        
        bntDetail.insertAdjacentHTML("beforeend",attackHtml);

        let atkItems = document.querySelectorAll(".atk-item button");
        
          //하부 버튼 선택  
        atkItems[0].addEventListener("click",function(e){
            // e.stopPropagation();
        
        
            atkItems[0].classList.replace("n-btn:filled-4","btn-on");

            quizDivs[2].classList.add("d:none"); //어떻게 할까요?
             quizDivs[3].classList.remove("d:none"); //사용버튼
            
        })

        useBtn.addEventListener("click",function(e){

            quizDivs[3].classList.add("d:none"); //사용버튼
            quizDivs[0].classList.remove("d:none"); //문제
            
            //비활성화
            for(let btn of skillUpperBtn)
            btn.disabled = true;
            for(let btn of atkItems) 
            btn.disabled = true;
        
        
        // e.stopPropagation();
        
        })

       break;
       
    case 'help' :
        bntDetail.innerHTML ="";
        let helpHtml=
        `<ul class="d:flex gap:4 mt:1 jc:start">
            <li><button class="btn-base n-btn:filled-4 ac:center txt-al:center">회복</button></li>
            <il><button class="btn-base n-btn:filled-4 ac:center txt-al:center">뭐뭐</button></il>
        </ul>`;

        bntDetail.insertAdjacentHTML("beforeend",helpHtml);

        break;
        
    case 'run' :
        break;
}
        
        })

//================================================================================
        
    // skillUpperBtn[1].addEventListener("click",function(){ //공격클릭
        
    //     skillSubBtn[0].classList.remove("vis:hidden");
    // })
for (let v of answerInputs) {
    v.addEventListener("click",function(){
        submitBtn.classList.replace("n-btn:filled-4","btn-on");

    })
}
    submitBtn.addEventListener("click",function(){
        
        for (let v of answerInputs) {

            if(v.checked){
                submitBtn.disabled = true;
                let waitMsg = document.querySelector(".wait-msg");
                waitMsg.classList.add("wait-notice");

                for (let v of answerInputs) {
                    v.disabled = true;
                }
                return;
            }
        }

    })



//정답처리
for (let v of answerInputs) {
    
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
        quiz.wrong = e.target.dataset.value;//오답
    })
}
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

//=============================================================================================


class Repository{
    getRandom(){
        return fetch("/api/examQuizs/rand");
    }
}

async function value(){
    let repository = new Repository();
    let response= await repository.getRandom();
    let randQ = await response.json(); 
    return randQ;
}

class Quiz{
   constructor(){
    this.hp=255;
    this.q=[];
    this.click=0;

   }
    encounter(){
        quizBox.addEventListener("click",()=>{
          
                quizDivs[1].classList.add("d:none");
                quizDivs[2].classList.remove("d:none");
                skillMenus.classList.remove("vis:hidden"); //스킬 창 보이기
        });
    }
    newQuiz(randQ){
    for (let div of quizDivs) {
        div.innerHTML="";
    }

let quizHTML=``;
if (randQ.context != null) {
    quizHTML=`<div class="d:inline jc:start"><span class="fs:6 ml:4 mr:3 va:middle">Q</span><span>${randQ.question}</span></div> 
    <div class="context-box jc:center mt:1">${randQ.context}</div>`;
}
else
    quizHTML=`<div class="d:inline jc:start"><span class="fs:6 ml:4 mr:3 va:middle">Q</span><span>${randQ.question}</span></div> `;
    
    quizHTML += `
            <div class="d:flex fl-direction:column ml:5 mt:3">
                <div class="d:flex gap:2"><label class="check-answer"><input type="radio" name="answer" data-value="1">①</label><span>${randQ.num1}</span></div>
                <div class="d:flex gap:2"><label class="check-answer "><input type="radio" name="answer" data-value="2">②</label><span>${randQ.num2}</span></div>
                <div class="d:flex gap:2"><label class="check-answer "><input type="radio" name="answer" data-value="3">③</label><span>${randQ.num3}</span></div>
                <div class="d:flex gap:2 mb:6"><label class="check-answer "><input type="radio" name="answer" data-value="4">④</label><span>${randQ.num4}</span></div>
                <div class="wait-msg"><button class="btn-base n-btn:filled-4">제출</button></div>
            </div>
            `;
            
            quizDivs[0].insertAdjacentHTML("beforeend",quizHTML);

        }

    loadQuiz(){
        //^^;;
        
    }
}
let quiz = new Quiz();
quiz.encounter();

async function timeLimit(value){
    
    await new Promise((resolve,newQuiz)=>setTimeout(async ()=>{
        
        let randQ = await value;
        quiz.newQuiz(randQ);
        
    },5000));
    
}
timeLimit(value()).then(resolve,reject);
function resolve(){
    for (let div of quizDivs) {
        div.classList.add("d:none")
    }
    quizDivs[4].classList.remove("d:none"); //답은 ~~다 or나는 발차기를 구성지게 했다

    let count =4;
    quizBox.addEventListener("click",function(){//다음 문제를 풀까?? 까지..
        if (count < quizDivs.length-2) {
            quizDivs[count].classList.add("d:none");
            quizDivs[count+1].classList.remove("d:none");

            count++;
        }
        if(!quizDivs[quizDivs.length-2].classList.contains("d:none"))
        console.log("끝났냐??");
        setTimeout(()=>{

            //페이지 이동
        },2000);
        
    })

    //자동으로 넘어가게...
    // quizBox.addEventListener("click",function(){
    //     quizDivs[4].classList.add("d:none");
    //     setTimeout(function() {
    //         quizDivs[5].classList.remove("d:none");
    //         setTimeout(function() {
    //             quizDivs[5].classList.add("d:none");
    //             quizDivs[6].classList.remove("d:none");
    //             setTimeout(function() {
    //                 quizDivs[6].classList.add("d:none");
    //                 quizDivs[7].classList.remove("d:none");


    //             },2000);
    //         }, 2000); 
    //     }, 0); 

    //     quizBox.removeEventListener("click", arguments.callee);//제거

    // })
  


}

function reject(){
    

}



// quizBox.removeEventListener("click", clickHandler); 클릭 막기~~~


// quizBox.addEventListener("click",function(){
     
     
     

//      quizBox.removeEventListener("click", arguments.callee);//제거

     
//     })
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
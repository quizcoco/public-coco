let skillMenus =  document.querySelector("#skill-menus");
let skillUpperBtn = skillMenus.querySelectorAll(".skill-grid button"); //스킬 상위
let skillSubBtn = skillMenus.querySelectorAll("nav"); //스킬 하위
//let atkItems = skillMenus.querySelectorAll(".atk-item>li");
let atkItems;
//예본
//let menuList = skillMenus.querySelector(".menu-list");
let bntDetail = skillMenus.querySelector(".bnt-detail");
let bntDetailHeight= bntDetail.querySelector("ul");


let quizBox = document.querySelector("#quiz");
let quizDivs = quizBox.querySelectorAll("#quiz>div");
let useBtn = quizBox.querySelector("#quiz>div>button");
let beBeaten = quizBox.querySelector(".bebeaten");
//let submitBtn = document.querySelector("#sm");
//let answerInputs = quizBox.querySelectorAll("input[type='radio']");

let hpProgressbar = document.querySelector("#hp-progressbar");
let barStyle = hpProgressbar.querySelector("div>div");
let hpNow =  hpProgressbar.querySelector(".hp-now");
let hpTotal =  hpProgressbar.querySelector(".hp-total");

//=============================================================================================
//퀴즈객체 - 퀴즈매니저 - 유저객체

class Repository{
    getRandom(){
        return fetch("/api/examQuizs/rand");
    }
    findCoco(){
        return fetch("/api/coco/detail");
    }
}




class Coco{
    constructor(){

        this.correct = [];
        this.wrong = [];
        // this.getCoco().then((coco)=>{
            
        //     this.hp=coco.hp;
        // });

    }

    async getCoco(){
        let repository = new Repository();
        let response= await repository.findCoco();
        let coco = await response.json(); 
        Object.assign(this, coco);
        // return coco;
    }
    
}

function inputValue(dataName,data){ 
    let report = document.createElement("input");
report.type="hidden";
report.name= dataName;
report.value=data;
return report;
} 

class Quiz{
    constructor() {
        this.hp = null;
        this.level = null;
        this.skillId = null;
        this.correct = [];
        this.wrong = [];
    }

    async init() {
        let coco = new Coco();
        await coco.getCoco();
        this.id= coco.id;
        this.hp = coco.hp;
        this.level = coco.level;
        this.skillId = coco.skillId;
        this.correct = coco.correct || [];
        this.wrong = coco.wrong || [];
        return this;
    }

   async getQuiz(){
    let repository = new Repository();
    let response= await repository.getRandom();
    let randQ = await response.json(); 
    return randQ;
}

    newQuiz(randQ){

    quizDivs[0].innerHTML="";
        
    // for (let div of quizDivs) {
    //     div.innerHTML="";
    // }
let quizHTML=``;
if (randQ.context != null) {
    quizHTML=`<div class="d:inline jc:start"><span class="fs:6 ml:4 mr:3 va:middle">Q</span><span>${randQ.question}</span></div> 
    <div class="context-box jc:center mt:1">${randQ.context}</div>`;
}
else
    quizHTML=`<div class="d:inline jc:start"><span class="fs:6 ml:4 mr:3 va:middle">Q</span><span>${randQ.question}</span></div> `;
    
    quizHTML += `
            <div id="input" class="d:flex fl-direction:column ml:5 mt:3">
                <div class="d:flex gap:2"><label class="check-answer"><input type="radio" name="answer" data-value="1">①</label><span>${randQ.num1}</span></div>
                <div class="d:flex gap:2"><label class="check-answer "><input type="radio" name="answer" data-value="2">②</label><span>${randQ.num2}</span></div>
                <div class="d:flex gap:2"><label class="check-answer "><input type="radio" name="answer" data-value="3">③</label><span>${randQ.num3}</span></div>
                <div class="d:flex gap:2 mb:6"><label class="check-answer "><input type="radio" name="answer" data-value="4">④</label><span>${randQ.num4}</span></div>
                <div class="wait-msg mb:3"><button id="submit" class="btn-base n-btn:filled-4" disabled>제출</button></div>
            </div>
            `;
            
            quizDivs[0].insertAdjacentHTML("beforeend",quizHTML);

            let submitBtn = document.querySelector("#submit");
            let answerInputs = document.querySelectorAll("#input input[name='answer']");



             return this.submitAnswer(submitBtn,answerInputs,randQ);
          
            

        }

        repeatQuiz(randQ){
        //무엇을 할까? 

        quizBox.addEventListener("click",()=> {
            quizDivs[7].classList.add("d:none");//다음문제를 풀자

            quizDivs[1].classList.add("d:none");//강해보인다

            quizDivs[2].classList.remove("d:none");//무엇을 할까?
            skillMenus.classList.remove("vis:hidden"); //스킬 창 보이기
         },{ once : true});

        

        this.clickSkillBtn(); //버튼누르기

        this.newQuiz(randQ); //문제출력



        //return this;
      

        // setTimeout(()=>{

            
        // },8000);//30000

        //if(나가기버튼 누르면 나가기)closed();
        
    }

    async next(){
       // quizBox.addEventListener("click",async()=>{


            if(0<this.hp){
                    
                let randQ =await this.getQuiz();
                this.repeatQuiz(randQ);
                     
                console.log("후id"+randQ.id);
                console.log("후hp"+this.hp);

               return;
            }
            console.log("hp가 0이 되어..");
            

       // },{ once : true})

           
    }
    closed(){//TODO 종료:코코는 기분이 좋아보인다 
        console.log("종료. 틀림:"+this.wrong+"맞음:"+this.correct);
        quizDivs[quizDivs.length-2].classList.add("d:none");
        quizDivs[quizDivs.length-1].classList.remove("d:none");//코코는 기분이 좋아보인다


        // (async (event) =>{
        //     // event.preventDefault();
        //     const COMMON_URL = 'http://localhost:8080';
        
            // const reportData = {
            //     'cocoId' : this.id,
            //     'wrongId' : this.wrong,
            //     'correctId':this.correct,
            //     'enemyId':null,
            //     'avatarId':null

            // };
        
        //     const option = {
        //         method : 'POST',
        //         headers:{
        //             'Content-Type' : 'application/json'
        //         },
        //         body: JSON.stringify(reportData)
        //     };
        
        //     const res = await fetch(`${COMMON_URL}/study/self-match/reg`, {
        //         ...option
        //     });
        // })();

        let form = document.createElement("form");
        form.method="post";
        form.action="reg";
        let cocoId = inputValue("cocoId",this.id);
        let wrongId = inputValue("wrongId",this.wrong);
        let correctId = inputValue("correctId",this.correct);
        let enemyId = inputValue("enemyId",null);//XXX 임시
        let avatarId = inputValue("avatarId",null);

      
        form.append(cocoId,wrongId,correctId,enemyId,avatarId);
        document.body.append(form);
        form.submit();

        
    }


    //======예본 존=====
    clickSkillBtn(){

    skillMenus.addEventListener("click",function(e){
            
        if(e.target.tagName!='INPUT')
        return;
    
        let state = e.target.dataset.btn;
            switch (state) {
                case 'base' :
                    break;
                case 'attack' :
                    bntDetail.innerHTML ="";
    
                    let attackHtml=
                                `<ul class="atk-item d:flex gap:4 mt:1 jc:start">
                                    <li><label class="btn-base ac:center txt-al:center"><input type="radio" name="sub">발차기</label></li>
                                    <li><label class="btn-base ac:center txt-al:center"><input type="radio" name="sub">파이어볼</label></li>
                                    <li><label class="btn-base ac:center txt-al:center w:2"><input type="radio" name="sub">공격 디버프</label></li>
                                </ul>`;
                    
                    bntDetail.insertAdjacentHTML("beforeend",attackHtml);
    
                    atkItems = document.querySelectorAll(".atk-item input");
                        
                    
                    //하부 버튼 선택  
                    for(let btn of atkItems)
                    btn.addEventListener("click",function(e){
                        // e.stopPropagation();
                        
                        
                       // btn.classList.replace("btn-off","btn-on");
    
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
                    
        });
    }
    
    //================================================================================


    afterQuiz(){
     
       
     
        let count =4;
        let nowSayGoodBye=false;
        let fullHP = hpTotal.textContent;
        //hp피통 이미지 표시
        let progress = ((this.hp)/fullHP)*100 ;
        if(progress<0){progress=0;this.hp=0;}

        quizBox.addEventListener("click",()=>{//타격을 입었다 까지..
            if (count < quizDivs.length-2) {
                quizDivs[count].classList.add("d:none");
                quizDivs[count+1].classList.remove("d:none");
    
                count++;
                if(count==6){
                    barStyle.style.width=progress +"%";//(총-상대방공격)/총 * 100
                    hpNow.textContent=this.hp;
                    console.log(this.hp);
                }
                if(count==7)this.next();
            }
            else if(count < quizDivs.length-1 && this.hp==0)
                this.closed();//await후밖으로?
            //if(!(quizDivs[quizDivs.length-1].classList.contains("d:none")))
            //return ;
        
        
    });
        
   

        // for(let div of quizDivs){
        //     if((!div.classList.contains("d:none")) && div.classList.contains("beBeaten")){
        //         barStyle.style.width=(255-this.hp)/255*100 +"%";//(총-상대방공격)/총 * 100
        //     console.log(barStyle.style.width);
        //     console.log(this.hp);
        //     }
        // }
        
        // setTimeout(()=>{
            
            //     //페이지 이동
            // },2000);
            
        console.log("여기는 afterquiz");
    
    }

     submitAnswer(submitBtn,answerInputs,randQ){
        for (let v of answerInputs) {
            v.addEventListener("click",function(){
                submitBtn.classList.replace("n-btn:filled-4","btn-on");
                submitBtn.disabled = false;

            })
           // return await new Promise((resolve) => {
               
        }  
               submitBtn.addEventListener("click",()=>{//arrow function부분 보기!!
                //for (let v of answerInputs) {
                    
                    //정답처리
                    let answerChecked = false;
                    for (let v of answerInputs) {
                        if(v.checked && v.dataset.value !=randQ.answer){//틀림
                            this.wrong.push(randQ.id);
                            this.hp -=10;
      
                            answerChecked = true;
                            break; 
                        }
                        else if(v.checked && v.dataset.value ==randQ.answer){//맞음
                            answerChecked = true;
                            this.correct.push(randQ.id);
                            break;
                        }
                    }
                    if(!answerChecked){
                       
                        //그냥 버튼 disabled함..
                    }

                       //for (let div of quizDivs) 
                       quizDivs[0].classList.add("d:none");
                            
                    
                    this.afterQuiz();
                    skillMenus.classList.add("vis:hidden"); //스킬 창 닫기
                    
                    //if(정답)나는 발차기를 했다 /오답: //TODO 정답은 ~다.
                    //console.log(quizDivs[4]);
                   

                    //if(randQ.answer==)
                    let quizHTML=`
                    
                    <div class="d:none">답은 <span class="color:accent-4">②</span>
                    <span class="color:accent-4">${randQ.a}</span>입니다.</div> 

                    `;
                    //quizHTML.replace(,)

                    //return this;
                    // if(v.checked){
                    //     console.log("얘좀봐라");
                    //     submitBtn.disabled = true;
                    //     let waitMsg = document.querySelector(".wait-msg");
                    //     waitMsg.classList.add("wait-notice");
        
                    //     for (let v of answerInputs) {
                    //         v.disabled = true;
                    //     }
                    //     return;
                    // }
               // }
               console.log("여기는 submitAnswer안");

               
            },{ once : true});
            // return this;//답은 뭐다..타격을 입었다 
            // })//프로미스
            
            //비활성 했던 것 리셋
           //bntDetail.insertAdjacentHTML("beforeend");

            for(let btn of skillUpperBtn){
                btn.classList.replace("btn-on","n-btn:filled-4");
                btn.disabled = false;
            }
            for(let btn of atkItems) {
                btn.classList.replace("btn-on","n-btn:filled-4");
                btn.disabled = false;
            }
            console.log("여기는 submitAnswer밖");
            
            return this;
        //resolve(this.afterQuiz());

           
}
        //정답처리
//for (let v of answerInputs) {
    
    // if(v.target.tagName != "BUTTON")
    //      return;
    // let quiz ={};
    // quiz.id = quizBox.dataset.id;
    // quiz.answer = quizBox.dataset.answer;
    
    // console.log(quiz.id);
    // console.log(quiz.answer);
    
    // v.addEventListener("click",function(e){
        
    //     if(e.target.dataset.value==quiz.answer)
        
    //     if(e.target.dataset.value!=quiz.answer)
    //     quiz.wrong = e.target.dataset.value;//오답
    // })
//}
    


}//class

async function runQuiz(){
    let coco = new Quiz();
    await coco.init()
    hpTotal.textContent=coco.hp; //토탈피통
    hpNow.textContent=coco.hp; //토탈피통
        
 
    // let hp =quiz.hp;
    let randQ =await coco.getQuiz();
    //quiz.encounter().then(response=>response.json()).then(quiz=>quiz.hp);


    coco.repeatQuiz(randQ);
    
    
    //hp = quiz.repeatQuiz().then(response=>response.json()).then(quiz=>quiz.hp);
    console.log("전id"+randQ.id);
    console.log("전hp"+coco.hp);
    

        
}

//useEffect(() => {
runQuiz();
//}, []);


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
  





// quizBox.removeEventListener("click", clickHandler); 클릭 막기~~~


// quizBox.addEventListener("click",function(){
     
     
     

//      quizBox.removeEventListener("click", arguments.callee);//제거

     
//     })
        
    // skillUpperBtn[1].addEventListener("click",function(){ //공격클릭
        
    //     skillSubBtn[0].classList.remove("vis:hidden");
    // })



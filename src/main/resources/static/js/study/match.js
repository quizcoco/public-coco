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
let level =  document.querySelector(".level");


//quizBox.innerHTML=""; //리셋 원할때
    // for (let div of quizDivs) {
    //     div.innerHTML="";
    // }

//=============================================================================================
//퀴즈객체 - 퀴즈매니저 - 유저객체

function inputValue(dataName,data){ 
    let report = document.createElement("input");
report.type="hidden";
report.name= dataName;
report.value=data;
return report;
} 

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
 
    }
    async init() {
        let cocoData = await this.getCoco(); // 비동기로 getCoco 메서드 호출
        this.id = cocoData.id;
        this.hp = cocoData.hp;
        this.level = cocoData.level;
        this.skillId = cocoData.skillId;
        this.correct = [];
        this.wrong = [];
        this.allQuiz = [];
        this.win=false;
    }

    async getCoco(){
        let repository = new Repository();
        let response= await repository.findCoco();
        let coco = await response.json(); 
        // Object.assign(this, coco);
        return coco;
    }

    attack(enemy){
        enemy.takeDamage();


    }
    takeDamage() {
        // 예시로 간단히 10의 데미지를 입음
        this.hp -= 10;
        console.log("코코가 공격을 받아서 HP가 감소했습니다.");
        console.log("코코의 현재 HP: " + this.hp);
    }
    
    useItem(){
        this.hp += 25;
        console.log("코코가 아이템을 사용하여 HP가 25증가했습니다.");
        console.log("코코의 현재 HP: " + this.hp);
    }
    
}

class Enemy{
    constructor(){
        this.hp = 20;
        this.level = 1;
        this.skillId = 1;

    }
    attack(coco){
        coco.takeDamage();

    }
    takeDamage() {
        // 예시로 간단히 10의 데미지를 입음
        this.hp -= 10;
        console.log("적이 공격을 받아서 HP가 감소했습니다.");
        console.log("적의 현재 HP: " + this.hp);
    }

}

class Quiz{
    constructor(coco,enemy) {
        this.coco = coco;
        this.enemy = enemy;
        
    }

    init() {

        level.textContent = "LV."+this.coco.level;
        hpTotal.textContent=this.coco.hp; //토탈피통
        hpNow.textContent=this.coco.hp; //토탈피통
  
        // return this;
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

            this.coco.allQuiz.push(randQ.id);

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


        //if(나가기버튼 누르면 나가기)closed();
        
    }

    async next(){
       // quizBox.addEventListener("click",async()=>{

           if(this.enemy.hp<=0 && 0<this.coco.hp){
            this.coco.win=true;
            // alert(this.coco.win);
               return this.closed();
           }
            else if(0<this.coco.hp){
                    
                let randQ =await this.getQuiz();
                this.repeatQuiz(randQ);
                     
                console.log("후id"+randQ.id);
                console.log("후hp"+this.coco.hp);

               return;
            }
            console.log("hp가 0이 되어..");
            this.closed();

            

       // },{ once : true})

           
    }
    closed(){//TODO 종료:코코는 기분이 좋아보인다 
        console.log("종료. 틀림:"+this.coco.wrong+"맞음:"+this.coco.correct);
        quizDivs[quizDivs.length-2].classList.add("d:none");
        quizDivs[quizDivs.length-1].classList.remove("d:none");//코코는 기분이 좋아보인다
        


        let form = document.createElement("form");
        form.method="post";
        form.action="reg";
        let cocoId = inputValue("cocoId",this.coco.id);
        let wrongId = inputValue("wrongId",this.coco.wrong);
        let correctId = inputValue("correctId",this.coco.correct);
        let allQuizId = inputValue("allQuizId",this.coco.allQuiz);
        let enemyId = inputValue("enemyId",null);//XXX 임시
        let avatarId = inputValue("avatarId",null);
        let win = inputValue("win",this.coco.win);

      
        form.append(cocoId,wrongId,correctId,allQuizId,enemyId,avatarId,win);
        document.body.append(form);
        form.submit();

        
    }


    //======예본 존=====
    clickSkillBtn(){

    skillMenus.addEventListener("click",(e)=>{
            
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
                        document.querySelector(".skill-ment").textContent="상대방에 공격을 가한다.";
                        
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
                        <li><label class="btn-base ac:center txt-al:center w:2 hill"><input type="radio" name="sub">회복 아이템</label></li>
                    </ul>`;
    
                    bntDetail.insertAdjacentHTML("beforeend",helpHtml);

                    
                    document.querySelector(".hill>input").addEventListener("click",()=>{
                        //TODO 힐링아이템
                        
                    
                        quizBox.innerHTML=`<div class="use-item mt:10 d:flex fl-dir:column"><span class="skill-ment">아이템을 사용하여 HP를 25 증가시킨다.</span><button class="btn-base">사용</button></div>   
                                `;
                        
                                document.querySelector(".use-item>button").addEventListener("click", ()=>{
                
                                    // quizDivs[3].classList.add("d:none"); //사용버튼
                                    
                                    this.coco.useItem();
                                    this.afterQuiz();
                                });
                    })
    
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
        let progress = ((this.coco.hp)/fullHP)*100 ;
        if(progress<0){progress=0;this.coco.hp=0;}
        if(this.coco.hp>=fullHP){this.coco.hp=fullHP;}

        // if(progress>fullHP)

        quizBox.addEventListener("click",()=>{//타격을 입었다 까지..
            if (count < quizDivs.length-2) {
                quizDivs[count].classList.add("d:none");
                quizDivs[count+1].classList.remove("d:none");
    
                count++;
                if(count==6){
                    this.enemy.attack(this.coco);
                    hpNow.textContent=this.coco.hp;
                    barStyle.style.width=(((this.coco.hp)/fullHP)*100) +"%";//(총-상대방공격)/총 * 100

                    console.log(this.coco.hp);
                }
                if(count==7)this.next();
            }
            //else if((count < quizDivs.length-1 && this.coco.hp==0)||this.enemy.hp<=0)
                //this.closed();//await후밖으로?
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
                            this.coco.wrong.push(randQ.id);
                            // this.coco.hp -=25;
      
                            answerChecked = true;
                            break; 
                        }
                        else if(v.checked && v.dataset.value ==randQ.answer){//맞음
                            answerChecked = true;
                            this.coco.correct.push(randQ.id);
                            this.coco.attack(this.enemy);

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

    let coco = new Coco();
    await coco.init();
    let enemy = new Enemy();

    let quizManager = new Quiz(coco,enemy);
    quizManager.init();
  
        
 
    // let hp =quiz.hp;
    let randQ =await quizManager.getQuiz();
    //quiz.encounter().then(response=>response.json()).then(quiz=>quiz.hp);


    quizManager.repeatQuiz(randQ);
    
    
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



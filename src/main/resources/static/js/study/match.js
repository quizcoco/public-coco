let skillMenus =  document.querySelector("#skill-menus");
let skillUpperBtn = skillMenus.querySelectorAll(".skill-grid input"); //스킬 상위
let skillSubBtn = skillMenus.querySelectorAll("nav"); //스킬 하위
let atkItems = skillMenus.querySelectorAll(".atk-item>li input");
//예본
//let menuList = skillMenus.querySelector(".menu-list");
let bntDetail = skillMenus.querySelector(".bnt-detail");
let bntDetailHeight= bntDetail.querySelector("ul");

let quizBox = document.querySelector("#quiz");
let quizDivs = quizBox.querySelectorAll("#quiz>div");
let useBtn = quizBox.querySelector("#quiz>div>button");
let beBeaten = quizBox.querySelector(".bebeaten");
let systemMent = quizBox.querySelector(".system-comment");
//let submitBtn = document.querySelector("#sm");
//let answerInputs = quizBox.querySelectorAll("input[type='radio']");

let hpProgressbar = document.querySelector("#hp-progressbar");
let barStyle = hpProgressbar.querySelector("div>div");
let hpNow =  hpProgressbar.querySelector(".hp-now");
let hpTotal =  hpProgressbar.querySelector(".hp-total");
let level =  document.querySelector(".level");



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
        this.damage = 10;
        this.magicDamage = 20;
        this.correct = [];
        this.wrong = [];
        this.allQuiz = [];
        this.win=false;
        this.skill='';
    }

    async getCoco(){
        let repository = new Repository();
        let response= await repository.findCoco();
        let coco = await response.json(); 
        // Object.assign(this, coco);
        return coco;
    }

    attack(enemy){
        switch (this.skill) {
            case 'physical' :
                enemy.takeDamage(this.damage);
                systemMent.innerHTML=`코코는 앞발로 냥펀치를 날렸다.`;
                break;
            case 'magic' :
                enemy.takeMagigDamage(this.magicDamage);
                systemMent.innerHTML=`코코는 화염구 공격을 하였다.`;
                break;
            case 'debuff' :
                enemy.receiveDebuff();
                systemMent.innerHTML=`적의 공격력이 다소 낮아졌다.`;
                break;
        }


    }
    takeDamage(damage) {
        // 예시로 간단히 10의 데미지를 입음
        this.hp -= damage;
        console.log("코코가 공격을 받아서 HP가 감소했습니다.");
        console.log("코코의 현재 HP: " + this.hp);
    }
    
    useItem(){
        this.hp += 25;
        systemMent.innerHTML=`코코가 아이템을 사용하여 HP가 25증가했습니다.`;
        console.log("코코가 아이템을 사용하여 HP가 25증가했습니다.");
        console.log("코코의 현재 HP: " + this.hp);

        let fullHP = hpTotal.textContent;
        if(this.hp>=fullHP){this.hp=fullHP;}

        hpNow.textContent=this.hp;
        barStyle.style.width=(((this.hp)/fullHP)*100) +"%";//(총-상대방공격)/총 * 100
    }
    // auto(){


        
    // }
    
}

class Enemy{
    constructor(){
        this.name = "벌레";
        this.hp = 20;
        this.level = 1;
        this.skillId = 1;
        this.damage = 10;

    }
    attack(coco){
        if(this.hp<=0)
            return;
        coco.takeDamage(this.damage);

    }
    takeDamage(damage) {
        // 10의 데미지를 입음
        this.hp -= damage;
        console.log("적이 공격을 받아서 HP가 감소했습니다.");
        console.log("적의 현재 HP: " + this.hp);
    }
    takeMagigDamage(damage) {
        // 20의 데미지를 입음
        this.hp -= damage;
        console.log("적이 마법 공격을 받아서 HP가 감소했습니다.");
        console.log("적의 현재 HP: " + this.hp);
    }
    receiveDebuff(){
        this.damage -= 2;
        console.log("디버프가 적용되어 적의 공격력이 낮아집니다.");

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

           if(this.enemy.hp<=0 && 0<this.coco.hp){
            this.coco.win=true;
            this.closed();
               return ;
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

        
           
    }
    closed(){
        console.log("종료. 틀림:"+this.coco.wrong+"맞음:"+this.coco.correct);
   

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
                    bntDetail.innerHTML ="";
                    systemMent.innerHTML="";
                    quizDivs[2].classList.add("d:none"); //어떻게 할까요?
                    quizDivs[3].classList.add("d:none"); //사용버튼

                    systemMent.innerHTML=`<span class="skill-ment">자동으로 대응합니다.</span><button class="btn-base use-auto">확인</button>`;

                    document.querySelector(".use-auto").addEventListener("click",(e)=>{
                        systemMent.innerHTML="";

                        //비활성화
                        for(let btn of skillUpperBtn)
                            btn.disabled = true;

                            // 0 또는 1 중 랜덤으로 선택
                        const action = Math.floor(Math.random() * 3);

                        if (this.coco.hp<15){
                            // 힐링하기
                            systemMent.innerHTML="";

                            this.coco.useItem();
                            quizBox.addEventListener("click",()=>{
                                this.afterQuiz();
                                skillMenus.classList.add("vis:hidden"); //스킬 창 닫기

                            },{ once : true})
                            console.log("체력을 회복합니다.");
                            return;
                        }
                        else if (action === 0) {// 물리 공격하기
                            this.coco.skill='physical';
                            quizDivs[0].classList.remove("d:none"); //문제

                            console.log("물리 공격합니다.");
                        } 
                        else if (action === 1) {// 마법 공격하기
                            this.coco.skill='magic';
                            quizDivs[0].classList.remove("d:none"); //문제

                            console.log("마법 공격합니다.");
                        } 
                        else if (action === 2) {// 디버프하기
                            this.coco.skill='debuff';
                            quizDivs[0].classList.remove("d:none"); //문제

                            console.log("적을 디버프합니다.");
                        } 
                        else {// else 물리 공격하기
                            this.coco.skill='physical';
                            quizDivs[0].classList.remove("d:none"); //문제

                            console.log("else 물리 공격합니다.");
                        } 

                     

                        
                    })



                    break;
                case 'attack' :
                    bntDetail.innerHTML ="";
                    systemMent.innerHTML="";
                    quizDivs[3].classList.add("d:none"); //사용버튼


                    let attackHtml=
                                `<ul class="atk-item d:flex gap:4 mt:1 jc:start">
                                    <li><label class="physical-atk btn-base ac:center txt-al:center"><input type="radio" name="sub">발차기</label></li>
                                    <li><label class="magical-atk btn-base ac:center txt-al:center"><input type="radio" name="sub">파이어볼</label></li>
                                    <li><label class="debuff btn-base ac:center txt-al:center w:2"><input type="radio" name="sub">공격 디버프</label></li>
                                </ul>`;
                    
                    bntDetail.insertAdjacentHTML("beforeend",attackHtml);
    
                    let atkItems = document.querySelectorAll(".atk-item input");
                        
                    
                    //하부 버튼 선택  
                    // for(let btn of atkItems)
                        // btn.addEventListener("click",function(e){
                        //1. 물리공격
                    document.querySelector(".physical-atk").addEventListener("click",function(e){
                        if(e.target.tagName!='INPUT')
                            return;
                        
                        systemMent.innerHTML="";
                        
                       // btn.classList.replace("btn-off","btn-on");
    
                        quizDivs[2].classList.add("d:none"); //어떻게 할까요?
                        quizDivs[3].classList.remove("d:none"); //사용버튼
                        // document.querySelector(".skill-ment").textContent=`${this.enemy.name}에 공격을 가한다.`;
                        
                    })
    
                    useBtn.addEventListener("click",(e)=>{
    
                        quizDivs[3].classList.add("d:none"); //사용버튼
                        quizDivs[0].classList.remove("d:none"); //문제
                        
                        //비활성화
                        for(let btn of skillUpperBtn)
                            btn.disabled = true;
                        for(let btn of atkItems) 
                            btn.disabled = true;

                        this.coco.skill='physical';
     
                    })

                    //2.마법 공격
                    document.querySelector(".magical-atk").addEventListener("click",(e)=>{

                        if(e.target.tagName!='INPUT')
                            return;

                        systemMent.innerHTML="";
                        quizDivs[2].classList.add("d:none"); //어떻게 할까요?
                        quizDivs[3].classList.add("d:none"); //사용버튼

                    systemMent.innerHTML=`<span class="skill-ment">화염구를 사용하여 약한 데미지로 공격.</span><button class="btn-base use-skill">사용</button>`;

                    document.querySelector(".use-skill").addEventListener("click",(e)=>{
                        systemMent.innerHTML="";

                        quizDivs[0].classList.remove("d:none"); //문제

                        //비활성화
                        for(let btn of skillUpperBtn)
                            btn.disabled = true;
                        for(let btn of atkItems) 
                            btn.disabled = true;


                        this.coco.skill='magic';
                    })
                    
                })

                //3.디버프
                document.querySelector(".debuff").addEventListener("click",(e)=>{

                    if(e.target.tagName!='INPUT')
                        return;

                    systemMent.innerHTML="";
                    quizDivs[2].classList.add("d:none"); //어떻게 할까요?
                    quizDivs[3].classList.add("d:none"); //사용버튼

                systemMent.innerHTML=`<span class="skill-ment">상대방의 공격력을 약화시킨다.</span><button class="btn-base use-skill">사용</button>`;

                document.querySelector(".use-skill").addEventListener("click",(e)=>{
                    systemMent.innerHTML="";

                    quizDivs[0].classList.remove("d:none"); //문제

                    //비활성화
                    for(let btn of skillUpperBtn)
                        btn.disabled = true;
                    for(let btn of atkItems) 
                        btn.disabled = true;
                    this.coco.skill='debuff';
                })
                
            })
                
    
                break;
                
                case 'help' :
                    bntDetail.innerHTML ="";
                    systemMent.innerHTML="";
                    quizDivs[3].classList.add("d:none"); //사용버튼


                    let helpHtml=
                    `<ul class="d:flex gap:4 mt:1 jc:start">
                        <li><label class="btn-base ac:center txt-al:center w:2 hill"><input type="radio" name="sub">회복 아이템</label></li>
                    </ul>`;
    
                    bntDetail.insertAdjacentHTML("beforeend",helpHtml);

                    
                    document.querySelector(".hill>input").addEventListener("click",()=>{
                        
                        quizDivs[2].classList.add("d:none"); //어떻게 할까요?
                        // quizDivs[3].classList.add("d:none"); //사용버튼

                        systemMent.innerHTML=`<span class="skill-ment">아이템을 사용하여 HP를 25 증가시킨다.</span><button class="btn-base use-item">사용</button>`;
                        
                                document.querySelector(".use-item").addEventListener("click",()=>{
                
                                    systemMent.innerHTML="";

                        
                                    
                                    this.coco.useItem();
                                    quizBox.addEventListener("click",()=>{
                                        this.afterQuiz();
                                        skillMenus.classList.add("vis:hidden"); //스킬 창 닫기

                                    },{ once : true})
                                });
                            })
    
                    break;
                    
                case 'run' :
                    bntDetail.innerHTML ="";
                    systemMent.innerHTML="";
                    quizDivs[2].classList.add("d:none"); //어떻게 할까요?
                    quizDivs[3].classList.add("d:none"); //사용버튼

                    systemMent.innerHTML=`<span class="skill-ment">연습 대결을 종료합니다.</span><button class="btn-base use-item">확인</button>`;

                    document.querySelector("button.use-item").addEventListener("click",()=>{
                        // 지금까지 푼 문제 서버로

                        if (this.coco.correct.length === 0 && this.coco.wrong.length === 0) {
                            window.location.href = `http://localhost:8080/`;
                            return;
                        }
                        this.closed();


                    })
                    


                    break;
            }
                    
        });
    }
    
    //================================================================================


    afterQuiz(){//TODO 멘트수정........
     
       
     
        let count =4;
        let fullHP = hpTotal.textContent;
        //hp피통 이미지 표시
        let progress = ((this.coco.hp)/fullHP)*100 ;
        if(progress<0){progress=0;this.coco.hp=0;}
        if(this.coco.hp>=fullHP){this.coco.hp=fullHP;}


         quizBox.addEventListener("click",()=>{//타격을 입었다 까지..
            if (count < quizDivs.length-2) {
                systemMent.innerHTML=``;
                quizDivs[count].classList.add("d:none");
                quizDivs[count+1].classList.remove("d:none");
                quizDivs[8].classList.add("d:none");

                if(count==6 && !this.coco.hp<=0 && !this.enemy.hp<=0){
                    this.enemy.attack(this.coco);
                    hpNow.textContent=this.coco.hp;
                    barStyle.style.width=(((this.coco.hp)/fullHP)*100) +"%";//(총-상대방공격)/총 * 100

                    console.log(this.coco.hp);
                    this.next();
                }
                if(count==7 && (this.coco.hp<=0||this.enemy.hp<=0)){

                    systemMent.innerHTML=``;
                    systemMent.innerHTML=`코코는 기분이 좋아보인다`;
                    
                    
                }
            }
                // else if(count==7 && this.coco.hp>0){
                //     // quizDivs[quizDivs.length-2].classList.add("d:none");//다음문제를 풀자
                //     systemMent.innerHTML=``;

                   
                //     }
                    if(count==8 && (this.coco.hp<=0||this.enemy.hp<=0)){
                        this.next();
                    }
                        count++;
                        

      
        
        
    });
        
              //비활성화 리셋
   
              for(let btn of skillUpperBtn){
                // btn.classList.replace("btn-base","n-btn:filled-4");
                btn.disabled = false;
                btn.checked = false;
            }
            for(let btn of atkItems) {
                // btn.classList.replace("btn-base","n-btn:filled-4");
                btn.disabled = false;
            }
            bntDetail.innerHTML ="";

        // for(let div of quizDivs){
        //     if((!div.classList.contains("d:none")) && div.classList.contains("beBeaten")){
        //         barStyle.style.width=(255-this.hp)/255*100 +"%";//(총-상대방공격)/총 * 100
        //     console.log(barStyle.style.width);
        //     console.log(this.hp);
        //     }
        // }
        
    
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
                quizDivs[0].classList.add("d:none");
                    //for (let v of answerInputs) {
                    
                    //정답처리
                    // let answerChecked = false;
                    for (let v of answerInputs) {
                        if(v.checked && v.dataset.value !=randQ.answer){//틀림
                            this.coco.wrong.push(randQ.id);
                            // this.coco.hp -=25;
      
                            // answerChecked = true;

                            systemMent.innerHTML=`답은 ${randQ.answer} 입니다.`;
                            break; 
                        }
                        else if(v.checked && v.dataset.value ==randQ.answer){//맞음
                            // answerChecked = true;
                            this.coco.correct.push(randQ.id);
                            this.coco.attack(this.enemy);

                            break;
                        }
                    }
                    

                    
                    quizBox.addEventListener("click",()=>{

                    this.afterQuiz();
                    },{ once : true});
                    skillMenus.classList.add("vis:hidden"); //스킬 창 닫기
                    
              
           

               
            },{ once : true});
         
            

            console.log("여기는 submitAnswer밖");
            
            return this;
        //resolve(this.afterQuiz());

           
}



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

runQuiz();



// quizBox.removeEventListener("click", clickHandler); 클릭 막기~~~


// quizBox.addEventListener("click",function(){
     
     
     

//      quizBox.removeEventListener("click", arguments.callee);//제거

     
//     })
        
    // skillUpperBtn[1].addEventListener("click",function(){ //공격클릭
        
    //     skillSubBtn[0].classList.remove("vis:hidden");
    // })



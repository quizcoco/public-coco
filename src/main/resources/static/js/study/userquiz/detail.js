let cardSection = document.querySelector("#card-section");
let mainCard = cardSection.querySelector("section");
let quizCard = document.querySelector(".card-container");
let leftSide = document.querySelector(".small-card-l");
let rightBtn = document.querySelector(".right");
let cardCount = document.querySelector(".card-count");
let currentCard = cardCount.querySelector("span:first-child");

let progressbar = document.querySelector("div[role='progressbar']>div");

const dropdownButton = document.getElementById("dropdown-btn");
const dropdownList = document.getElementById("dropdown-list");

dropdownButton.addEventListener("click", function () {
  dropdownList.classList.toggle("active");
});

class Repository{
    constructor(count){
        this.count = count;
    }
    async getQuiz(){
        const response = await fetch(`/api/userQuizs/detail?no=${this.count}`);
        // this.count++;
        return response;
    }
    async getAllCnt(){
        return await fetch(`/api/userQuizs/count`);
    }
}


function formatDate(date) {
    const year = date.getFullYear();
    const month = padZero(date.getMonth() + 1);
    const day = padZero(date.getDate());
    const hours = padZero(date.getHours());
    const minutes = padZero(date.getMinutes());
    const seconds = padZero(date.getSeconds());
    
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

function padZero(num) {
    return (num < 10 ? '0' : '') + num;
}


function nextCard(count,userQ){

    for(quiz of userQ){



    mainCard.innerHTML ="";

    const regDate = new Date(quiz.regDate);
    const formattedDate = formatDate(regDate);


    let quizHtml=             
    `<article class="card-container" draggable="true">
        <h1 class="d:none">하위그룹</h1>
        <section>
            <h1 class="d:none">카드 상단</h1>
    
            <div class="d:flex fl-dir:row jc:space-between pb:4">
                <div class="d:flex justify-content:flex-end">
                    <a class="icon icon:star icon-color:base-4"
                    href="">즐겨찾기</a>
                </div>
                <!-- 모달 추가하기  -->
                <div class="n-dropdown">
                <button id="dropdown-btn" class="icon icon:dots_three_outline_vertical_fill">기타 아이콘</button>
                <ul id="dropdown-list" class="left:-2">
                    <h1 class="d:none">기타 메뉴</h1>
                    <li><a href="">수정</a></li>
                    <li><a href="">삭제</a></li>
                </ul>
            </div>            </div>
  
            
            <div class="d:flex fl-dir:row jc:space-between">
                <!-- 카드갯수 -->
                <div class="d:flex jc:flex-start">
                    <span style="margin-right:6px;">${count}</span> 
                    <span style="margin-right:6px;">/</span> 
                    <span>999</span>
                </div>
            
                <!-- reg_date -->
                <div class="d:flex jc:flex-end pb:3">
                    <span style="margin-right:6px;">${formattedDate}</span> 
                </div>
            </div>
        </section>
    
        <!-- 문제 ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ -->
        <section id="quiz-card" class="bg-color:base-1 h:5">
            <h1 class="d:none">카드 내용</h1>
            <section>
                <div class="p:2">
                    <span class="d:inline-block pb:1">[${quiz.category=='ox'?"OX":quiz.category=='multi'?"사지선다":"단답"} 문제]</span><br>
                    <span class="d:inline-block pb:3 fw:bold pb:7">${quiz.question}</span><br>
                    <span class="d:inline-block pb:2 fw:bold">${quiz.num1?? ""}</span><br>
                    <span class="d:inline-block pb:2 fw:bold">${quiz.num2?? ""}</span><br>
                    <span class="d:inline-block pb:2 fw:bold">${quiz.num3?? ""}</span><br>
                    <span class="d:inline-block pb:2 fw:bold">${quiz.num4?? ""}</span><br>
                    <span class="d:inline-block pb:2 fw:bold color:accent-4">${quiz.answer}</span>
                </div>
            </section>
        </section>
    
        
        <section class="d:flex fl-dir:column ai:center">
            <h1 class="d:none">카드 하단</h1>
            <div class="n-progress n-progress-card" role="progressbar">
                <div style="width: 40%"></div>
            </div>
            <div class="d:flex gap:10">
                <div class="icon icon:shuffle_fill pr:10">랜덤 재생 아이콘</div>
                <div class="icon icon:pause_fill pr:10 pl:5">재생/멈춤 아이콘</div>
                <a href="" data-id=${count} class="right"><div class="icon icon:arrows_clockwise_fill pr:10 pl:5">반복 재생 아이콘,오른쪽</div></a>
                </div>
        </section>
    </article>`;

    mainCard.insertAdjacentHTML("beforeend",quizHtml);
    }

//기타메뉴
const dropdownButton = document.getElementById("dropdown-btn");
const dropdownList = document.getElementById("dropdown-list");

dropdownButton.addEventListener("click", function () {
  dropdownList.classList.toggle("active");
});
//다음카드
getUserQuiz(count,(userQ)=>{
    
    document.querySelector(".right").addEventListener("click", async (e) => {
        e.preventDefault();
        count++;

    nextCard(count,userQ);

    });

    leftSide.addEventListener("click", async (e) => {
        e.preventDefault();
        count--;

    nextCard(count,userQ);

    });


});
//프로그레스바
let progressbar = document.querySelector("div[role='progressbar']>div");
progressbar.style.width=(count/44)*100+"%";//TODO 44부분 변경할것


}

async function getUserQuiz(count,callback){
    let repository = new Repository(count);
    let response = await repository.getQuiz();
    let userQ = await response.json();

    callback(userQ)


}
let count = currentCard.dataset.no || 1;
getUserQuiz(count,(userQ)=>{

    rightBtn.addEventListener("click",async(e) => {

    e.preventDefault();
    
    nextCard(count,userQ);

});

   leftSide.addEventListener("click", async (e) => {
        e.preventDefault();

    nextCard(count,userQ);

    });




});

//TODO leftSide 쪽에 아주 문제가 심각..............
let cardSection = document.querySelector("#card-section");
let mainCard = cardSection.querySelector("section");
let leftBtn = document.querySelector(".left");
let rightBtn = document.querySelector(".right");

let cardCount = document.querySelector(".card-count");
let currentCard = cardCount.querySelector("span:first-child");
let totalCount = cardCount.querySelector("span:last-child");

let progressbar = document.querySelector("div[role='progressbar']>div");

let quizCard = document.querySelector("#quiz-card");
let quizQuestion = document.querySelector(".quiz-question");
let sectionSpan = quizCard.querySelector("span:last-child");

const cancelBtn = document.getElementById('cancel-btn');
const confirmBtn = document.getElementById('confirm-btn');
const deleteModal = document.getElementById('delete-modal');

let form = document.querySelector("form[action='del']");
let delID = form.querySelector("input[name='id']");
let delCate = form.querySelector("input[name='category']");

const dropdownButton = document.getElementById("dropdown-btn");
const dropdownList = document.getElementById("dropdown-list");

//detail 기본 기타메뉴 ================================================

dropdownButton.addEventListener("click", function () {
  dropdownList.classList.toggle("active");
});

//=====================================================================

let url = window.location.href;
let params = url.split("?")[1];
let paramsArray = params.split("&");
let paramsObject = {};

paramsArray.forEach(function(param) {
    let keyValue = param.split("=");
    let key = keyValue[0];
    let value = keyValue[1];
    paramsObject[key] = value;
});

let id = paramsObject["id"];
let category = paramsObject["category"];

//========================================================================

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
 
async function nextCard(count,userQ){

    let allCount = await getQuizCount();

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
                        <li><a href="edit?id=${quiz.id}&category=${quiz.category}">수정</a></li>
                        <li><a href="" class="del">삭제</a></li>
                    </ul>
                    </div>
                </div>
                
                <div class="d:flex fl-dir:row jc:space-between">
                    <!-- 카드갯수 -->
                    <div class="d:flex jc:flex-start">
                        <span style="margin-right:6px;">${count}</span> 
                        <span style="margin-right:6px;">/</span> 
                        <span>${allCount}</span>
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
                    <div class="quiz-question p:2">
                        <span class="d:inline-block pb:1">[${quiz.category=='ox'?"OX":quiz.category=='multi'?"사지선다":"단답"} 문제]</span><br>
                        <span class="d:inline-block pb:3 fw:bold pb:7">${quiz.question}</span><br>
                        <span class="d:inline-block pb:2 fw:bold">${quiz.num1?? ""}</span><br>
                        <span class="d:inline-block pb:2 fw:bold">${quiz.num2?? ""}</span><br>
                        <span class="d:inline-block pb:2 fw:bold">${quiz.num3?? ""}</span><br>
                        <span class="d:inline-block pb:2 fw:bold">${quiz.num4?? ""}</span><br>
                        <span class="d:none d:inline-block pb:2 fw:bold color:accent-4">${quiz.answer}</span>
                    </div>
                </section>
            </section>
            
            <section class="d:flex fl-dir:column ai:center">
                <h1 class="d:none">카드 하단</h1>
                <div class="n-progress n-progress-card" role="progressbar">
                    <div style="width: 40%"></div>
                </div>
                <div class="d:flex gap:10">
                <a href="" class="left"><div class="icon icon:caret_left_bold pr:10">왼쪽</div></a>
                    <a href="" data-id=${count} class="right"><div class="icon icon:caret_right_bold pr:10 pl:5">오른쪽</div></a>
                    </div>
            </section>
        </article>`;

        mainCard.insertAdjacentHTML("beforeend",quizHtml);
    }

    //기타메뉴 ================================================
    const dropdownButton = document.getElementById("dropdown-btn");
    const dropdownList = document.getElementById("dropdown-list");

    //프로그레스 바 움직였을때 기타메뉴 ===========================
    dropdownButton.addEventListener("click", function () {
        dropdownList.classList.toggle("active");
    });

    //프로그레스바 ================================================
    let progressbar = document.querySelector("div[role='progressbar']>div");
    progressbar.style.width=(count/allCount)*100+"%";//TODO 한번클릭해야 변경된다

    let quizCard = document.querySelector("#quiz-card");
    let quizQuestion = document.querySelector(".quiz-question");
    let sectionSpan = quizCard.querySelector("span:last-child");
        
    quizQuestion.addEventListener("click", function(){
        sectionSpan.classList.remove('d:none');
    })

    delModal();
 
    // left button ================================================
    document.querySelector(".left").addEventListener("click", async (e) => {
        e.preventDefault();
        if (count > 1) {
            count--;
            nextCard(count, userQ);
        }
    });
 
     // right button ================================================
     document.querySelector(".right").addEventListener("click", async (e) => {
        e.preventDefault();
        if (count < allCount) {
            count++;
            nextCard(count, userQ);
        }
    });
}

/* ============================================ */

async function getUserQuiz(count,callback){
    let repository = new Repository(count);
    let response = await repository.getQuiz();
    let userQ = await response.json();

    callback(userQ)
}

async function getQuizCount(){
    let repository = new Repository();
    let response = await repository.getAllCnt();
    let allCount = await response.json();

    return allCount;
}

let count = currentCard.dataset.no || 1;

getUserQuiz(count,(userQ)=>{

        rightBtn.addEventListener("click",async(e) => {

        e.preventDefault();
        
        nextCard(count,userQ);
    });

    leftBtn.addEventListener("click", async (e) => {
        e.preventDefault();

        nextCard(count,userQ);
    });
});


//삭제 모달 ================================================

function delModal(){

    document.querySelector(".del").addEventListener("click",(e) => {
        e.preventDefault();

        deleteModal.classList.remove('d:none');
    });

    cancelBtn.addEventListener('click', function () {
        deleteModal.classList.add('d:none');
    });

    confirmBtn.addEventListener('click', function (e) {
        e.preventDefault();
        deleteModal.classList.add('d:none');

        delID.value = id;
        delCate.value = category;

        form.submit();
    });
}

quizQuestion.addEventListener("click", function(){
    sectionSpan.classList.remove('d:none');
})

//detail 기본 프로그레스바 ================================================
progressbar.style.width=(count/ totalCount.dataset.count)*100+"%";

delModal();
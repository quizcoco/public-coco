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

//=====================================================================

class Repository{
    constructor(count){
        this.count = count;
    }

    async getQuiz(){
        const response = await fetch(`/api/userQuizs/detail?no=${this.count}`);
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

async function nextCard(count, userQ){
    mainCard.innerHTML ="";

    for(let quiz of userQ){
        const regDate = new Date(quiz.regDate);
        const formattedDate = formatDate(regDate);

        let quizHtml =             
        `<article class="card-container" draggable="true">
            <h1 class="d:none">하위그룹</h1>
            <section>
                <h1 class="d:none">카드 상단</h1>
        
                <div class="d:flex fl-dir:row jc:space-between pb:6 h:1">
                    <div class="d:flex justify-content:flex-end">
                        <form action="add" method="post">
                        <a class="icon ${quiz.like!="0"?'icon-star':'icon:star'} icon-color:base-4"
                        href="">즐겨찾기</a></form>
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
                        <span>${totalCount.textContent}</span>
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
                    <div class="quiz-question input-text:Qcard">
                        <span class="d:inline-block pb:1">[${quiz.category=='ox'?"OX":quiz.category=='multi'?"사지선다":"단답"} 문제]</span><br>
                        <span class="d:inline-block pb:3 fw:bold pb:7">${quiz.question}</span><br>
                        <span class="d:inline-block pb:2 fw:bold">${quiz.num1?? ""}</span><br>
                        <span class="d:inline-block pb:2 fw:bold">${quiz.num2?? ""}</span><br>
                        <span class="d:inline-block pb:2 fw:bold">${quiz.num3?? ""}</span><br>
                        <span class="d:inline-block pb:2 fw:bold">${quiz.num4?? ""}</span><br>
                        <span class="d:none d:inline-block pb:2 fw:bold color:accent-4 mt:4">${quiz.answer}</span>
                    </div>
                </section>
            </section>
            
            <section class="d:flex fl-dir:column ai:center">
                <h1 class="d:none">카드 하단</h1>
                <div class="n-progress n-progress-card" role="progressbar">
                    <div style="width: 40%"></div>
                </div>
                <div class="d:flex gap:10">
                    <a href="" data-id=${count} class="left"><div class="icon icon:caret_left_bold pr:10">왼쪽</div></a>
                    <a href="" data-id=${count} class="right"><div class="icon icon:caret_right_bold pr:10 pl:5">오른쪽</div></a>
                </div>
            </section>
        </article>`;

        mainCard.insertAdjacentHTML("beforeend",quizHtml);
    }

    // 이벤트 리스너 등록
    registerEventListeners(count, userQ);

    //기타메뉴
    const dropdownButton = document.getElementById("dropdown-btn");
    const dropdownList = document.getElementById("dropdown-list");

    dropdownButton.addEventListener("click", function () {
        dropdownList.classList.toggle("active");
    });

    //프로그레스바
    let progressbar = document.querySelector("div[role='progressbar']>div");
    progressbar.style.width=(count/ totalCount.dataset.count)*100+"%";//프로그레스바

    let quizCard = document.querySelector("#quiz-card");
    let quizQuestion = document.querySelector(".quiz-question");
    let sectionSpan = quizCard.querySelector("span:last-child");
        
    quizQuestion.addEventListener("click", function(){
        sectionSpan.classList.remove('d:none');
    })

    delModal();
}

/* ================================================== */

async function getUserQuiz(count, callback){
    let repository = new Repository(count);
    let response = await repository.getQuiz();
    let userQ = await response.json();

    callback(userQ);
}

/* ====================================================== */

async function getQuizCount(){
    let repository = new Repository();
    let response = await repository.getAllCnt();
    let allCount = await response.json();

    return allCount;
}

async function registerEventListeners(count, userQ) {
    // 왼쪽 버튼 클릭
    document.querySelector(".left").addEventListener("click", async (e) => {
      e.preventDefault();
      if (count > 1) {
        count--;
        getUserQuiz(count, (userQ) => {
          nextCard(count, userQ);
        });
      }
    });
    
    document.querySelector(".right").addEventListener("click", async (e) => {
        e.preventDefault();
    
        // 문제수와 count가 같으면 right 버튼을 비활성화
        if (count >= parseInt(totalCount.dataset.count)) {
            document.querySelector(".right").disabled = true;
            return; // right 버튼을 더 이상 처리하지 않고 종료
        }
    
        if (1 < totalCount.dataset.count) {
            count++;
            getUserQuiz(count, (userQ) => {
                nextCard(count, userQ);
            });
        }
    });

}
  
let count = currentCard.dataset.no || 1;

getUserQuiz(count, (userQ) => {
    registerEventListeners(count, userQ); // 합병된 부분
});

// 삭제 모달
function delModal(){
    document.querySelector(".del").addEventListener("click", (e) => {
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
});

progressbar.style.width=(count/ totalCount.dataset.count)*100+"%";//프로그레스바

delModal();


/* 즐겨찾기=============================== */

let star = document.querySelector(".favorite");
// 문제 즐겨찾기 버튼 클릭 시 이벤트 처리
star.addEventListener("click", async (e) => {
    
    e.preventDefault();
                                // 빈별 누르면 노란별로 변할것이다
    star.classList.replace("icon:star","icon-star");


    
    // 해당 문제의 ID와 카테고리 가져오기
    // let id = paramsObject["id"];
    // let category = paramsObject["category"];
    // const url = `/api/user-quizzes-favorites/add?id=${id}&category=${category}`; // 요청할 URL

    // id,category를 불러올수있냐? 
    console.log("============",id,category); //불러와진다

    fetch(`/api/user-quizzes-favorites/add?id=${id}&category=${category}`)
    .then(response => {
        if (!response.ok) {
        throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('성공', data); // 성공적으로 응답을 받았을 때 콘솔에 출력

    })
    .catch(error => {
        console.error('에러 발생', error); // 오류가 발생했을 때 콘솔에 출력
    });


});

fetch(`/api/user-quizzes-favorites/fav?id=${id}&category=${category}`)
.then(response => {
    if (!response.ok) {
    throw new Error('Network response was not ok');
    }
    return response.json();
})
.then(data => {
    console.log('성공', data); // 성공적으로 응답을 받았을 때 콘솔에 출력
    star.classList.add("icon-star");

})
.catch(error => {
    console.error('에러 발생', error); // 오류가 발생했을 때 콘솔에 출력
});
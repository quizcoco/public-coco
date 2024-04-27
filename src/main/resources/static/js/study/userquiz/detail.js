let cardSection = document.querySelector("#card-section");
let quizCard = document.querySelector(".card-container");
let leftSide = document.querySelector(".left-card");
let rightBtn = document.querySelector(".right");

class Repository{
    constructor(){
        this.count = 1;
    }
    getQuiz(){
        return fetch(`/api/userQuizs/detail?no=${this.count}`);
    }
}

async function getUserQuiz(){
    let repository = new Repository();
    let response = await repository.getQuiz();
    let userQ = await response.json();

    repository.count++;
   
    return userQ;
}

rightBtn.addEventListener("click", async (event) => {
    let userQ = await getUserQuiz();
    for (let q of userQ) {
        
let count=0;
let url = `http://localhost:8080/api/userQuizs/detail?no=${count}`
count++;
rightBtn.href=url;
    //cardSection.classList.add("slide");
    // event.dataTransfer.
    // make it half transparent
   // leftSide.ondragover = function(e){
    
        // quizCard.classList.add("dragging");
        cardSection.innerHTML ="";

        let quizHtml=             
        `<article class="card-container" draggable="true">
            <h1 class="d:none">하위그룹</h1>
            <section>
                <h1 class="d:none">카드 상단</h1>
        
                <div class="d:flex fl-dir:row jc:space-between pb:4">
                    <div class="d:flex justify-content:flex-end">
                        <a class="icon icon-color:base-4"
                        href="">즐겨찾기</a>
                    </div>
                    <!-- 모달 추가하기  -->
                    <div class="icon icon:dots_three_outline_vertical_fill">기타 아이콘</div>
                </div>
        
                <!-- TODO 모달 -->
                <section class="d:none">
                    <h1 class="d:none">기타 메뉴</h1>
                    <div><a href="">수정</a></div>
                    <div><a href="">삭제</a></div>
                    <div>외부로 공유</div>
                    <div>슬라이드 시간 설정</div>
                </section>
                
                <div class="d:flex fl-dir:row jc:space-between">
                    <!-- 카드갯수 -->
                    <div class="d:flex jc:flex-start">
                        <span style="margin-right:6px;">12</span> 
                        <span style="margin-right:6px;">/</span> 
                        <span>52</span>
                    </div>
                
                    <!-- reg_date -->
                    <div class="d:flex jc:flex-end pb:3">
                        <span style="margin-right:6px;">2024-02-13</span> 
                    </div>
                </div>
            </section>
        
            <!-- 문제 ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ -->
            <section id="quiz-card" class="bg-color:base-1 h:5">
                <h1 class="d:none">카드 내용</h1>
                <section>
                    <div class="p:2">
                        <span class="d:inline-block pb:1">[사지선다 문제]</span><br>
                        <span class="d:inline-block pb:3 fw:bold pb:7">${q.question}</span><br>
                        <span class="d:inline-block pb:2 fw:bold">①</span><br>
                        <span class="d:inline-block pb:2 fw:bold">②</span><br>
                        <span class="d:inline-block pb:2 fw:bold">③</span><br>
                        <span class="d:inline-block pb:2 fw:bold">④</span><br>
                        <span class="d:inline-block pb:2 fw:bold color:accent-4">답</span>
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
                    <div class="icon icon:arrows_clockwise_fill pr:10 pl:5">반복 재생 아이콘</div>
                </div>
            </section>
        </article>`;

cardSection.insertAdjacentHTML("beforeend",quizHtml);

    //     console.log("ddd")
    // }
  }

//   if(quizCard.classList.contains("dragging")){

// }
});

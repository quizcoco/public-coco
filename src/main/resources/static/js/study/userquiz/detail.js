let quizCard = document.querySelector("#quiz-card")

class Repository{
    getQuizById(){

        // let id = 
        return fetch(`api/userQuizs/detail?id=${id}`);
    }
}

async function getQuiz(){
    let repository = new Repository();
    let response= await repository. getQuizById();
    let oxQuiz = await response.json(); 
    return oxQuiz;
}

function content(){

    quizCard.innerHTML="jj";

    switch (state) {
        case 'ox' :
            quizCard.innerHTML ="";

            let oxHtml=`  <div class="p:2">
            <span class="d:inline-block pb:1">[사지선다 문제]</span><br>
            <span class="d:inline-block pb:3 fw:bold pb:7">아첨하는 말과 알랑거리는 태도 라는 뜻을 가진 사자성어는 무엇인가?</span><br>
            <span class="d:inline-block pb:2 fw:bold">①교언영색</span><br>
            <span class="d:inline-block pb:2 fw:bold color:accent-4">②곡학아세</span><br>
            <span class="d:inline-block pb:2 fw:bold">③다문박식</span><br>
            <span class="d:inline-block pb:2 fw:bold">④감언지지</span><br>
        </div>`;

        quizCard.insertAdjacentHTML("beforeend",oxHtml);

        break;

        case 'multi' :
            quizCard.innerHTML ="";

            let multiHtml=`  <div class="p:2">
            <span class="d:inline-block pb:1">[사지선다 문제]</span><br>
            <span class="d:inline-block pb:3 fw:bold pb:7" th:text="${useroxq.question}">아첨하는 말과 알랑거리는 태도 라는 뜻을 가진 사자성어는 무엇인가?</span><br>
            <span class="d:inline-block pb:2 fw:bold">①교언영색</span><br>
            <span class="d:inline-block pb:2 fw:bold color:accent-4">②곡학아세</span><br>
            <span class="d:inline-block pb:2 fw:bold">③다문박식</span><br>
            <span class="d:inline-block pb:2 fw:bold">④감언지지</span><br>
        </div>`;
            
        quizCard.insertAdjacentHTML("beforeend",multiHtml);

        break;
    }
}

content();



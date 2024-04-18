let quizCard = document.querySelector("#quiz-card");
let oxType= quizCard.querySelector("span[data-type='ox']");

//TODO ID를 어떻게 받아야하나 → 카드 question
class Repository{
    getQuizById(){
        let id = 51;
        return fetch(`api/userQuizs/detail?id=${id}`);
    }
}

async function getQuiz(){
    let repository = new Repository();
    let response= await repository. getQuizById();

    console.log("rse : " ,response);

    let oxQuiz = await response.json();
    
    content(oxQuiz);
    
    //return oxQuiz;
}

function content(oxQuiz){



    quizCard.innerHTML="jj";

    let state = oxType.dataset.type;
    console.log(oxType.dataset.type);
    
    switch (state) {
        case 'ox' :
            quizCard.innerHTML ="";

            let oxHtml=`   <div class="p:2">
            <span class="d:inline-block pb:1">[OX 문제]</span><br>
            <span class="d:inline-block pb:3 fw:bold pb:7">${oxQuiz.question}</span><br>
            <span class="d:inline-block pb:2 fw:bold color:accent-4">${oxQuiz.answer}</span>
        </div>`;

        quizCard.insertAdjacentHTML("beforeend",oxHtml);

        break;

        case 'multi' :
            quizCard.innerHTML ="";

            let multiHtml=`  <div class="p:2">
            <span class="d:inline-block pb:1">[사지선다 문제]</span><br>
            <span class="d:inline-block pb:3 fw:bold pb:7">아첨하는 말과 알랑거리는 태도 라는 뜻을 가진 사자성어는 무엇인가?</span><br>
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



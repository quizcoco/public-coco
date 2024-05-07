let quizType = document.getElementById("quizType");
let typeOption = quizType.querySelectorAll("option");

let hiddenCate = document.querySelector("input[name='cate']");
let hiddenId = document.querySelector("input[name='id']");
let inputQuizBlock = document.querySelector(".input-quiz-block");

// 현재 URL을 가져옵니다.
let url = window.location.href;

//파라미터로 받아오기
let params = url.split("?")[1];

// '&'로 파라미터를 분리합니다.
let paramsArray = params.split("&");

// 파라미터를 저장할 객체를 생성합니다.
let paramsObject = {};

// 파라미터를 객체에 저장합니다.
paramsArray.forEach(function(param) {
    let keyValue = param.split("=");
    let key = keyValue[0];
    let value = keyValue[1];
    paramsObject[key] = value;
});

// 'id'와 'category' 파라미터 값을 가져옵니다.
let id = paramsObject["id"];
let category = paramsObject["category"];

console.log(category);

class Repository{
    getQuiz(){
        return fetch(`/api/userQuizs/edit?id=${id}&category=${category}`);
    }
}

async function getUserQuiz(){
    let repository = new Repository();
    let response = await repository.getQuiz();
    let userQ = await response.json();
   
    return userQ;
}

getUserQuiz().then(userQ=>{

    quizType.disabled = true;
    
    for(let type of typeOption){   
        if(category==type.value)
            type.selected = true;
    }

    hiddenCate.value = category;
    hiddenId.value = id;

    switch (category) {
        case 'short' :

            inputQuizBlock.innerHTML = "";

            let shortHtml= `<div id="shortQuiz">
                                <label class="pb:3 fw:bold fs:5">문제<span class="color:accent-1">*</span>
                                    <textarea name="question" autocomplete="off" class="input-text:short" required>${userQ.question}</textarea></label>
                                <label class="pb:3 fw:bold fs:5">단답형 답<span class="color:accent-1">*</span>
                                    <textarea name="answer" autocomplete="off" class="input-text:short" required>${userQ.answer}</textarea></label>
                                <label class="pb:3 fw:bold fs:5">해설(선택)<textarea name="commentary" autocomplete="off" class="input-text:short">${userQ.commentary}</textarea></label> 
                            </div>`;

            inputQuizBlock.insertAdjacentHTML("beforeend",shortHtml);

            break;

        case 'multi' :

            // inputQuizBlock.innerHTML = "";

            let multiHtml= `<div id="multipleQuiz">
                                <label class="pb:3 fw:bold fs:5">문제<span class="color:accent-1">*</span></label>
                                    <textarea name="question" autocomplete="off" class="input-text:multi" required>${userQ.question}</textarea>
                                    <textarea name="num1" placeholder="①" autocomplete="off" class="input-text:multi" required>${userQ.num1}</textarea>
                                    <textarea name="num2" placeholder="②" autocomplete="off" class="input-text:multi" required>${userQ.num2}</textarea>
                                    <textarea name="num3" placeholder="③" autocomplete="off" class="input-text:multi" required>${userQ.num3}</textarea>
                                    <textarea name="num4" placeholder="④" autocomplete="off" class="input-text:multi" required>${userQ.num4}</textarea>
                                <label class="pb:3 fw:bold fs:5">답<span class="color:accent-1">*</span></label>
                                    <textarea name="multiAnswer" type="number" autocomplete="off" class="input-text:multi" required>${userQ.answer}</textarea>
                                <label class="pb:3 fw:bold fs:5">해설(선택)</label>    
                                    <textarea name="commentary" autocomplete="off" class="input-text:multi">${userQ.commentary}</textarea>
                            </div>`;

            inputQuizBlock.insertAdjacentHTML("beforeend",multiHtml);

            break;
            
        case 'ox' :  

            inputQuizBlock.innerHTML = "";

            let oxHtml= `<div id="oxQuiz" class="bd-radius:2 bg-color:">
                            <label class="pb:3 fw:bold fs:5">문제<span class="color:accent-1">*</span>
                                <textarea name="question" class="input-text:short" autocomplete="off" required>${userQ.question}</textarea></label>   
                            <label class="pb:3 fw:bold fs:5">OX답<span class="color:accent-1">*</span></label>    
                            <div class="d:flex fl-dir:row gap:3 ai:center jc:flex-end pb:2">
                                <label><input type="radio" name="answer" class="n-btn n-btn:filled-o" value="o" ${userQ.answer === 'o'?'checked' : ''}>O</label>
                                <label><input type="radio" name="answer" class="n-btn n-btn:filled-x" value="x" ${userQ.answer === 'x'?'checked' : ''}>X</label>
                            </div>
                            <label class="pb:3 fw:bold fs:5">해설(선택)</label>    
                                <textarea name="commentary" class="input-text:short" autocomplete="off">${userQ.commentary}</textarea>
                        </div>`;
            inputQuizBlock.insertAdjacentHTML("beforeend",oxHtml);
            
            break;
    }
});

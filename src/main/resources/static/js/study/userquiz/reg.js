// let regBtn = document.querySelector(".reg-btn>input"); //자식인 버튼을 선택
// regBtn.addEventListener("click",()=>{

    
//     // alert("test") // 여기 나옴
// })


/* =========================================== */

let quizType = document.getElementById("quizType");
let inputQuizBlock = document.querySelector(".input-quiz-block");

inputQuizBlock.innerHTML = `<div id="shortQuiz">
<label class="pb:3 fw:bold fs:5">문제<span class="color:accent-1">*</span>
    <textarea name="question" autocomplete="off" class="input-text:short" required></textarea></label>
<label class="pb:3 fw:bold fs:5">단답형 답<span class="color:accent-1">*</span>
    <textarea name="answer" autocomplete="off" class="input-text:short" required></textarea></label>
<label class="pb:3 fw:bold fs:5">해설(선택)<textarea name="commentary" autocomplete="off" class="input-text:short"></textarea></label>
    
</div>`;


quizType.addEventListener("click",function(e){
            
    // if(e.target.tagName!='INPUT')
    // return;

    let state = quizType.value;
        switch (state) {
            case 'short' :

            inputQuizBlock.innerHTML ="";

            let shortHtml=
                        `<div id="shortQuiz">
                        <label class="pb:3 fw:bold fs:5">문제<span class="color:accent-1">*</span>
                            <textarea name="question" autocomplete="off" class="input-text:short" required></textarea></label>
                        <label class="pb:3 fw:bold fs:5">단답형 답<span class="color:accent-1">*</span>
                            <textarea name="answer" autocomplete="off" class="input-text:short" required></textarea></label>
                        <label class="pb:3 fw:bold fs:5">해설(선택)<textarea name="commentary" autocomplete="off" class="input-text:short"></textarea></label>
                            
                    </div>`;
            
            inputQuizBlock.insertAdjacentHTML("beforeend",shortHtml);

            break;

            case 'multi' :
                inputQuizBlock.innerHTML ="";

                let multiHtml=
                            `<div id="multipleQuiz">
                            <label class="pb:3 fw:bold fs:5">문제<span class="color:accent-1">*</span></label>
                                <textarea name="question" autocomplete="off" class="input-text:multi" required></textarea>
                                <textarea name="num1" placeholder="①" autocomplete="off" class="input-text:multi" required></textarea>
                                <textarea name="num2" placeholder="②" autocomplete="off" class="input-text:multi" required></textarea>
                                <textarea name="num3" placeholder="③" autocomplete="off" class="input-text:multi" required></textarea>
                                <textarea name="num4" placeholder="④" autocomplete="off" class="input-text:multi" required></textarea>
                            <label class="pb:3 fw:bold fs:5">답<span class="color:accent-1">*</span></label>
                                <textarea name="multiAnswer" type="number" autocomplete="off" class="input-text:multi" required></textarea>
                            <label class="pb:3 fw:bold fs:5">해설(선택)</label>    
                                <textarea name="commentary" autocomplete="off" class="input-text:multi"></textarea>
                        </div>`;
                
                inputQuizBlock.insertAdjacentHTML("beforeend",multiHtml);

                break;
                
            case 'ox' :  
            inputQuizBlock.innerHTML ="";
            // <label class="n-toggle n-toggle-type:outline-box" value="o">O<input type="radio" name="answer" class="d:none" /></label>

            let oxHtml=
                        `<div id="oxQuiz" class="bd-radius:2 bg-color:">
                        <label class="pb:3 fw:bold fs:5">문제<span class="color:accent-1">*</span>
                            <textarea name="question" class="input-text:short" autocomplete="off" required></textarea></label>
                            
                        <label class="pb:3 fw:bold fs:5">OX답<span class="color:accent-1">*</span></label>    
                            <div class="d:flex fl-dir:row gap:3 ai:center jc:flex-end pb:2">
                                <label class="n-toggle n-toggle-type:outline-box">O<input type="radio" value="o" name="answer" class="d:none" /></label>
                                <label class="n-toggle n-toggle-type:outline-box">X<input type="radio" value="x" name="answer" class="d:none" /></label>
                            </div>
                        <label class="pb:3 fw:bold fs:5">해설(선택)</label>    
                            <textarea name="commentary" class="input-text:short" autocomplete="off"></textarea>
                    </div>`;
            
            inputQuizBlock.insertAdjacentHTML("beforeend",oxHtml);

            break;
        }
    });

/* ============================================= */

// 문제 형식 선택해서 유저 문제 등록하기
quizType.onchange = function(e){

    let quizType = document.getElementById("quizType").value;
   
       if(quizType === "short") { 
           //퀴즈 타입에서 선택한 문제 등록 블럭을 보이게 하기
           document.getElementById("shortQuiz").style.display = "block";
   
           //if문에서 선택한 퀴즈 타입과 다른 문제 등록 블럭을 안보이게 하기
           document.getElementById("multipleQuiz").style.display = "none";
           document.getElementById("oxQuiz").style.display = "none";
       } 
       else if(quizType === "multi") {
           document.getElementById("multipleQuiz").style.display = "block";
   
           document.getElementById("shortQuiz").style.display = "none";
           document.getElementById("oxQuiz").style.display = "none";
       }
       else if(quizType === "ox") {
           document.getElementById("oxQuiz").style.display = "block";
   
           document.getElementById("shortQuiz").style.display = "none";
           document.getElementById("multipleQuiz").style.display = "none";
       };
};


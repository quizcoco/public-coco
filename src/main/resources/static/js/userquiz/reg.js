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
       else if(quizType === "multiple") {
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

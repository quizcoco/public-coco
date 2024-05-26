let quizLists = document.querySelectorAll("div.report-box");

let detailModal = document.querySelector("#detail-modal");
let closeButton = document.querySelector("#close-btn");

let questionM = detailModal.querySelector(".question");
let context = detailModal.querySelector(".context");
let num1 = detailModal.querySelector(".num1");
let num2 = detailModal.querySelector(".num2");
let num3 = detailModal.querySelector(".num3");
let num4 = detailModal.querySelector(".num4");
let answer = detailModal.querySelector(".answer");



// for(let list of quizLists){
    for(let [index, list] of quizLists.entries()){
    list.addEventListener("click",(e)=>{
        
        if(e.target.tagName!='SPAN')
            return;
        let questionData= e.target.dataset.question;
        let contextData= e.target.dataset.context;
        let num1Data= e.target.dataset.num1;
        let num2Data= e.target.dataset.num2;
        let num3Data= e.target.dataset.num3;
        let num4Data= e.target.dataset.num4;
        let answerData= e.target.dataset.answer;

        // console.log(quiz);
        detailModal.classList.remove("d:none");
        questionM.innerHTML=`- ${questionData}`;

        context.innerHTML = contextData != null ? `<div class="bd p:3 jc:center mt:1 context">${contextData}</div>`: null ;


        num1.innerHTML=answerData==1? `<span class="pb:2 fw:bold color:accent-4 answer">①${num1Data}</span>` :`<span>①${num1Data}</span>`;
        num2.innerHTML=answerData==2? `<span class="pb:2 fw:bold color:accent-4 answer">②${num2Data}</span>` :`<span>②${num2Data}</span>`;
        num3.innerHTML=answerData==3? `<span class="pb:2 fw:bold color:accent-4 answer">③${num3Data}</span>` :`<span>③${num3Data}</span>`;
        num4.innerHTML=answerData==4? `<span class="pb:2 fw:bold color:accent-4 answer">④${num4Data}</span>` :`<span>④${num4Data}</span>`;

    //     let modalHTML=


    //     ` <section class="n-modal detail-modal" tabindex="-1">
    //     <h1 class="d:none">문제 디테일 모달</h1>
    //     <div class="p:2">
    //         <span class="pb:3 fw:bold pb:7">${question}</span><br>
    //         <span>①</span><span class="pb:2 fw:bold">${num1}</span><br>
    //         <span>②</span><span class="pb:2 fw:bold">${num2}</span><br>
    //         <span>③</span><span class="pb:2 fw:bold">${num3}</span><br>
    //         <span>④</span><span class="pb:2 fw:bold">${num4}</span><br>
    //         <span class="pb:2 fw:bold color:accent-4">답</span>
    //     </div>
    //     <div><button type="button" class="n-btn w:5 close-btn">닫기</button>
    //     </div>
    // </section>`;

    // document.body.insertAdjacentHTML("beforeend",modalHTML);

    
    
})


}


closeButton.addEventListener("click",()=>{
    // const modal = closeButton.closest(".detail-modal");
    // modal.style.display="none";
    detailModal.classList.add("d:none");


})

let quizLists = document.querySelectorAll("div.report-box");

let detailModal = document.querySelector("#detail-modal");
let closeButton = document.querySelector("#close-btn");

let question = detailModal.querySelector(".question");
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
        let num1Data= e.target.dataset.num1;
        let num2Data= e.target.dataset.num2;
        let num3Data= e.target.dataset.num3;
        let num4Data= e.target.dataset.num4;
        // console.log(quiz);
        detailModal.classList.remove("d:none");
        question.innerHTML=questionData;
        num1.innerHTML=num1Data;
        num2.innerHTML=num2Data;
        num3.innerHTML=num3Data;
        num4.innerHTML=num4Data;

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

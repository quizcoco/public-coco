/* study search index====================================== */

let randQuizBtn = document.getElementById("rand-quiz");
let randModal = document.getElementById("r-modal");

// 오늘올라온문제 디테일 모달
randQuizBtn.addEventListener("click", () => {
    randModal.classList.remove('d:none');
});

// 모달 닫기 버튼 처리
let confirmBtn = document.getElementById('conf-btn');

confirmBtn.addEventListener('click', () => {
    randModal.classList.add('d:none'); 
});

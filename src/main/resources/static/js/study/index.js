let detailButton = document.getElementById("dtail-quiz");
let modal = document.getElementById("d-modal");

// 오늘올라온문제 디테일 모달
detailButton.addEventListener("click", () => {
  modal.classList.remove('d:none');
});

// 모달 닫기 버튼 처리
let confirmButton = document.getElementById('confirm-btn');

confirmButton.addEventListener('click', () => {
  modal.classList.add('d:none'); 
});

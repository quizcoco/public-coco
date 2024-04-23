/* TODO 모달 문제클릭했을시에 나오는 디테일*/

let detailMenu = document.querySelector("#detail-menu");
// alert("ctrlMenu") // 페이지 들어갔을때 뜨는지 확인
let quizlBtn = detailMenu.querySelectorAll(".quiz-btn button");


/* 모달 ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ */

/* 문제를 선택하세요 */
const closeBtn = document.getElementById('close-btn');
const modal = document.getElementById('warning-modal');
const cancelBtn = document.getElementById('cancel-btn');
const confirmBtn = document.getElementById('confirm-btn');
const deleteModal = document.getElementById('delete-modal');

// 체크박스 선택 여부를 추적하는 변수
let anyCheckboxChecked = false;

for (let btn of ctrlBtn) {
  if (btn.classList.contains("icon:trash")) {
    btn.addEventListener('click', function () {
      // 체크박스가 선택되었는지 확인
      anyCheckboxChecked = false;
      for (let checkbox of checkboxes) {
        if (checkbox.checked) {
          anyCheckboxChecked = true;
          break;
        }
      }

      // 체크박스가 선택되지 않은 경우에만 modal 표시
      if (!anyCheckboxChecked) {
        modal.classList.remove('d:none');
      } else {
        modal.classList.add('d:none');
      }

      // 체크박스가 선택된 경우에만 delete-modal 표시
      if (anyCheckboxChecked) {
        deleteModal.classList.remove('d:none');
      } else {
        deleteModal.classList.add('d:none');
      }
    });
  }
}

closeBtn.addEventListener('click', function () {
  modal.classList.add('d:none');
});

cancelBtn.addEventListener('click', function () {
  deleteModal.classList.add('d:none');
});

confirmBtn.addEventListener('click', function () {
  deleteModal.classList.add('d:none');

  // 실제 퀴즈 삭제 로직 구현 부분 (서버와 통신 등)
});

window.addEventListener("load",()=>{

    const initSubmit = section.querySelector("input[value='초기화']");

});
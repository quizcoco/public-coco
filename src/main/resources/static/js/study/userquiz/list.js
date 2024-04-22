let ctrlMenu = document.querySelector("#ctrl-menu");
// alert("ctrlMenu") // 페이지 들어갔을때 뜨는지 확인
let ctrlBtn = ctrlMenu.querySelectorAll(".ctrl-btn button");

let checkAll = ctrlMenu.querySelector("ul input[type=checkbox]");
let checkboxes = document.getElementsByName('checkbox');

/* 체크박스 ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ */
checkAll.addEventListener("click", () => {
  // Update individual checkboxes based on the "checkAll" state
  checkboxes.forEach((checkbox) => {
    checkbox.checked = checkAll.checked;
  });
});

// Track the number of checked checkboxes (excluding "checkAll")
let checkedCount = 0;

checkboxes.forEach((checkbox) => {
  checkbox.addEventListener("click", () => {
    if (checkbox.checked) {
      checkedCount++; // Increment if checked
    } else {
      checkedCount--; // Decrement if unchecked
    }

    // Uncheck "checkAll" if any checkbox is deselected
    if (checkedCount !== checkboxes.length) {
      checkAll.checked = false;
    }
  });
});

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

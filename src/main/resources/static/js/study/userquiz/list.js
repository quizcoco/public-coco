let ctrlMenu = document.querySelector("#ctrl-menu");
// alert("ctrlMenu") // 페이지 들어갔을때 뜨는지 확인
let ctrlBtn = ctrlMenu.querySelectorAll(".ctrl-btn button");

let checkAll = ctrlMenu.querySelector("ul input[type=checkbox]");
let checkboxes = document.getElementsByName('checkbox');
let form = document.querySelector("form[action='del']");
let delID = form.querySelector("input[name='id']");
let delCate = form.querySelector("input[name='cate']");
let delItems = form.querySelector("input[name='items']");

let pageMove = document.querySelector("#page-move");
let pageWant = pageMove.querySelector("input")  
let pageGo = pageMove.querySelector ("a")


let selectNum = document.querySelector("select[name='s']");
let numOption = selectNum.querySelectorAll("option");
let selectNumForm= document.querySelector("form[action='list']");
let oldInput = selectNumForm.querySelector("input");


/* 체크박스 ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ */
checkAll.addEventListener("click", () => {
  // Update individual checkboxes based on the "checkAll" state
  checkboxes.forEach((checkbox) => {
    console.log(checkbox.value)
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
});

    let items = [];
    
    confirmBtn.addEventListener('click', function (e) {
      e.preventDefault();
      
      checkboxes.forEach((checkbox) => {

          if(checkbox.checked){

              let item = {
                  id: checkbox.value,
                  cate: checkbox.dataset.cate
              };

              items.push(item);
              delItems.value = JSON.stringify(items);

            // delID.value=checkbox.value;
            // delCate.value=checkbox.dataset.cate;

            console.log(checkbox.dataset.cate);
                        
          
            form.submit();
          }
      })
    })


/* 원하는 페이지 이동 ================================================ */

// let url = window.location.href;
// let params = url.split("?")[1];
// let paramsArray = params.split("&");
// let paramsObject = {};
let url = window.location.href;
let paramsArray, paramsObject = {};

// URL에 쿼리 문자열이 있는지 확인
if (url.includes("?")) {
    let params = url.split("?")[1];
    paramsArray = params.split("&");

    // 쿼리 문자열을 객체로 변환
    paramsArray.forEach(param => {
        let [key, value] = param.split("=");
        paramsObject[key] = value;
    });
    
    paramsArray.forEach(function(param) {
      let keyValue = param.split("=");
      let key = keyValue[0];
      let value = keyValue[1];
      paramsObject[key] = value;
    });
  }

let newold = paramsObject["newold"] ||0;
let s = paramsObject["s"]||5;
let p = paramsObject["p"]||1;


pageGo.addEventListener("click", ()=>{

  pageGo.href=`list?p=${pageWant.value||p}&s=${s}&newold=${newold}`;
})


//==============몇개씩==================================

selectNum.addEventListener("change",(e)=>{
  e.preventDefault(); 
if(newold==1){

  let hiddenInput= document.createElement("input");
  hiddenInput.type="hidden";
  hiddenInput.name="newold";
  hiddenInput.value=1;
  selectNumForm.append(hiddenInput);

}

  selectNumForm.submit();

})
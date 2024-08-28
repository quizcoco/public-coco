// let regForm = this.document.querySelector("#reg-form");
// let previewPanel = regForm.querySelector(".preview-panel");
let imgContainer = previewPanel.querySelectorAll(".img-container");
var existingImgInput = document.querySelector("input[name='existing-img']");
// var existingImgInput = document.querySelector("input[name='img-file']");

imgContainer.forEach((imgContainer)=>{ //각각의 컨테이너의 이미지의 x버튼 먹이기
    
    
    let removeBtn = imgContainer.querySelector(".remove-btn");
    // let existingImgInput = imgContainer.querySelector("input[name='existing-img']");

    removeBtn.onclick = function (e) {

        if(e.target.tagName!='SPAN')
            return;

        previewPanel.removeChild(imgContainer); // 이미지 삭제


        if(e.target.dataset.url == existingImgInput.value)
            existingImgInput.value = ''; //낱개삭제 가능하게
        
    }
    
})
function InputFileList(input){
    this.input = input;
}

InputFileList.prototype={
    add:function(file){

        var dt = new DataTransfer();
        var files = this.input.files;

        for(var f of files)
            dt.items.add(f);
        dt.items.add(file);

        this.input.files = dt.files;

    }
}


function readFile(file,previewPanel){

    if(file.type.indexOf("image/")!=0){
        alert ("이미지만 업로드할 수 있습니다.");
        return;
    }

    if(file.size > 10*1024*1024) {
        alert ("이미지가 용량(10MB)을 초과했습니다.");
        return;
    }
    

   var reader = new FileReader();
   reader.onload =function(e){

    var imgContainer = document.createElement("div"); // 이미지와 X를 감싸는 컨테이너
    imgContainer.classList.add("img-container");

    var img = document.createElement("img");
    img.src = e.target.result;

    var removeBtn = document.createElement("span"); // X표시
    removeBtn.textContent = "X";
    removeBtn.classList.add("remove-btn");

    removeBtn.onclick = function () {
        previewPanel.removeChild(imgContainer); // 이미지 삭제
    }

    // previewPanel.append(img);
    imgContainer.appendChild(img);
    imgContainer.appendChild(removeBtn);
    previewPanel.appendChild(imgContainer);

    setTimeout(()=>{
        img.classList.add("slide-in");      // 이미지 회전 효과
    },10);
   }   
   reader.readAsDataURL(file);


}

var regForm = this.document.querySelector("#reg-form");
var imgInput = regForm.querySelector(".img-input");
var previewPanel = regForm.querySelector(".preview-panel");
var imgLabel = regForm.querySelector(".img-label");

imgLabel.ondragenter = function(e){

    console.log("들어왔다");
}
imgLabel.ondragleave = function(e){
    imgLabel.classList.remove("valid");
    imgLabel.classList.remove("invalid");


    console.log("나갔다");
}
imgLabel.ondragover=function(e){
    e.preventDefault();
    e.stopPropagation();

    var valid = e.dataTransfer && e.dataTransfer.types && e.dataTransfer.types.indexOf("Files") >= 0;

    if(valid) 
    imgLabel.classList.add("valid");
    else
    imgLabel.classList.add("invalid");


    console.log("위에있다");
}

imgLabel.ondrop=function(e){
    e.preventDefault();
    e.stopPropagation();

    console.log("놓았다");


    var files = e.dataTransfer.files;
    var file = files[0];

    new InputFileList(imgInput).add(file);

    readFile(file,previewPanel);

}

imgInput.oninput = function(e){

    // var file = imgInput.files[0];


    var images = imgInput.files.length;
        for (var i = 0; i < images; i++) {
            var file = imgInput.files[i];

    readFile(file,previewPanel);
        }
}
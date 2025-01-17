let contentArea = this.document.querySelector("div[name='contentData']");
// let img = contentArea.querySelector("img");
let images = contentArea.querySelectorAll("img");
let form = this.document.querySelector("form");
let hiddenInput = this.document.querySelector("input[name='content']");


form.onsubmit = function(){ //본문의 html를 서버로 전송
    // inputBox.srcToName();
    // hiddenInput.value = contentArea.innerHTML;
    
    // 여기에서 서버로 전송하기 전에 모든 이미지의 src 속성을 서버 URL로 업데이트합니다.
    // const images = contentArea.querySelectorAll("img");
    // images.forEach(image => {
    //     const fileName = image.getAttribute('data-filename');
    //     // 이미지를 서버로 업로드한 후, img 태그의 src 속성을 해당 이미지의 URL로 변경해야 합니다.
    //     const serverUrl = "/img/board/" + fileName;
    //     image.setAttribute('src', serverUrl);
    // });

    hiddenInput.value = contentArea.innerHTML; // 업데이트된 HTML을 다시 설정


}


function InputFileList(input){
    this.input = input;
    this.saved = { files: new DataTransfer().files };  // this.saved 초기화
    this.original = { files: new DataTransfer().files }; //input을 통한 순수 모든 파일
}

InputFileList.prototype={
    add:function(file){

        var dt = new DataTransfer();
        var files = this.input.files;

        for(var f of files)
            dt.items.add(f);
        dt.items.add(file);

        this.input.files = dt.files;

    },
    inputAdd:function(file){
        var dt = new DataTransfer();
        // var files = this.input.files;
        var files = this.saved.files;
        
        for(var f of files)
            dt.items.add(f);
        dt.items.add(file);

        this.input.files = dt.files;
        this.saved.files = dt.files;
        this.original.files = dt.files;
        console.log(this.input.files)


    },
    paste:async function(e){
        const dt = new DataTransfer();
        let files = this.input.files;
        for(var f of files)
            dt.items.add(f);

        for (let item of e.clipboardData.items) {
            if (item.type === "text/html") {
                const htmlContent = await new Promise((resolve) => {
                    item.getAsString((htmlContent) => {
                        resolve(htmlContent); // getAsString이 완료될 때까지 기다림
                    });
                });


                    
                    const parser = new DOMParser();
                    const doc = parser.parseFromString(htmlContent, 'text/html'); // htmlContent를 HTML로 파싱
                    const imgTags = doc.querySelectorAll('img');

                    imgTags.forEach((imgTags)=>{
                        const copiedFile = imgTags.getAttribute('data-filename')
                    
                        let filelists = this.original.files;
                            for(const file of filelists){
                                if(copiedFile== file.name)
                                    dt.items.add(file);
                            }
                    })
            }
        }
        this.input.files = dt.files;

        const images = Array.from(contentArea.querySelectorAll('img'));
        this.swapFiles(images);

    },
    del:function(delFile){
        let dt = new DataTransfer();
        let files = this.input.files;


        const fileName = delFile.getAttribute('data-filename');

        for(let f of files){
            if(f.name !== fileName)
            dt.items.add(f);
        }
        this.input.files = dt.files;
        this.saved.files = dt.files;

        console.log(this.input.files)

    },
    swapFiles:function(children){

        if(this.input.files.length < children.length) //잘라내기 후 붙여넣기 한 경우
            this.reArrange();

        if(this.input.files.length != children.length) //단순 업로드일 경우
            return;


        const dt = new DataTransfer();
        // const imgs = contentArea.getElementsByClassName("img-container"); //이미지 컨테이너들

        console.log(this.input.files)
        console.log(contentArea)
        // console.log(children)
        // console.log(images)
        for (const image of children) {
            // const img = image.querySelector("img");
            const fileName = image.getAttribute('data-filename'); // data-filename에서 파일명 가져오기

            const file = Array.from(this.input.files).find(f => f.name === fileName);

            if (file) {
                dt.items.add(file);
                
            }
        }

        this.input.files = dt.files;
        this.saved.files = dt.files;

        console.log(this.input.files)

    },
    reArrange:function(){
        //최종 전송하기전에
        let dt = new DataTransfer();
        let files = this.original.files;

        for(const file of files){
            Array.from(contentArea.querySelectorAll('img')).forEach((f)=>{
                const displayed = f.getAttribute('data-filename');
    
                if(file.name == displayed)
                    dt.items.add(file);
            });
        }
        this.input.files = dt.files;
        console.log(this.input.files)
    },
    srcToName:function(){
        let files = this.input.files;
        for(const file of files){
            file.src = file.name;

        }
        this.input.files = files;
    }
}

let currentDraggedElement = null;

function readFile(file,contentArea){

    if(file.type.indexOf("image/")!=0){
        alert ("이미지만 업로드할 수 있습니다.");
        return;
    }

    if(file.size > 10*1024*1024) {
        alert ("이미지가 용량(10MB)을 초과했습니다.");
        return;
    }
    

    // var img = document.createElement("div"); // 이미지와 X를 감싸는 컨테이너
   var reader = new FileReader();
   reader.onload =function(e){

    // img.classList.add("img-container");
    
    var img = document.createElement("img");
    img.draggable = true;
    img.src = e.target.result;
    img.setAttribute('data-filename', file.name); // 파일명을 data-filename에 저장
    // var removeBtn = document.createElement("span"); // X표시
    // removeBtn.textContent = "X";
    // removeBtn.classList.add("remove-btn");

    // removeBtn.onclick = function () {
    //     contentArea.removeChild(img); // 이미지 삭제
    // }

    // previewPanel.append(img);
    // imgContainer.appendChild(img);
    // img.appendChild(removeBtn);
    contentArea.appendChild(img);

    // let br = document.createElement("br"); // br 태그 생성
    // contentArea.appendChild(br);  // br 태그를 이미지 아래에 추가

    
    // setTimeout(()=>{
    //     img.classList.add("slide-in");      // 이미지 회전 효과
    // },10);
    
    
    //==========================드래그&드롭으로 순서변경 =====================================
    img.addEventListener("dragstart", function (e) {
        console.log("이미지 드래그시작!!");

        currentDraggedElement = img;
    });

    img.addEventListener("dragover", function (e) {
        e.preventDefault();
    });

    img.addEventListener("drop", function (e) {
        e.preventDefault();
        console.log("떨굼!!");

        if (currentDraggedElement !== img) {
            console.log("여기들어왓나!!");

const children = Array.from(contentArea.children);
const currentIndex = children.indexOf(currentDraggedElement);
const droppedIndex = children.indexOf(img);

            if (currentIndex < droppedIndex) {
                contentArea.insertBefore(currentDraggedElement, img.nextSibling);
                console.log("된다!!");
                const children = Array.from(contentArea.children);
                inputBox.swapFiles(children);

            } else {
                contentArea.insertBefore(currentDraggedElement, img);
                console.log("된다!!");
                const children = Array.from(contentArea.children);
                inputBox.swapFiles(children);
            }
            
            // inputBox.swapFiles(children);
        }
    });

    
       }   
       reader.readAsDataURL(file); // 이미지를 Base64로 인코딩하여 미리보기로 변환

}

var regForm = this.document.querySelector("#reg-form");
var imgInput = regForm.querySelector(".img-input");
var previewPanel = regForm.querySelector(".preview-panel");
var imgLabel = regForm.querySelector(".img-label");

//========================== 드래그&드롭으로 업로드 ===========================
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

    if(files.length>3){
        console.warn("이미지는 최대 3장만 허용됩니다.");
        return;
        //또 추가할경우 막기
    }
    for(var file of files){

        // var file = files[0];
        
        new InputFileList(imgInput).add(file);
        
        readFile(file,contentArea);
    }

}

let inputBox = new InputFileList(imgInput);
imgInput.oninput = function(e){

    // 현재 input에 있는 파일들 복사
    // let currentFiles = imgInput.files;
    
    let files = e.target.files;
    if(files.length>3){
        console.warn("이미지는 최대 3장만 허용됩니다.");
        return;
    }
    
    for(var file of files){
        
        inputBox.inputAdd(file);

        readFile(file,contentArea);
    }
}


//================사진 복붙해서 옮길때==========================
const observer = new MutationObserver((mutationsList) => {
    for (let mutation of mutationsList) {
        if (mutation.type === 'childList') {

            //==========삭제했을 경우===========
            if(!hasAddedNodes(mutationsList)) //추가된 노드 없을때. 추가된 노드있으면 드래그로 위치바꾼경우임
            mutation.removedNodes.forEach(node => {
                if (node.tagName === 'IMG') {
                    // if(!document.body.contains(node))
                        inputBox.del(node);
                    return;
                }
            });

            //========순서바꾸는 경우===========
            // 이미지들만 추출
            const images = Array.from(contentArea.querySelectorAll('img'));
            console.log(images);

            // 기존 파일 순서에 맞춰 다시 정렬
            inputBox.swapFiles(images);
        }
    }
});

function hasAddedNodes(mutationsList){

    for (let mutation of mutationsList) {
        if (mutation.addedNodes.length != 0) {
            return true; // 추가된 노드가 있으면 true를 반환
        }
    }
    return false; // 추가된 노드가 없으면 false를 반환

}

observer.observe(contentArea, { childList: true, subtree: true });

// =========자르고 붙여넣기 ==========
    contentArea.addEventListener('paste',(e)=>
        {inputBox.paste(e);

        }
);
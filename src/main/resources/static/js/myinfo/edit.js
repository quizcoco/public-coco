/* 드로그 드롭으로 파일 업로드 */ 
function InputFileList(input) {
    this.input = input;
}
InputFileList.prototype = {
    add:function(file) {
        let dt = new DataTransfer(); 
        
        //프로필 이미지이므로 기존 파일 제거하고 새로운 파일 추가
        dt.items.add(file);

        this.input.files = dt.files;
    }
};

    /* 이미지 파일 형식 메세지*/ 
window.addEventListener("load", ()=>{
    const regForm = this.document.getElementById("reg-form");
    const imgInput = regForm.querySelector(".profile-img");
    const previewPanel = regForm.querySelector(".preview-panel");
    const imgLabel = regForm.querySelector(".img-label");

     // 현재 프로필 이미지 URL 
     const currentImgUrl = previewPanel.style.backgroundImage.slice(5, -2).replace(/"/g, '');

    imgLabel.ondragover = function(e) {
        e.stopPropagation();
        e.preventDefault();

        let valid = e.dataTransfer &&
                    e.dataTransfer.types &&
                    e.dataTransfer.types.indexOf("Files") >= 0;

        if (valid) {
            imgLabel.classList.add("valid");
        } else {
            imgLabel.classList.add("invalid");
        }
    };

    imgLabel.ondragleave = function(e) {
        imgLabel.classList.remove("valid");
        imgLabel.classList.remove("invalid");
    };

    imgLabel.ondrop = function(e) {
        e.stopPropagation();
        e.preventDefault();

        let files = e.dataTransfer.files;
        let file = files[0];

        if (file.type.indexOf("image/") != 0) {
            alert("이미지만 업로드 해주세요.");
            return;
        }

        if (file.size > 1024 * 1024) {
            alert("이미지의 크기는 1MB 이하만 업로드 가능합니다.");
            return;
        }

        new InputFileList(imgInput).add(file);
        updatePreview(file);
    };

    imgInput.oninput = function(e) {
        let file = imgInput.files[0];

        if (file.type.indexOf("image/") != 0) {
            alert("이미지만 업로드 해주세요.");
            return;
        }

        if (file.size > 1024 * 1024) {
            alert("이미지의 크기는 1MB 이하만 업로드 가능합니다.");
            return;
        }

        updatePreview(file);
    };

    function updatePreview(file) {
        let reader = new FileReader();
        reader.onload = function(e) {
            let img = document.createElement("img");
            img.src = e.target.result;

            // 기존 background-image 속성 제거
            previewPanel.style.backgroundImage = 'none';

            // 기존 이미지 삭제
            previewPanel.innerHTML = '';

             // 닫기 버튼 추가
            const removeBtn = document.createElement("button");
            removeBtn.innerHTML = "&times;";
            removeBtn.classList.add("remove-btn");
            removeBtn.type = "button";

            removeBtn.onclick = function(e) {
                e.stopPropagation(); // 이벤트 전파 방지
                e.preventDefault(); // 기본 동작 방지

                // 기존 이미지로 복원
                previewPanel.innerHTML = '';
                previewPanel.style.backgroundImage = `url(${currentImgUrl})`;
                imgInput.value = ''; 
            };

            // 새 이미지 미리보기 추가 및 닫기 버튼 추가
            previewPanel.appendChild(img);
            previewPanel.appendChild(removeBtn);
        };

        reader.readAsDataURL(file);
    }

    function InputFileList(input) {
        this.input = input;
    }

    InputFileList.prototype = {
        add: function(file) {
            let dt = new DataTransfer();
            dt.items.add(file);
            this.input.files = dt.files;
        }
    };

    // 닉네임 & 메세지 변경

    const showNickName = regForm.querySelector(".show-nickname");
    const inputNickName = regForm.querySelector(".input-nickname");
    const nicknameCheckMessage = regForm.querySelector(".nickname-check");
    const changeNickName = regForm.querySelector(".change-nickname");
    const cancelNickName = regForm.querySelector(".cancel-nickname");

    const showMessage = regForm.querySelector(".show-message");
    const inputMessage = regForm.querySelector(".input-message");
    const messageCheckMessage = regForm.querySelector(".message-check");
    const changeMessage = regForm.querySelector(".change-message");
    const cancelMessage = regForm.querySelector(".cancel-message");


    // 닉네임 입력 시 중복 체크
    const nickNamePlace = regForm.querySelector(".ncheck-place");
    nickNamePlace.appendChild(nicknameCheckMessage);
    nicknameCheckMessage.style.display = "block";

    inputNickName.addEventListener("input", ()=> {
        const nickname = inputNickName.value;
        if(nickname.length > 1) {
            fetch(`/api/users/checkNickname?nickname=${nickname}`)
                .then(response => response.json())
                .then(exists => {
                    if(exists) {
                        nicknameCheckMessage.textContent = "이미 사용중인 닉네임입니다.";
                        nicknameCheckMessage.style.color = "red";
                    } else {
                        nicknameCheckMessage.textContent = "사용 가능한 닉네임입니다.";
                        nicknameCheckMessage.style.color = "green";
                    }
                });
        } else {
            nicknameCheckMessage.textContent = "닉네임은 2자 이상이어야 합니다.";
            nicknameCheckMessage.style.color = "red";
        }
    
    });

    // 메세지 입력
    const messagePlace = regForm.querySelector(".mcheck-place");
    messagePlace.appendChild(messageCheckMessage);
    messageCheckMessage.style.display = "block";

    inputMessage.addEventListener("input", ()=> {
        const message = inputMessage.value;
        if(message.length <= 1) {
            messageCheckMessage.textContent = "메세지는 2자 이상이어야 합니다.";
            messageCheckMessage.style.color = "red";
        } else {
            messageCheckMessage.textContent = "사용 가능한 메세지입니다.";
            messageCheckMessage.style.color = "green";
        }
    });

    // 업데이트 요청 보내기
    function sendUpdateRequest(field, value) {
        fetch(`/api/users/update`, {
            method: 'POST',
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({field: field, value: value})
        })
            .then(response => response.json())
            .then(result => {
                if(result.success) {
                    alert(`${field}이(가) 업데이트 되었습니다.`);
                } else {
                    alert(`업데이트에 실패했습니다: ${result.message}`);
                }
            })
            .catch(error => {
                alert("업데이트 중 오류가 발생했습니다.");
            });
    }
        // 저장 버튼 눌렀을 때
        regForm.querySelector(".save-btn").addEventListener("click", () => {
            if(nickname.length > 1 && nicknameCheckMessage.style.color === "green") {
                sendUpdateRequest("nickname", nickname);
            } 
            if (message.length > 1 && messageCheckMessage.style.color === "green") {
                sendUpdateRequest("message", message);
            }
        });
    

    // 변경 & 취소 버튼 클릭시 필드 처리
    function toggleField(showElem, inputElem, changeBtn, cancelBtn, checkMessageElem) {
        changeBtn.addEventListener("click", () => {
            showElem.classList.add("hidden");
            inputElem.classList.remove("hidden");
            changeBtn.classList.add("hidden");
            cancelBtn.classList.remove("hidden");
            checkMessageElem.classList.remove("hidden");
            inputElem.value = '';
            checkMessageElem.textContent = '';
        });

        cancelBtn.addEventListener("click", () => {
            showElem.classList.remove("hidden");
            inputElem.classList.add("hidden");
            changeBtn.classList.remove("hidden");
            cancelBtn.classList.add("hidden");
            checkMessageElem.classList.add("hidden");
            inputElem.value = '';
            checkMessageElem.textContent = '';
        });

       
    }

    toggleField(showNickName, inputNickName, changeNickName, cancelNickName, nicknameCheckMessage);
    toggleField(showMessage, inputMessage, changeMessage, cancelMessage, messageCheckMessage);


});    
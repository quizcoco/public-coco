window.addEventListener("load", ()=>{ 

    /* ========패스워드 아이콘 눌렀을 때 패스워드 보이기/숨기기========= */ 
   
       const signUp = document.querySelector("#signup");
       const eyeIcon = signUp.querySelector(".eye-icon");
       const hidePW = signUp.querySelector(".hide-pw");
       const eyePWIcon = signUp.querySelector(".eye-pwicon");
       const hideinputPW = signUp.querySelector(".hide-pwinput");
   
       eyeIcon.addEventListener("click",(e)=>{
           if(hidePW.type === "password") {
               hidePW.type = "text";
               hidePW.value = '';  
               eyeIcon.classList.remove("icon:eye_slash");
               eyeIcon.classList.add("icon:eye");
             
           } else {
               hidePW.type = "password";
               hidePW.value = '';
               eyeIcon.classList.remove("icon:eye");
               eyeIcon.classList.add("icon:eye_slash");
           }
       });
   
       eyePWIcon.addEventListener("click", (e)=>{
           if(hideinputPW.type === "password") {
               hideinputPW.type = "text";
               hideinputPW.value = '';  
               eyePWIcon.classList.remove("icon:eye_slash");
               eyePWIcon.classList.add("icon:eye");
           
           } else {
               hideinputPW.type = "password";
               hideinputPW.value = '';
               eyePWIcon.classList.remove("icon:eye");
               eyePWIcon.classList.add("icon:eye_slash");
           }
       });
   
   /*======================= 회원 가입 시 유효성 검사 ========================== */ 
           const inputId = signUp.querySelector(".input-id");
           const inputName = signUp.querySelector(".input-name");
           const inputMail = signUp.querySelector(".input-mail");
       
           // 유효성 검사 처리 함수 1. 아이디 글자수 제한
           function idLength(value) {
               return 4 <= value.length && value.length <= 12
           } 
          // 유효성 검사 처리 함수 2. 아이디 영어, 숫자만 입력
          function idNumAndEng(username) {
               return /^[A-Za-z0-9][A-Za-z0-9]*$/.test(username);
          }
          // 유효성 검사 처리 함수 3. 비밀번호 글자수 제한 & 영어, 숫자, 특수문자 하나 이상 포함
          function pwCheck(password) {
           return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,12}$/.test(password);
         } 
         // 유효성 검사 처리 함수 4. 닉네임 글자수 제한 & 한글 또는 영어 글자 하나 이상 포함 
         function nameCheck(nickname) {
               return /^[가-힣a-zA-Z]{2,10}$/.test(nickname);
         }
         // 유효성 검사 처리 함수 5. 메일 형식 @ . 하나씩 포함 & 영어, 숫자만 입력
         function mailCheck(mail) {
               return /^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(mail);
         }
   
       //아이디 유효성 검사
       inputId.addEventListener("change", (e)=>{
           if(inputId.value.length !==0) {
               if(idNumAndEng(inputId.value) === false) {
                   e.preventDefault(); 
                   alert("영어 또는 숫자만 입력해주세요.");
                   inputId.value = '';
                   inputId.focus();
               }
   
               else if (idLength(inputId.value) === false) {
                   e.preventDefault(); 
                   alert("아이디는 4 ~ 12 글자이어야 합니다.");
                   inputId.value = '';
                   inputId.focus();
               }
           };
        });
   
       //비밀번호 유효성 검사
       hidePW.addEventListener("change", (e)=>{
           if(hidePW.value.length !==0) {
               if(pwCheck(hidePW.value) === false) {
                   e.preventDefault(); 
                   alert("비밀번호는 8 ~ 12 글자이여야 하며, 영어, 숫자, 특수문자를 한 글자 이상 포함해야 합니다.");
                   hidePW.value = '';
                   hidePW.focus();
               }
           };
       });
       
       // 비밀번호 입력 값이 서로 다를 때 오류 발생
       const submitBtn = signUp.querySelector(".submit-btn");  
           
       submitBtn.addEventListener("click", (e)=>{
           if(hidePW.value !== hideinputPW.value) {
               e.preventDefault(); 
               alert("비밀번호가 일치하지 않습니다.");
               hidePW.value = '';
               hideinputPW.value = '';
               hidePW.focus();
            }
        });  
   
   
       //닉네임 유효성 검사
       inputName.addEventListener("change", (e)=> {
           if(inputName.value.length !==0) {
               if(nameCheck(inputName.value) === false) {
                   e.preventDefault(); 
                   alert("닉네임은 2 글자 이상이어야 하며, 한글 또는 영어를 한 글자 이상 포함해야 합니다.");
                   inputName.value = '';
                   inputName.focus();
               }
           }
       });
       
       // 메일 유효성 검사
       inputMail.addEventListener("change", (e)=>{
           if(inputMail.value.length !==0) {
               if(mailCheck(inputMail.value) === false) {
                   e.preventDefault(); 
                   alert("유효하지 않은 형식입니다. 이메일 형식을 입력해주세요.");
                   inputMail.value = '';
                   inputMail.focus();
               }
           }
       });
   
   //========================회원가입 시 중복체크======================================    
       
   const nameCheckBtn = signUp.querySelector(".nameCheck-btn");
   const nickCheckBtn = signUp.querySelector(".nickCheck-btn");
   const mailCheckBtn = signUp.querySelector(".mailCheck-btn");

   const userNamePlace = signUp.querySelector(".usernamecheck-place");
   const usernameCheckMessage = signUp.querySelector(".username-check");
   userNamePlace.appendChild(usernameCheckMessage);
   usernameCheckMessage.style.display = "block";

    //아이디 중복 체크
    nameCheckBtn.addEventListener("click", ()=> {
          const username = inputId.value;
          if(username.length > 1) {
              fetch(`/api/users/checkUserName?username=${username}`)
              .then(response => response.json())
              .then(exists => {
                  if(exists) {
                      usernameCheckMessage.textContent = "이미 사용중인 아이디입니다.";
                      usernameCheckMessage.style.color = "red";
                  } else {
                      usernameCheckMessage.textContent = "사용 가능한 아이디입니다.";
                      usernameCheckMessage.style.color = "green";
                  }
              });
          }
    });

    const nickNamePlace = signUp.querySelector(".mailcheck-place");
    const nicknameCheckMessage = signUp.querySelector(".nickname-check");
    nickNamePlace.appendChild(nicknameCheckMessage);
    nicknameCheckMessage.style.display = "block";

    //닉네임 중복 체크
    nickCheckBtn.addEventListener("click", ()=> {
      const nickname = inputName.value;
      if(nickname.length > 1) {
          fetch(`/api/users/checkNickname?nickname=${nickname}`)
          .then(response => response.json())
          .then(exists => {
              if(exists) {
                  nicknameCheckMessage.textContent = "이미 사용중인 아이디입니다.";
                  nicknameCheckMessage.style.color = "red";
              } else {
                  nicknameCheckMessage.textContent = "사용 가능한 아이디입니다.";
                  nicknameCheckMessage.style.color = "green";
              }
            });
          }
      });

      const mailPlace = signUp.querySelector(".mailcheck-place");
      const mailCheckMessage = signUp.querySelector(".mail-check");
      mailPlace.appendChild(mailCheckMessage);
      mailCheckMessage.style.display = "block";

    //메일 중복 체크
    mailCheckBtn.addEventListener("click", ()=> {
      const mail = inputMail.value;
      if(mail.length > 1) {
          fetch(`/api/users/checkMail?mail=${mail}`)
          .then(response => response.json())
          .then(exists => {
              if(exists) {
                  mailCheckMessage.textContent = "이미 사용중인 아이디입니다.";
                  mailCheckMessage.style.color = "red";
              } else {
                  mailCheckMessage.textContent = "사용 가능한 아이디입니다.";
                  mailCheckMessage.style.color = "green";
              }
          });
      }
    });    
   
});
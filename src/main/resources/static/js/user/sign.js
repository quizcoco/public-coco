window.addEventListener("load", ()=>{ 
 /* 패스워드 아이콘 눌렀을 때 패스워드 보이기/숨기기 */ 

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

        /* 회원 가입 시 유효성 검사 */ 
    
    const inputId = signUp.querySelecto(".input-id");
    const inputName = signUp.querySelector(".input-name");
    const inputMail = signUp.querySelector(".input-mail");

    // 유효성 검사 처리 함수
    

    //아이디 유효성 검사
    // inputId.addEventListener("keyup", (e)=>{

    // });
});
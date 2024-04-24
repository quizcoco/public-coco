window.addEventListener("load", ()=>{

    /* 패스워드 아이콘 눌렀을 때 패스워드 보이기/숨기기 */ 

    const inputPW = document.querySelector("#input-pw");
    const eyeIcon = inputPW.querySelector(".eye-icon");
    const hidePW = inputPW.querySelector(".hide-pw");

    eyeIcon.addEventListener("click", ()=>{
        if(hidePW.type === "password") {
            hidePW.type = "text";
            hidePW.value = '';   // 아이콘 바뀌기 전 입력했던 비밀번호 지움
            eyeIcon.classList.remove("icon:eye_slash");
            eyeIcon.classList.add("icon:eye");
          
        } else {
            hidePW.type = "password";
            hidePW.value = '';
            eyeIcon.classList.remove("icon:eye");
            eyeIcon.classList.add("icon:eye_slash");
        }
    });
   
    /* 로그인, 아이디 찾기, 비번 찾기 페이지 전환*/ 

    // 전환될 화면
    const loginSection = document.querySelector("#login-section");
    const idSection = document.querySelector("#id-section");
    const pwSection = document.querySelector("#pw-section");
    
    // 화면 전환 버튼
    const findBlock = document.querySelector("#find-block");
    const findId = findBlock.querySelector('[name="find-id"]');
    const findPW = findBlock.querySelector('[name="find-pw"]');

    
    // 아이디 찾기 화면으로
    findId.addEventListener("click", ()=>{

        loginSection.style.display = "none";
        idSection.style.display = "block";
        pwSection.style.display = "none";

    });
    
    // 비밀번호 찾기 화면으로
    findPW.addEventListener ("click", ()=>{
        
        loginSection.style.display = "none";
        idSection.style.display = "none";
        pwSection.style.display = "block";

        //비번찾기 화면에서 아이콘 설정
        const changePW = document.getElementById("change-pw");
        const eyePWIcon = changePW.querySelector(".eye-pwicon");
        const eyePWReIcon = changePW.querySelector(".eye-pw-reicon");
        const hideinputPW = changePW.querySelector(".hide-pwinput");
        const hideinputPWRe = changePW.querySelector(".hide-pw-reinput");    
        
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
            
            eyePWReIcon.addEventListener("click", (e)=>{
                if(hideinputPWRe.type === "password") {
                    hideinputPWRe.type = "text";
                    hideinputPWRe.value = '';  
                    eyePWReIcon.classList.remove("icon:eye_slash");
                    eyePWReIcon.classList.add("icon:eye");
                
                } else {
                    hideinputPWRe.type = "password";
                    hideinputPWRe.value = '';
                    eyePWReIcon.classList.remove("icon:eye");
                    eyePWReIcon.classList.add("icon:eye_slash");
                }
            });

        // 비밀번호 입력 값이 다를 때 오류 발생
        const submitBtn = changePW.querySelector(".submit-btn");  
        
            submitBtn.addEventListener("click", (e)=>{
                if(hideinputPW.value !== hideinputPWRe.value) {
                    e.preventDefault(); // 폼 제출 방지
                    alert("비밀번호가 일치하지 않습니다.");
                    hideinputPW.value = '';
                    hideinputPWRe.value = '';
                    hideinputPW.focus();
                }
            });
            
    });
});





        
      
       
        
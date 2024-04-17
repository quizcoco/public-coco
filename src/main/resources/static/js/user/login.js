/* 패스워드 아이콘 눌렀을 때 보이기/숨기기 */ 

    // div 영역 id
    const inputPW = this.document.getElementById("input-pw");
    // 패스워드 눈 모양 아이콘
    const hideIcon = inputPW.querySelector('[name="hide-icon"]');
    const showIcon = inputPW.querySelector('[name="show-icon"]');
    // 패스워드 입력 상태
    const hidePW = inputPW.querySelector('[name="hide-pw"]');
    const showPW = inputPW.querySelector('[name="show-pw"]');


    // 패스워드 아이콘 눌러서 눈 열림
    hideIcon.addEventListener ("click", function(){
        hideIcon.classList.add("hidden");
        hidePW.classList.add("hidden");
        showIcon.classList.remove("hidden");
        showPW.classList.remove("hidden");

        // 전환되기 전 입력했던 비밀번호 지움
        hidePW.value = '';
    });

    // 패스워드 아이콘 눌러서 눈 닫힘
    showIcon.addEventListener ("click", function(){
        showIcon.classList.add("hidden");
        showPW.classList.add("hidden");
        hideIcon.classList.remove("hidden");
        hidePW.classList.remove("hidden");

        // 전환되기 전 입력했던 비밀번호 지움
        showPW.value = '';
    });



    // /* 로그인, 아이디 찾기, 비번 찾기 페이지 전환*/ 
 
    
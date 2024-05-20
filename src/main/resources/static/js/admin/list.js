window.addEventListener('load', function (){
    //헤더 검색창
    var adminHeader = document.querySelector(".admin-hd");
    var btnDiv = adminHeader.querySelector(".search")
    var inputSearch = adminHeader.querySelector("input[name=q]");
    var btnSearch = adminHeader.querySelector("button");
    //퀴즈컨텐츠
    var quizContent = this.document.querySelector(".list-height");
    //모달
    const openButton = document.getElementById('move-btn');
    const closeButton = document.getElementById('close-btn');
    const modal = document.getElementById('modal');
    const modalBackdrop = document.getElementById('modal-backdrop');
    //체크박스
    var chkAllButton= this.document.getElementById("chk-btn");

//====================체크박스 전체 체크,해제=========================

chkAllButton.onclick= function(e){
  e.preventDefault();

  let chk1 = Array.from(document.querySelectorAll("input[type=checkbox]"));

    let totalCnt = chk1.length; //전체 버튼
    
    let checkedCnt = document.querySelectorAll('input[type=checkbox]:checked').length; //체크된 버튼
    
      if(totalCnt == checkedCnt){
        for(let i=0;i<chk1.length;i++){
          
          chk1[i].checked=false;
        }
      }
      else{
        for(let i=0;i<chk1.length;i++){
          
          chk1[i].checked=true;
        }
      }
}

// ===================검색창 펼치기==========================
    btnSearch.addEventListener("click",function(e){
        e.preventDefault();
        
        // searchIcon.classList.add("d:none");
        btnDiv.classList.remove("search-out");
        inputSearch.classList.remove("search-form-out");
        btnSearch.classList.add("icon-color:base-8");
        btnSearch.classList.remove("icon-color:base-1");
        
    });
//-----------------------검색창 다시 접기-------------------------
    document.addEventListener("click", function(e) {
        if (!btnSearch.contains(e.target) && !inputSearch.contains(e.target)) {

            // searchForm.classList.add("");
            inputSearch.classList.add("search-form-out");
            btnDiv.classList.add("search-out");
            btnSearch.classList.add("icon-color:base-1");
            btnSearch.classList.remove("icon-color:base-8");

        }
    });
    
    //=======================검색 AJAX요청========================
    btnSearch.addEventListener("click",function(e){
        e.preventDefault();
        
        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;
        
        xhr.onload = function(){ //결과
            if(q==="")//아이콘 클릭시 계속 첫페이지가 나와서 이걸 써줌
            return;
            var list = JSON.parse(this.responseText);
            bind(list);
        };
        
        var q = inputSearch.value;
        xhr.open("GET", `/api/examQuizs?q=${q}&p=1`);
        
        xhr.send();
        
    });
//=============== 바인딩과 검색어 하이라이트=============================
    // var searchTerm = inputSearch.value;

    
    function bind(list){


        quizContent.innerHTML=`<header class="list-title bg-color:main-5 h:1 ac:center jc:center">
        <h1 class="d:none">게시 타이틀</h1>
        <div class="tt-year">연도</div>
        <div class="tt-rank">직급</div>
        <div class="tt-sort">분류</div>
        </header>`;
        
        list.forEach((examQuiz) =>  {
            
            
            var sectionHTML = `<section id="eq-content" class="ad-list-grid bg-color:base-2 h:3 mt:1 ac:center">
            <h1 class="list-item ac:center"><span class="q-year" >2007</span><span class="q-rank">국가직 9급</span><span class="q-sort">문법</span></h1>
            <div class="chk-item"><input type="checkbox"></div>
            <div class="title-item box-wrap w:1/2 ln-clamp:1"><a href="detail?id=${examQuiz.id}">${examQuiz.question}</a></div>
            <div class="num12-item display:flex">
              <div>①</div>
              <div class="w:1/4 ln-clamp:1">${examQuiz.num1}</div>
              <div>②</div>
              <div class="w:1/4 ln-clamp:1">${examQuiz.num2}</div>
            </div>
            <div class="num34-item  display:flex">
              <div>③</div>
              <div class="w:1/4 ln-clamp:1">${examQuiz.num3}</div>
              <div>④</div>
              <div class="w:1/4 ln-clamp:1">${examQuiz.num4}</div>
            </div>
            </section>`;

//--------------검색어 하이라이트 부분--------------------
if(inputSearch.value!==""){

    var regex = new RegExp(inputSearch.value,'gi');
    sectionHTML = sectionHTML.replace(regex,function(match){
    return `<span class="highlight">${match}</span>`
});
}

// -------------문단을 정해진 부모엘리먼트에 삽입----------- 
quizContent.insertAdjacentHTML("beforeend",sectionHTML);

    });
}



//========================모달=================================
    openButton.addEventListener('click', function (e) {
      e.preventDefault();
      modal.classList.remove('d:none');
      modalBackdrop.classList.remove('d:none');
      modal.classList.add('modal-fade-in');
    });
  
    closeButton.addEventListener('click', function () {
      modal.classList.replace('modal-fade-in', 'modal-fade-out');
  
      setTimeout(() => {
        modal.classList.add('d:none');
        modalBackdrop.classList.add('d:none');
        modal.classList.remove('modal-fade-out');
      }, 130);
    });
  });




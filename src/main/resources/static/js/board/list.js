let selectNum = document.querySelector("select[name='s']");
let selectRecmd = document.querySelector("select[name='r']");
let selectNumForm= document.querySelector("form[action='list']");

//리스트 갯수
selectNum.addEventListener("change",(e)=>{
    e.preventDefault(); 

    selectNumForm.submit();
  
  })

  //추천 갯수
selectRecmd.addEventListener("change",(e)=>{
  e.preventDefault(); 

  selectNumForm.submit();

})
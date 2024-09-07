let selectNum = document.querySelector("select[name='s']");
let selectRecmd = document.querySelector("select[name='c']");
let selectNumForm= document.querySelector("form[action='list']");

selectNum.addEventListener("change",(e)=>{
    e.preventDefault(); 

    selectNumForm.submit();
  
  })
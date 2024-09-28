let header = this.document.querySelector("#header");
let mobileMenuIcon = header.querySelectorAll("nav.root-header-menu a");
let mobileMenus = header.querySelector("nav.menu");
let mobileOverlay = header.querySelector(".mobile-overlay");
let menuIcon = document.getElementById("m");

//====================메뉴아이콘 눌러 메뉴 여닫기================
mobileMenuIcon[2].addEventListener("click",function(e){
    e.preventDefault();
    e.stopPropagation();
    
    if(!mobileMenus.classList.contains("d:none")) {

        mobileMenus.classList.add("d:none");
        // 메뉴 외 화면 어둡게
        mobileOverlay.classList.remove("active");
        // 메뉴 아이콘 x모양으로 바뀜
        menuIcon.classList.remove("icon:x");
        menuIcon.classList.add("icon:list");
    }

    else {
        
        mobileMenus.classList.remove("d:none");
        // 화면 원래대로 밝아짐
        mobileOverlay.classList.add("active");
        // 메뉴 아이콘 리스트 모양으로 바뀜
        menuIcon.classList.remove("icon:list");
        menuIcon.classList.add("icon:x");
    }

});
// ====================메뉴 닫기=======================
document.addEventListener("click",function(e){
    
    if(mobileMenus.classList.contains("d:none"))
    return;

    if(!mobileMenus.contains(e.target)) {

        mobileMenus.classList.add("d:none");
        mobileOverlay.classList.remove("active");
        menuIcon.classList.remove("icon:x");
        menuIcon.classList.add("icon:list");
    }

    // e.preventDefault();

});

//=============화면 크기 변화 감지============
window.addEventListener("resize", ()=> {

    // 모바일에서 pc화면으로 바뀔때 메뉴가 열려 있었어도 배경 밝아지도록
    if(window.innerWidth >= 1200) {
        mobileOverlay.classList.remove("active");
    }
    
    // pc화면에서 모바일으로 바뀔때 메뉴가 열려 있었다면 배경 어두워지도록
    if(window.innerWidth < 1200 
                             && 
                            !mobileMenus.classList.contains("d:none")){
       
        mobileOverlay.classList.add("active");
    }
});
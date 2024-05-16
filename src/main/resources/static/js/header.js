let header = document.querySelector("#header");
let mobileMenuIcon = header.querySelectorAll("nav.root-header-menu a");
let mobileMenus = header.querySelector("nav.menu");
let mobileOverlay = header.querySelector(".mobile-overlay");

//====================메뉴아이콘 눌러 메뉴 여닫기================
mobileMenuIcon[2].addEventListener("click",function(e){
    e.preventDefault();
    e.stopPropagation();
    
    if(!mobileMenus.classList.contains("d:none")) {

        mobileMenus.classList.add("d:none");
        mobileOverlay.classList.remove("active");
    }

    else {
        
        mobileMenus.classList.remove("d:none");
        mobileOverlay.classList.add("active");
    }

});
// ====================메뉴 닫기=======================
document.addEventListener("click",function(e){
    
    if(mobileMenus.classList.contains("d:none"))
    return;

    if(!mobileMenus.contains(e.target)) {

        mobileMenus.classList.add("d:none");
        mobileOverlay.classList.remove("active");
    }

    // e.preventDefault();
})

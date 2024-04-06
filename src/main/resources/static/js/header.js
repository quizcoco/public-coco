let header = document.querySelector("#header");
let mobileMenuIcon = header.querySelectorAll("nav.root-header-menu a");
let mobileMenus = header.querySelector("nav.menu");

//====================메뉴아이콘 눌러 메뉴 여닫기================
mobileMenuIcon[2].addEventListener("click",function(e){
    e.preventDefault();
    e.stopPropagation();
    
    if(!mobileMenus.classList.contains("d:none"))
        mobileMenus.classList.add("d:none");
    else
        mobileMenus.classList.remove("d:none");

});
// ====================메뉴 닫기=======================
document.addEventListener("click",function(e){
    
    if(mobileMenus.classList.contains("d:none"))
    return;

    if(!mobileMenus.contains(e.target))
    mobileMenus.classList.add("d:none");

    // e.preventDefault();
})

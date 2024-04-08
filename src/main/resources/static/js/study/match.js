let main = document.querySelector("main");

console.log(main.classList);
main.classList.add("p:0");

/*  */

let skillMenu = this.document.querySelector(".skill-menu");
let menuList = skillMenu.querySelector(".menu-list");
let bntDetail = skillMenu.querySelector(".bnt-detail");

menuList.onclick = function(e){
    
    if(e.target.tagName!='DIV')
        return;

    let state = e.target.dataset.btn;
    
    switch (state) {
        case 'base' :
            break;
        case 'attack' :
            bntDetail.innerHTML ="";

            let attackHtml=
                        `<ul class="d:flex gap:4 mt:1 jc:center">
                            <li><button class="btn-base n-btn:filled-4 ac:center txt-al:center">발차기</button></li>
                            <li><button class="btn-base n-btn:filled-4 ac:center txt-al:center">파이어볼</button></li>
                            <li><button class="btn-base n-btn:filled-4 ac:center txt-al:center w:2">공격 디버프</button></li>
                        </ul>`;
            
            bntDetail.insertAdjacentHTML("beforeend",attackHtml);

           break;
           
        case 'help' :
            bntDetail.innerHTML ="";
            let helpHtml=
            `<ul class="d:flex gap:4 mt:1 jc:center">
                <li><button class="btn-base n-btn:filled-4 ac:center txt-al:center">회복</button></li>
                <il><button class="btn-base n-btn:filled-4 ac:center txt-al:center">뭐뭐</button></il>
            </ul>`;

            bntDetail.insertAdjacentHTML("beforeend",helpHtml);

            break;
            
        case 'run' :
            break;
    }
    
}
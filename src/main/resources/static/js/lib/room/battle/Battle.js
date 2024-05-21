class Battle{
    constructor(){

    }
    createElement(){
        this.element = document.createElement("div");
        this.element.classList.add("battle");
        this.element.innerHTML=(`
        <div class="Battle-coco">
            <img src="${'/image/room/cat-idle.png'}" alt="coco"/>
        </div>
        <div class="Battle-bug">
            <img src="${'/image/room/bug.png'}" alt="bug"/>
        </div>
        `)

    }
    init(container){
        this.createElement();
        container.appendChild(this.element);

    }


}
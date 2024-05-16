class TextMessage{
    constructor({text,onComplete}){
        this.text=text;
        this.onComplete=onComplete;
        this.element=null;
    }
    createElement(){
        this.element=document.createElement("div");
        this.element.classList.add("text-message");

        this.element.innerHTML=(`
            <p class="text-message-p">${this.text}</p>
            <button class="text-message-btn deco icon:skip deco-pos:right deco-size:1 deco-ml:0 icon-color:main-4">Next</button>

        `)

        this.element.querySelector("button").addEventListener("click",()=>{
            this.done();
        })

        this.actionListener = new KeyPressListener("Enter",()=>{
            this.actionListener.unbind();
            this.done();
        })
    }

    selectAvatar(){
        this.element=document.createElement("section");
        this.element.classList.add("n-modal");
        this.element.classList.add("p:8");
        this.element.classList.add("w:8");

        this.element.innerHTML=(`
        <h1 class="n-font:h3  font-weight:3">${this.text}</h1>
        <div class="mt:8 text-a:center"><div><label><input type="radio" name="avatar">여자</label><label><input type="radio" name="avatar">남자</label></div></div>
        <div class="d:flex fl-direction:column gap:2 mt:10">
    <button type="button" class="n-btn n-btn-size:3">선택</button>
  </div>

    `)
        this.element.querySelector("button").addEventListener("click",()=>{
            this.done();
        })

    }
    done(){
        this.element.remove();
        this.onComplete();
    }


    init(container){
        // if(this.map.gameObjects["man1"].avatar!==null){
        //     this.selectAvatar();
        //     return;
        // }
        this.createElement();
        this.selectAvatar();

        container.appendChild(this.element);
    }

}
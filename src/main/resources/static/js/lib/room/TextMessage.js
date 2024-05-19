class TextMessage{
    constructor({text,onComplete,dynamicText, context}){
        this.text=text;
        this.dynamicText = dynamicText;
        this.context = context;
        this.onComplete=onComplete;
        this.element=null;
        // this.gender=null;
        // this.cocoName=null;
    }
    createElement(){
        this.element=document.createElement("div");
        this.element.classList.add("text-message");

        let displayText = this.text;
        if (typeof this.dynamicText === 'function') {
            displayText = this.dynamicText(this.context);
        }

        this.element.innerHTML=(`
            <p class="text-message-p">${displayText}</p>
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

    done(){
        this.element.remove();
        this.onComplete();
    }


    init(container){
     
        this.createElement();
        container.appendChild(this.element);
    }


}
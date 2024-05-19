class InsertBox{
    constructor({text,onComplete}){
        this.text=text;
        this.onComplete=onComplete;
        this.element=null;
        // this.gender=null;
        // this.cocoName=null;
    }
    createElement(){
        this.element=document.createElement("section");
        this.element.classList.add("select-modal");
        this.element.classList.add("n-modal");
        this.element.classList.add("p:8");
        this.element.classList.add("w:8");

        this.element.innerHTML=(`
        <h1 class="n-font:h3  font-weight:3">${this.text}</h1>
        <div class="select-avatar" class="mt:8 text-a:center">
            <input name="coco" class="coco-name" placeholder="8자리 이내로 입력해 주세요.">
        </div>
        <div class="d:flex fl-direction:column gap:2">
    <button type="button" class="n-btn n-btn-size:3">입력 완료</button>
  </div>

    `)

        this.element.querySelector("button").addEventListener("click",async()=>{

            const cocoName= this.element.querySelector("input[name='coco']").value;

            if (cocoName.trim() === "") {
                console.error('이름을 입력하지 않았습니다');
                return;
            }

            //TODO 이름은 8자 안으로 검사 

                console.log(cocoName);
            const response = await fetch(`/api/coco/edit`, {
            method: 'PUT', // or 'PUT' based on your API design
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: cocoName })
        });

            this.done(cocoName);
        })

        this.actionListener = new KeyPressListener("Enter",()=>{
            this.actionListener.unbind();
            this.done(cocoName);
        })
    }

    done(cocoName){
        this.element.remove();
        this.onComplete(cocoName);
    }


    init(container){
        // if (!this.isAvatarSelected()) {
        //     this.selectAvatar();
        // } else {
        //     this.createElement();
        // }
        // container.appendChild(this.element);
     
        this.createElement();
        container.appendChild(this.element);
        this.element.querySelector("input").focus();
    }


    // async isAvatarSelected() {



    //     await fetch(`/api/avatar/detail`)
    //     .then(resp=>{
    //         return resp.json();})
    //     .then(avatar=>{

    //         this.gender = avatar.gender;
    //     })

    //     if(this.gender==null)
    //         return false;
    //     else true;
    // }

}
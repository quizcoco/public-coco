class SelectAvatar{
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
            <label><input type="radio" name="avatar" class="girl-avatar" value="1"><img class="girl" src="/image/room/woman1.png"></label>
            <label><input type="radio" name="avatar" class="boy-avatar" value="0"><img class="boy" src="/image/room/avata.gif"></label>
        </div>
        <div class="d:flex fl-direction:column gap:2">
    <button type="button" class="n-btn n-btn-size:3">선택</button>
  </div>

    `)

    let girlInput = this.element.querySelector("input[class='girl-avatar']");
    let boyInput = this.element.querySelector("input[class='boy-avatar']");

    this.element.querySelector(".girl").addEventListener("click",()=>{
        girlInput.checked=true;
    
    })
    this.element.querySelector(".boy").addEventListener("click",()=>{
        boyInput.checked=true;
    })


        this.element.querySelector("button").addEventListener("click",async()=>{
            const genderValue= this.element.querySelector("input[name='avatar']:checked").value;

            
            if (!genderValue) {
                console.error('성별이 선택되지 않았습니다');
                return;
            }

                console.log(genderValue);
            const response = await fetch(`/api/avatar/edit`, {
            method: 'PUT', // or 'PUT' based on your API design
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ gender: genderValue })
        });

        this.done();
    });



    }
    done(){
        this.element.remove();
        this.onComplete();
    }


    init(container){

        this.createElement();
        container.appendChild(this.element);
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
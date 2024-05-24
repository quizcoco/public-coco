class OverworldEvent{
    constructor({map,event,context,user}){
        this.map = map;
        this.event = event;
        this.context=context;
        this.user=user;

    }
    stand(resolve){

        const who = this.map.gameObjects[this.event.who];
        who.startBehavior({
            map:this.map
        },{
            type:"stand",
            direction:this.event.direction, 
            time:this.event.time
        })

        const completeHandler = e=>{
            if(e.detail.whoId===this.event.who){
                document.removeEventListener("PersonStandComplete",completeHandler);
                resolve();
            }

        }
        document.addEventListener("PersonStandComplete",completeHandler)


    }
    walk(resolve){
        const who = this.map.gameObjects[this.event.who];
        who.startBehavior({
            map:this.map
        },{
            type:"walk",
            direction:this.event.direction,
            retry:true
        })

        const completeHandler = e=>{
            if(e.detail.whoId===this.event.who){
                document.removeEventListener("PersonWalkingComplete",completeHandler);
                resolve();
            }

        }
        document.addEventListener("PersonWalkingComplete",completeHandler)

    }

    textMessage(resolve){
        if(this.event.faceman1){
            const obj = this.map.gameObjects[this.event.faceman1]
            obj.direction = utils.oppositeDirection(this.map.gameObjects["man1"].direction);
        }

        let text = this.event.text;
        if (this.event.dynamicText) {
            text = this.event.dynamicText(this.context);
        }

        const message = new TextMessage({
            text:this.event.text,
            dynamicText: this.event.dynamicText,
            context: this.context,
            onComplete:()=>resolve()
        })
        message.init(document.querySelector(".game-container"));
    }

    selectAvatar(resolve){
        // if(this.map.gameObjects["man1"].avatar!==null){
        //     return;
        // }
       
        const message = new SelectAvatar({
            text:this.event.text,
            onComplete:()=>resolve()
        })
        message.init(document.querySelector(".game-container"));
    }

    insertBox(resolve){

        const message = new InsertBox({
            text:this.event.text,
            onComplete:(inputValue) => {
                this.context.inputValue = inputValue; // 입력된 값을 context에 저장
                // this.user.point +=100;
                resolve();
            }
        })
            message.init(document.querySelector(".game-container"));
    }

    changeMap(resolve){
        this.map.overworld.startMap(window.OverworldMaps[this.event.map]);
        resolve();
    }

    // battle(resolve){
      
    //     if (typeof Battle !== "undefined") {
    //         const battle = new Battle({
    //             onComplete: () => {
    //                 resolve();
    //             }
    //         });
    //         battle.init(document.querySelector(".game-container"));
    //     } else {
    //         console.warn("Battle is not defined, skipping battle.");
    //         resolve();
    //     }
    // }

    init(){
        return new Promise(resolve=>{
            this[this.event.type](resolve)
        })
    }

}
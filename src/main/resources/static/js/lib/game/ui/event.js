class Event{

    constructor({map,event}){
        this.map=map;
        this.event=event;

    }

    battle(resolve){
        const battle = new Battle({
            onComplete:()=>{
                resolve();
            }
        })
        battle.init(document.querySelector(".game-div"));
    }
    init(){
        return new Promise(resolve=>{
            this[this.event.type](resolve)
        })


    }
}
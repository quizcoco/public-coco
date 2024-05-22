class Battle{
    constructor(){
        this.combatants={
            "player1":new Combatant({
                ...Skills.p01,
                team:"player",
                // hp:50,
                //xp:0,
                status:null
            },this),
            "enemy1":new Combatant({
                ...Skills.p02,
                team:"enemy",
                // hp:50,
                //xp:0,
                status:null
            },this),
        }

    }
    createElement(){
        this.element = document.createElement("div");
        this.element.classList.add("battle");
        this.element.innerHTML=(`
        <div class="battle-coco">
            <img src="${'/image/room/cat-idle.png'}" alt="coco"/>
        </div>
        <div class="battle-bug">
            <img src="${'/image/room/bug.png'}" alt="bug"/>
        </div>
        `)

    }
    init(container){
        this.createElement();
        container.appendChild(this.element);

        Object.keys(this.combatants).forEach(key=>{

            let combatant = this.combatants[key];
            combatant.id=key;
            combatant.init(this.element);
        })

    }


}
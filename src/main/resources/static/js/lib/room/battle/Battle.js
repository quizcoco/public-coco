class Battle{
    constructor(coco, enemy){
        this.coco = coco;
        this.enemy = enemy;

        //스킬들
        this.combatants={
            "coco":new Combatant(
                {
                ...Skills.p01,//...Skills.f01,
                team:"player",
                hp:this.coco.hp,
                // xp:0,
                status:null
            },
            this),
            "coco1":new Combatant({
                ...Skills.f01,
                team:"player",
                hp:this.coco.hp,
                // xp:0,
                status:null
            },this),
            "enemy":new Combatant({
                ...Skills.p02,
                team:"enemy",
                hp:this.enemy.hp,
                // xp:0,
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
    async init(container){
        this.createElement();
        container.appendChild(this.element);

        Object.keys(this.combatants).forEach(key=>{

            let combatant = this.combatants[key];
            combatant.id=key;
            combatant.init(this.element);
        })
        // for (let key in this.combatants) {
        //     let combatant = this.combatants[key];
        //     combatant.id = key;
        //     await combatant.createElement(); // 비동기적으로 createElement 호출
        // }

    }


}
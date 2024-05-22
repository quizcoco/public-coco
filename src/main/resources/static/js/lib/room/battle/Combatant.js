class Combatant{
    constructor(config,battle){
        Object.keys(config).forEach(key=>{
            this[key] = config[key];
        })
        this.battle=battle;

    }

    createElement(){
        this.skillElement = document.createElement("img");
        this.skillElement.classList.add("skill-effect");
        this.skillElement.setAttribute("src",this.src);
        this.skillElement.setAttribute("alt",this.name);
        this.skillElement.setAttribute("data-team",this.team);

    }
    update(){

        this.skillElement.setAttribute("data-active",this.isActive)
    }
    init(container){
        this.createElement();
        container.appendChild(this.skillElement)

    }

}
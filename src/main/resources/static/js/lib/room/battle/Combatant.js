class Combatant{
    constructor(config,battle){
        Object.keys(config).forEach(key=>{
            this[key] = config[key];
        })
        this.battle=battle;

    }

    async createElement(){
        this.skillElement = document.createElement("img");
        this.skillElement.classList.add("skill-effect");
        // this.skillElement.classList.add("d:none");
        this.skillElement.setAttribute("src",this.src);
        this.skillElement.setAttribute("alt",this.name);
        this.skillElement.setAttribute("data-team",this.team);
        this.skillElement.setAttribute("data-type",this.type);

    }//여기하나만 만들어서 그런듯???
    update(){

        this.skillElement.setAttribute("data-active",this.isActive)
    }
    init(container){
        this.createElement();
        container.appendChild(this.skillElement)

    }

}
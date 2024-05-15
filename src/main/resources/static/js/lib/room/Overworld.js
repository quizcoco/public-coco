class Overworld{
constructor(config){
    this.element = config.element;
    this.canvas = this.element.querySelector(".game-canvas");
    this.ctx = this.canvas.getContext("2d");
    this.map = null;

}

startGameLoop(){//초당60 everysingleframe run

    const step = ()=>{
  
        //clear off the canvas
        this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);

        //establish the camera person
        const cameraPerson = this.map.gameObjects.man1;

        //update all objects
        Object.values(this.map.gameObjects).forEach(object=>{

            object.update({
                arrow:this.directionInput.direction,
                map: this.map
            })
        })


        ///draw lower layer
        this.map.drawLowerImage(this.ctx,cameraPerson);

        //draw game objects
        Object.values(this.map.gameObjects).sort((a,b)=>{
            return a.y - b.y;
        }).forEach(object=>{
            //object.x +=1;
            object.sprite.draw(this.ctx,cameraPerson);
        })
        //draw upper layer
        //this.map.drawUpperImage(this.ctx,cameraPerson);//있으면하고 없으면x 덮어버리므로 캐릭터가 안나옴



        requestAnimationFrame(()=>{
            step();
        })
    }
    step();
}



init(){
    this.map = new OverworldMap(window.OverworldMaps.DemoRoom);
    this.map.mountObjects();
    this.directionInput = new DirectionInput();
    this.directionInput.init();
    //this.directionInput.direction;
    this.startGameLoop();

    this.map.startCutscene([
        // { who:"man1",type:"walk",direction:"down"},
        // { who:"man1",type:"walk",direction:"down"},
        // { who:"npcA",type:"walk",direction:"left"},
        // { who:"npcA",type:"stand",direction:"up",time:800},


    ]);

    


}


}


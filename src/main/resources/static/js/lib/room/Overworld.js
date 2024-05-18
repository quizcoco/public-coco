class Overworld{
constructor(config){
    this.element = config.element;
    this.canvas = this.element.querySelector(".game-canvas");
    this.ctx = this.canvas.getContext("2d");
    this.map = null;
    this.user=null;

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

bindActionInput(){
    new KeyPressListener("Enter",()=>{
        this.map.checkForActionCutscene()
    })

}



async init(){
    this.map = new OverworldMap(window.OverworldMaps.DemoRoom);
    this.map.mountObjects();

    this.bindActionInput();
    // this.bindman1PositionCheck();

    this.directionInput = new DirectionInput();
    this.directionInput.init();
    //this.directionInput.direction;
    this.startGameLoop();

        //유저의 정보
    this.user = new MyInfo();
    await this.user.init();
    console.log(this.user.gender);


    //이것도 한번말고 실행 안되게 if문
    if(this.user.gender==null){
    this.map.startCutscene([
        { type:"textMessage", text:"아바타를 선택해 주세요"},
        { who:"man1",type:"stand",direction:"down",time:1000},
        { who:"man1",type:"walk",direction:"down"},
        { who:"man1",type:"walk",direction:"right"},
        { who:"man1",type:"walk",direction:"right"},
        { who:"myCocoA",type:"stand",direction:"right",time:200},
        { type:"textMessage",text:"안녕? 너는 누구니?"},
        { type:"textMessage",text:"이름을 입력해 주세요."},
        { type:"textMessage",text:"안녕 철수야 나는 너의 코코란다"},
        { type:"textMessage",text:"나는 너의 도움이 필요해  나를 보살펴 주겠니?"},
        { type:"textMessage",text:"나를 부르고 싶은대로 불러도 좋아"},
        { type:"textMessage",text:"코코의 이름을 입력해 주세요."},
        { type:"textMessage",text:"쪼꼬쪼꼬.. 멋진 이름이야 ! "},
        { type:"textMessage",text:"우리 재미있게 잘 지내보자 ^.~"},
        { type:"textMessage",text:"웰컴포인트를 100 point 받았습니다."},

        // { who:"myCocoA",type:"stand",direction:"up",time:800},


    ]);

    }

    


}


}


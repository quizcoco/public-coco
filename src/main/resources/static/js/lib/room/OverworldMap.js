class OverworldMap{
    constructor(config){

        this.gameObjects=config.gameObjects;
        this.walls = config.walls ||{};
        
        this.lowerImage = new Image();//캐릭터가 서있는 바닥 이미지
        this.lowerImage.src=config.lowerSrc;

        this.upperImage = new Image(); //캐릭터 위 이미지(나무,지붕 등)
        this.upperImage.src=config.upperSrc;

        this.isCutscenePlaying = false;

    }

    drawLowerImage(ctx,cameraPerson){

        ctx.drawImage(this.lowerImage,
            utils.withGrid(7) - cameraPerson.x , utils.withGrid(4)-cameraPerson.y);
    }
    drawUpperImage(ctx,cameraPerson){

        ctx.drawImage(this.upperImage, utils.withGrid(10.5) - cameraPerson.x , utils.withGrid(6)-cameraPerson.y);
    }

    isSpaceTaken(currentX,currentY,direction){
        const{x,y} = utils.nextPosition(currentX,currentY,direction);
        return this.walls[`${x},${y}`] || false;
    }
    mountObjects(){
        Object.keys(this.gameObjects).forEach(key=>{

            let object = this.gameObjects[key];
            object.id=key;

            object.mount(this);

        })
    }

    async startCutscene(events,context){
        this.isCutscenePlaying=true;

        for(let i=0;i<events.length;i++){
            const eventHandler = new OverworldEvent({
                event:events[i],context,
                map:this
            })
            await eventHandler.init();

        }


        this.isCutscenePlaying=false;

        Object.values(this.gameObjects).forEach(object=>object.doBehaviorEvent(this))
    }
    checkForActionCutscene(){//앞에있는게 뭔지 인지하기...
        const man1 = this.gameObjects["man1"];
        const nextCoords = utils.nextPosition(man1.x,man1.y,man1.direction);
        const match = Object.values(this.gameObjects).find(object=>{
            return `${object.x},${object.y}`===`${nextCoords.x},${nextCoords.y}`;
        })
        if(!this.isCutscenePlaying && match && match.talking.length){
            this.startCutscene(match.talking[0].events)

        }

    }

    addWall(x,y){
        this.walls[`${x},${y}`] = true;
    };
    removeWall(x,y){
        delete this.walls[`${x},${y}`]
    }
    moveWall(wasX,wasY,direction){
        this.removeWall(wasX,wasY);
        const{x,y} = utils.nextPosition(wasX,wasY,direction);//새로생성
        this.addWall(x,y);
    }

}
let isLoggedIn=false;
const userInfo = new MyInfo();
userInfo.init().then((user)=>{
    if(user)
        isLoggedIn=true;
    console.log("로그인되었나요??"+isLoggedIn)


window.OverworldMaps={ //각종맵객체.. 이게 config?????
    DemoRoom:{
        lowerSrc:"/image/room/room.png",
        upperSrc:"/image/room/room.png",
        gameObjects:{
            man1:new Person({
                isPlayerControlled:true,
                x:utils.withGrid(7),
                y:utils.withGrid(9),
                src:"/image/room/man1.png",
            }),
                myCocoA: new Person({
                x:utils.withGrid(10),
                y:utils.withGrid(10),
                src:"/image/room/woman1.png",//TODO 4*3캐릭터 사진으로 변경
               behaviorLoop:[
                {type:"stand",direction:"left", time:1200},
                {type:"stand",direction:"right", time:800},
                // {type:"stand",direction:"up", time:800},
                {type:"stand",direction:"down",time:800},
                // {type:"walk",direction:"down"},
               ],
               talking:[
                {
                    events:isLoggedIn
                    ?[
                        {type:"textMessage",text:"집이 참 대궐 같지요?",faceman1:"myCocoA"},
                        {type:"textMessage",text:"혹시 식사제공을 부탁드려도 될까요"},
                    ]
                    :[
                        {type:"textMessage",text:"퀴즈코코에 온걸 환영해요",faceman1:"myCocoA"},
                        {type:"textMessage",text:"로그인 안하면 저장이 안돼요"},

                    ]
                }
               ]
               })
        },
        walls:{
            [utils.asGridCoord(2,4)]:true,
            [utils.asGridCoord(3,4)]:true,
            [utils.asGridCoord(4,4)]:true,
            [utils.asGridCoord(5,4)]:true,
            [utils.asGridCoord(6,4)]:true,

        
        },
        // cutsceneSpace:{
        //     9강:32분
        // }
    },
    battleField:{
        lowerSrc:"",
        upperSrc:"",
        gameObjects:{
            coco:new GameObject({
                x:5,
                y:6,
            }),
            insect: new GameObject({
                x:7,
                y:9,
                //src:"/image/"
               })
        }
    }
}

//init.js내용

    // Overworld 초기화
    const overworld = new Overworld({
        element: document.querySelector(".game-container"),
        userInfo: userInfo  // Overworld 클래스에 userInfo를 전달
    });
    overworld.init();

});
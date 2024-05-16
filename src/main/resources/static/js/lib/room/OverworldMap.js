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

    async startCutscene(events){
        this.isCutscenePlaying=true;

        for(let i=0;i<events.length;i++){
            const eventHandler = new OverworldEvent({
                event:events[i],
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
window.OverworldMaps={ //각종맵객체.. 이게 config?????
    DemoRoom:{
        lowerSrc:"/image/room/room.png",
        upperSrc:"/image/room/room.png",
        gameObjects:{
            man1:new Person({
                isPlayerControlled:true,
                x:utils.withGrid(7),
                y:utils.withGrid(9),
            }),
                npcA: new Person({
                x:utils.withGrid(10),
                y:utils.withGrid(10),
               // src:"/image/room/cat-idle.png",
               behaviorLoop:[
                {type:"stand",direction:"left", time:1200},
                {type:"stand",direction:"right", time:800},
                {type:"stand",direction:"up", time:800},
                {type:"stand",direction:"down",time:800},
                // {type:"walk",direction:"down"},
               ],
               talking:[
                {
                    events:[
                        {type:"textMessage",text:"퀴즈코코에 온걸 환영해",faceman1:"npcA"},
                        {type:"textMessage",text:"로그인 안하면 저장이 안돼"},

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
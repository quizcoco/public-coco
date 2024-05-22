class OverworldMap{
    constructor(config,overworld){

        this.gameObjects=config.gameObjects;
        this.cutsceneSpaces = config.cutsceneSpaces || {};
        this.walls = config.walls ||{};
        
        this.lowerImage = new Image();//캐릭터가 서있는 바닥 이미지
        this.lowerImage.src=config.lowerSrc;

        this.upperImage = new Image(); //캐릭터 위 이미지(나무,지붕 등)
        this.upperImage.src=config.upperSrc;

        this.isCutscenePlaying = false;
        //추가
        this.user = overworld.user || {};
        this.overworld=overworld;
        // this.overworld=null;
        // this.user = null;
        
        // console.log("config.user"+this.user.point);

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


        for (const event of events) {
            switch (event.type) {
                case "selectAvatar":
                    await new Promise(resolve => {
                        new SelectAvatar({
                            text: event.text,
                            onComplete: (genderValue) => {
                                // 서버에 저장된 아바타 정보와 맞추기 위해 사용자 정보를 업데이트
                                // this.user.gender = genderValue; 안쓰는것같아
                                // 아바타를 즉시 업데이트
                                this.gameObjects['man1'].sprite.updateGender(genderValue, this.overworld.ctx, this.gameObjects["man1"]);
                                resolve();
                            }
                        }).init(document.querySelector(".game-container"));
                    });
                    break;
            }
        }

      // 나머지 이벤트 처리
      for (const event of events) {
        if (event.type !== "selectAvatar") {
            const eventHandler = new OverworldEvent({
                event,
                context,
                map: this,
                user:this.user
            });
            await eventHandler.init();
        }
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

    checkForFootstepCutscene(){
        const man1 = this.gameObjects["man1"];
        const match = this.cutsceneSpaces[`${man1.x},${man1.y}`];
        if(!this.isCutscenePlaying && match){
            this.startCutscene(match[0].events)
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
                // gender:user?user.gender:0,
                src:user? (user.gender==1 ? "/image/room/woman1-walk2.png": "/image/room/man1.png"):"/image/room/man1.png",
                shadow:true,
            }),
                myCocoA: new Person({
                x:utils.withGrid(10),
                y:utils.withGrid(10),
                src:"/image/room/cat-idle.png",
                shadow:true,
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
               }),
               window:new Furniture({
                x:utils.withGrid(7),
                y:utils.withGrid(3.5),
                src:"/image/room/window.png",
                width: 32,
                height: 31,
                shadow:true,
                click:"board/reg",
                talking:[{events:[
                    {type:"textMessage",text:"로그인 안하면 저장이 안돼요"},
                ]}]
                
                
            }),
        },
        walls:{
            [utils.asGridCoord(2,4)]:true,
            [utils.asGridCoord(3,4)]:true,
            [utils.asGridCoord(4,4)]:true,
            [utils.asGridCoord(5,4)]:true,
            [utils.asGridCoord(6,4)]:true,
            [utils.asGridCoord(7,4)]:true,
            [utils.asGridCoord(8,4)]:true,
            [utils.asGridCoord(9,4)]:true,
            [utils.asGridCoord(10,4)]:true,
            [utils.asGridCoord(11,4)]:true,
        },
        cutsceneSpaces:{
            [utils.asGridCoord(7,5)]:[{
                events:[
                    {type:"textMessage",text:"창문을 통해 게시판으로 이동할 예정이예요"},
                    // {type:"changeMap",map:"BattleField"},
                ]
            }],
            
        }
    },
    // BattleField:{
    //     lowerSrc:"/image/room/battle.png",
    //     upperSrc:"/image/room/battle.png",
    //     gameObjects:{
    //         man1:new Person({
    //             // isPlayerControlled:true,
    //             x:utils.withGrid(7),
    //             y:utils.withGrid(4),
    //             shadow:false,
    //             src:""
    //         }),
    //         coco:new Person({
    //             x:utils.withGrid(1),
    //             y:utils.withGrid(2),
    //             shadow:true,
    //             behaviorLoop:[
    //                 {type:"stand",direction:"left", time:1200},
    //                 {type:"stand",direction:"right", time:800},
    //                 {type:"stand",direction:"down",time:800},
    //                ],
    //             src:"/image/room/cat-idle.png"
    //         }),
    //         insect: new Person({
    //             x:utils.withGrid(5.3),
    //             y:utils.withGrid(2),
    //             shadow:true,
    //             behaviorLoop:[
    //                 {type:"stand",direction:"left", time:200},
    //                 {type:"stand",direction:"right", time:200},
    //                 {type:"stand",direction:"down",time:200},
    //                ],
    //             src:"/image/room/bug.png"
    //            })
    //     }
    // },
    user: user
}

//init.js내용

    // Overworld 초기화
    const overworld = new Overworld({
        element: document.querySelector(".game-container"),
        userInfo: userInfo  // Overworld 클래스에 userInfo를 전달
    });
    overworld.init();

});
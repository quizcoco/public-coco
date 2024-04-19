class OverworldMap{
    constructor(config){

        this.gameObjects=config.gameObjects;
        
        this.lowerImage = new Image();//캐릭터가 서있는 바닥 이미지
        this.lowerImage.src=config.lowerSrc;

        this.upperImage = new Image(); //캐릭터 위 이미지(나무,지붕 등)
        this.upperImage.src=config.upperSrc;

    }

    drawLowerImage(ctx,cameraPerson){

        ctx.drawImage(this.lowerImage,
            utils.withGrid(10.5) - cameraPerson.x , utils.withGrid(6)-cameraPerson.y);
    }
    drawUpperImage(ctx,cameraPerson){

        ctx.drawImage(this.upperImage, utils.withGrid(10.5) - cameraPerson.x , utils.withGrid(6)-cameraPerson.y);
    }
}
window.OverworldMaps={ //각종맵객체
    DemoRoom:{
        lowerSrc:"/image/room/room.png",
        upperSrc:"/image/room/room.png",
        gameObjects:{
            man1:new Person({
                isPlayerControlled:true,
                x:utils.withGrid(5),
                y:utils.withGrid(6),
            }),
                npc1: new Person({
                x:utils.withGrid(7),
                y:utils.withGrid(9),
               // src:"/image/room/cat-idle.png"
               })
        }
    },
    // DemoRoom22:{
    //     lowerSrc:"",
    //     upperSrc:"",
    //     gameObjects:{
    //         man1:new GameObject({
    //             x:5,
    //             y:6,
    //         }),
    //             npc1: new GameObject({
    //             x:7,
    //             y:9,
    //             //src:"/image/"
    //            })
    //     }
    // }
}
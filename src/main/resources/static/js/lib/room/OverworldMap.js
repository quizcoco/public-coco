class OverworldMap{
    constructor(config){

        this.gameObjects=config.gameObjects;
        
        this.lowerImage = new Image();//캐릭터가 서있는 바닥 이미지
        this.lowerImage.src=config.lowerSrc;

        this.upperImage = new Image(); //캐릭터 위 이미지(나무,지붕 등)
        this.upperImage.src=config.upperSrc;

    }

    drawLowerImage(ctx){

        ctx.drawImage(this.lowerImage,0,0);
    }
    drawUpperImage(ctx){

        ctx.drawImage(this.upperImage,0,0);
    }
}
window.OverworldMaps={ //각종맵객체
    DemoRoom:{
        lowerSrc:"/image/room/room2.png",
        upperSrc:"/image/room/room2.png",
        gameObjects:{
            man1:new Person({
                isPlayerControlled:true,
                x:utils.withGrid(5),
                y:utils.withGrid(6),
            }),
                npc1: new Person({
                x:utils.withGrid(7),
                y:utils.withGrid(9),
                //src:"/image/"
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
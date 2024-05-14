class OverworldMap{
    constructor(config){

        this.gameObjects=config.gameObjects;
        this.walls = config.walls ||{};
        
        this.lowerImage = new Image();//캐릭터가 서있는 바닥 이미지
        this.lowerImage.src=config.lowerSrc;

        this.upperImage = new Image(); //캐릭터 위 이미지(나무,지붕 등)
        this.upperImage.src=config.upperSrc;

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
window.OverworldMaps={ //각종맵객체
    DemoRoom:{
        lowerSrc:"/image/room/room.png",
        upperSrc:"/image/room/room.png",
        gameObjects:{
            man1:new Person({
                isPlayerControlled:true,
                x:utils.withGrid(7),
                y:utils.withGrid(9),
            }),
                npc1: new Person({
                x:utils.withGrid(10),
                y:utils.withGrid(10),
               // src:"/image/room/cat-idle.png"
               })
        },
        walls:{
            [utils.asGridCoord(2,4)]:true,
            [utils.asGridCoord(3,4)]:true,
            [utils.asGridCoord(4,4)]:true,
            [utils.asGridCoord(5,4)]:true,
            [utils.asGridCoord(6,4)]:true,

        
        }
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
class Person extends GameObject{
    constructor(config){

        super(config);
        this.movingProgressRemaining=0;//이동중

        this.isPlayerControlled = config.isPlayerControlled ||false;

       // this.direction = "right";


        this.directionUpdate={
            "up":["y",-1],//[property,change]
            "down":["y",1],
            "left":["x",-1],
            "right":["x",1],
        }

    }
    update(state){
        if(this.movingProgressRemaining>0){
        this.updatePosition();
        }else{
            if(this.isPlayerControlled&& this.movingProgressRemaining=== 0&& state.arrow){
                this.startBehavior(state,{
                  type:"walk",
                  direction:state.arrow
                })
      
              }

              this.updateSprite(state);
        }

     
    }
    startBehavior(state,behavior){
        //캐릭터 방향 설정
        this.direction=behavior.direction;
        if(behavior.type==="walk"){
            //멈춤
           if(state.map.isSpaceTaken(this.x,this.y,this.direction))
            return;
        //ready to walk
        state.map.moveWall(this.x,this.y,this.direction);
            this.movingProgressRemaining=16;
        }
    }

    updatePosition(){
        
            const [property,change] = this.directionUpdate[this.direction];//뽀개기
            this[property]+=change;
            this.movingProgressRemaining-=1;
        

    }
    updateSprite( ){

        if(this.movingProgressRemaining>0){
            this.sprite.setAnimation("walk-"+this.direction);
            return;
        }
        this.sprite.setAnimation("idle-"+this.direction);
       

     
    }




}
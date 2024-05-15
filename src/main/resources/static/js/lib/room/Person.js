class Person extends GameObject{
    constructor(config){

        super(config);
        this.movingProgressRemaining=0;//이동중
        this.isStanding=false;

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
            if(!state.map.isCutscenePlaying && this.isPlayerControlled&& state.arrow){
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
            //막혔을 경우 멈춤
           if(state.map.isSpaceTaken(this.x,this.y,this.direction)){

            behavior.retry && setTimeout(()=>{
                this.startBehavior(state,behavior)
            },10);
            return;
           }
        //ready to walk
        state.map.moveWall(this.x,this.y,this.direction);
            this.movingProgressRemaining=16;
            this.updateSprite(state);//방향설정
        }

        if(behavior.type==="stand"){
            this.isStanding = true;
            setTimeout(()=>{
                utils.emitEvent("PersonStandComplete",{
                    whoId:this.id
                })
                this.isStanding = false;
            },behavior.time)
        }
    }

    updatePosition(){
        
            const [property,change] = this.directionUpdate[this.direction];//뽀개기
            this[property]+=change;
            this.movingProgressRemaining-=1;

            if(this.movingProgressRemaining===0){
                // const event = new CustomEvent("PersonWalkingComplete",{

                //     detail:{
                //         whoId:this.id
                //     }
                // });
                // document.dispatchEvent(event);
                utils.emitEvent("PersonWalkingComplete",{
                    whoId:this.id
                })
            }
        

    }
    updateSprite( ){

        if(this.movingProgressRemaining>0){
            this.sprite.setAnimation("walk-"+this.direction);
            return;
        }
        this.sprite.setAnimation("idle-"+this.direction);
       

     
    }




}
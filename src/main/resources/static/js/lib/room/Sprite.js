class Sprite{
    constructor(config){

        //set up the image
        this.image=new Image();
        this.image.src = config.src;
        this.image.onload=()=>{
            this.isLoaded=true;
        }

        //그림자
        this.shadow = new Image();
        this.useShadow=true;//config.useShadow ||false
        if(this.useShadow){
            this.shadow.src = "/image/room/shadow.png";
            
        }
        this.shadow.onload=()=>{
            this.isShadowLoaded=true;
        }


        //Configure Animation&초기상태
        this.animations=config.animation||{
            "idle-down":[[0,1]],
            "idle-right":[[3,1]],
            "idle-up":[[2,1]],
            "idle-left":[[1,1]],
            "walk-down":[[0,0],[0,1],[0,2],[0,1]],
            "walk-right":[[3,0],[3,1],[3,2],[3,1]],
            "walk-up":[[2,0],[2,1],[2,2],[2,1]],
            "walk-left":[[1,0],[1,1],[1,2],[1,1]],

        }
        this.currentAnimation = config.currentAnimation||"idle-down";
        this.currentAnimationFrame=0;

        this.animationFrameLimit = config.animationFrameLimit ||8;
        this.animationFrameProgress = this.animationFrameLimit;

        //Reference the game object
        this.gameObject=config.gameObject;

    }
    get frame(){
        return this.animations[this.currentAnimation][this.currentAnimationFrame];
    }

    setAnimation(key){
        if(this.currentAnimation !== key)
        {
            this.currentAnimation=key;
            this.currentAnimationFrame=0;
            this.animationFrameProgress=this.animationFrameLimit;
        }

    }

    updateAnimationProgress(){
        //downtick frame progress
        if(this.animationFrameProgress>0){
            this.animationFrameProgress-=1;
            return;
        }

        //reset the counter
        this.animationFrameProgress=this.animationFrameLimit;
        this.currentAnimationFrame +=1;

        if(this.frame===undefined){
            this.currentAnimationFrame=0;
        }
    }

    draw(ctx){
        const x=this.gameObject.x-8;
        const y=this.gameObject.y-18;

        this.isShadowLoaded && ctx.drawImage(this.shadow,x,y);
        const[frameX, frameY] = this.frame;

        this.isLoaded && ctx.drawImage(this.image,
            frameX*32, frameY*32,
            32,32,
            x,y,
            32,32
        )


        this.updateAnimationProgress();
    }

}
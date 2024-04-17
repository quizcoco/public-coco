class Sprite{
    constructor(config){

        //set up the image
        this.image=new Image();
        this.image.src = config.src;
        this.image.onload=()=>{
            this.isLoaded=true;
        }

        //그림자
        // this.shadow = new Image();
        // this.useShadow=true;//config.useShadow ||false
        // if(this.useShadow){
        //     this.shadow.src = "/image/";
            
        // }
        // this.shadow.onload=()=>{
        //     this.isShadowLoaded=true;
        // }


        //Configure Animation&초기상태
        this.animations=config.animation||{
            idleDown:[
                [0,0]
            ]

        }
        this.currentAnimation = config.currentAnimation||"idleDown";
        this.currentAnimationFrame=0;

        //Reference the game object
        this.gameObject=config.gameObject;

    }

    draw(ctx){
        const x=this.gameObject.x*16-8;
        const y=this.gameObject.x*16-18;

        //this.isLoaded && ctx.drawImage(this.shadow,x,y);

        this.isLoaded && ctx.drawImage(this.image,
            0,0,
            14,30,
            x,y,
            14,30
        )


    }


}
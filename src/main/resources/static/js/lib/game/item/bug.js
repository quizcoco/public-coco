

export default class Bug{

constructor(){


    this.img =new Image();
    this.img.src="/image/bug.gif";
    this.w=this.img.width;
    this.h=this.img.height;
    this.x=100;
    this.y=100;
    this.vx=0;
    this.vy=0;
    this.dx=this.x;
    this.dy=this.y;
    this.moveIndex=1;
    this.movedelayCount=10;
    this.dirIndex=2;

}

draw(ctx){

    let mi = this.moveIndex;
    let di = this.dirIndex;

    let w=this.w;
    let h=this.h;
    let sx=w*mi;
    let sy=h*di;
    let dx=this.x-w/2;
    let dy=this.y-h+20;
    ctx.drawImage(this.img,
        
        sx,sy,16,16,
        90,45,12,12)
}

}
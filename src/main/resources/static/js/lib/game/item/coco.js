

export default class Coco{

constructor(){


    this.img =new Image();
    this.img.src="/image/room/cat-idle.png";
    this.w=this.img.width/2;
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

    ctx.drawImage(this.img,50,30)
}

}
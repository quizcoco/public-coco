export default class Firework{

    #x
    #y
    
    #vx;
    #vy
    #dx;
    #dy;
    
    #w
    #h
    #img
    #moveIndex
    #movedelayCount
    #dirIndex
    constructor(){

        this.#img =new Image();
        this.#img.src="/image/room/fireball1.png";
        this.#w=this.#img.width/7; //384
        this.#h=this.#img.height; //13
        this.#x=100;
        this.#y=100;
        this.#vx=0;
        this.#vy=0;
        this.#dx=this.#x;
        this.#dy=this.#y;
        this.#moveIndex=1;
        this.#movedelayCount=10;
        this.#dirIndex=2;


}


draw(ctx){

    let mi = this.#moveIndex;
    let di = this.#dirIndex;

    let w=this.#w;
    let h=this.#h;
    let sx=w*mi;
    let sy=h*di;
    let dx=this.#x-w/2;
    let dy=this.#y-h+20;


    ctx.drawImage(this.#img,
        sx,sy,16,16,
        10,40,16,16,
        //s 이미지에서 그림에 사용할 영역
        //sx,sy,w,h,
        //d 위에서 선택한 영역을 출력할 영역
        //dx,dy,w,h
    
    );



}

update(){
this.#x += this.#vx;
this.#y += this.#vy;

// if(this.#x<this.#dx)
//     console.log(this.#x,this.#dx)


if(Math.floor(this.#x)==this.#dx 
|| Math.floor(this.#y)==this.#dy){
this.#vx=0;
this.#vy=0;
this.#dirIndex=2;
this.#moveIndex=1;
this.#movedelayCount=10;

}
else{
if(this.#movedelayCount-- ==0)
{
this.#moveIndex = this.#moveIndex ==0? 2:0 ;
this.#movedelayCount=10;
}

}

}


move(x,y){

    let w = x-this.#x;
    let h = y-this.#y;

    let d = Math.sqrt(w*w + h*h);

    this.#vx =w/d;
    this.#vy =h/d;
    this.#dx = x;
    this.#dy = y;


    
    if(Math.abs(w)>Math.abs(h)){
        if(w<0)
            this.#dirIndex=3;
        else
            this.#dirIndex=1;
    }
    else{
        if(h<0)
            this.#dirIndex=0;
        else
            this.#dirIndex=2;
    }

}

moveBy(dir){

}




}
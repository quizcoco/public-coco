//import Coco from "/js/lib/game/item/coco.js";


export default class BattleGround{



    #img
    #canvas
    #ctx
    #coco
    constructor(){

        let matchView = document.querySelector(".match-view");
        this.#canvas = matchView.querySelector(".battle-ground");
        document.body.appendChild(this.#canvas);//일부 브라우저에서는 캔버스 요소가 추가된 직후에 바로 렌더링되지 않을 수 있기 때문입니다. 이를 방지하기 위해 요소를 추가한 후에 캔버스를 초기화하고,

            /** @type {CanvasRenderingContext2D} */

        this.#ctx =this.#canvas.getContext("2d");

        this.x=0;
        this.y=0;
        this.#canvas.width = document.body.clientX;
        this.#canvas.height = document.body.clientY;

        this.#ctx.rect(this.x,this.y , this.#canvas.width , this.#canvas.height);
        this.#ctx.fillStyle = '#b197fc';
        this.#ctx.fill();

        this.#img = new Image();
        //this.#img.src = "/image/battle.png";
        

        //this.#coco = new Coco();



    }

    get canvas(){
        return this.#canvas;

    }



    draw(){

        this.#ctx.drawImage(this.#img,0,0);

    }

    
}
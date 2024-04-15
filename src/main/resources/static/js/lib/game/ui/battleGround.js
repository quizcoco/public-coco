//import Coco from "/js/lib/game/item/coco.js";


export default class BattleGround{



    #img
    #canvas
    #ctx
    #coco
    constructor(){

        let matchView = document.querySelector(".match-view");
        this.#canvas = matchView.querySelector(".battle-ground");

            /** @type {CanvasRenderingContext2D} */

        this.#ctx =this.#canvas.getContext("2d");

        this.#img = new Image();
        this.#img.src = "/image/room.png";
        

        //this.#coco = new Coco();



    }



    draw(){

        this.#ctx.drawImage(this.#img,0,0);

    }

    
}
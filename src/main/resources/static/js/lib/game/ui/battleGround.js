import Coco from "/js/lib/game/item/coco.js";


export default class BattleGround{



    #img
    #canvas
    #ctx
    #coco
    constructor(){

        this.matchView = document.querySelector(".match-view");
        this.#canvas = this.matchView.querySelector(".battle-canvas");
        //this.header = document.querySelector("#header"); 
        // document.body.appendChild(this.#canvas);//일부 브라우저에서는 캔버스 요소가 추가된 직후에 바로 렌더링되지 않을 수 있기 때문입니다. 이를 방지하기 위해 요소를 추가한 후에 캔버스를 초기화하고,

            /** @type {CanvasRenderingContext2D} */

        this.#ctx =this.#canvas.getContext("2d");
        this.quizView = document.querySelector(".quiz-view");

        this.matchView.style.width = this.quizView.offsetWidth + "px";


        const screenHeight = window.innerHeight;

        this.remainingHeight = screenHeight - this.matchView.offsetWidth;
        
        
        this.timerId;
        
        this.x=0;
        this.y=0;
        this.#canvas.width = this.quizView.offsetWidth;
        this.#canvas.height = this.matchView.offsetHeight;

        this.#ctx.rect(this.x,this.y , this.#canvas.width , this.#canvas.height);
        // this.#ctx.imageSmoothingEnabled = false;

        this.#img = new Image();
        this.#img.src = "/image/battle.png";
        

        this.#coco = new Coco();

        window.addEventListener("resize",this.resize.bind(this));

        this.resize();



    }

    get canvas(){
        return this.#canvas;

    }



    draw(){

        this.#ctx.drawImage(this.#img,0,0,this.#img.width,this.#img.height);
        this.#coco.draw(this.#ctx);
    }




    resize(){
        this.#canvas.width = this.quizView.offsetWidth;
        this.#canvas.height = this.matchView.offsetHeight;
        this.matchView.style.width = this.quizView.offsetWidth + "px";


        this.animate();
    }

    animate(){
    this.#ctx.rect(0, 0, this.#canvas.width, this.#canvas.height);
    this.#ctx.scale(5,5);

    this.#ctx.imageSmoothingEnabled = false;


    }

    run(){
        this.timerId= setInterval(()=>{

            this.draw();
            // this.update();

        },1000/60);

    }

    stop(){

        clearInterval(this.timerId);
    }



    
}
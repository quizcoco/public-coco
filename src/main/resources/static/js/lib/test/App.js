class App{
    constructor(){

        this.canvas = document.querySelector(".test-canvas");
        this.ctx = this.canvas.getContext("2d");
       // document.body.appendChild(this.canvas);

        this.x=0;
        this.y=0;
        this.canvas.width = 600;//document.body.clientWidth;
        this.canvas.height = 400;//document.body.clientHeight;
    
        // 직사각형 생성
        this.ctx.rect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = '#b197fc';
        this.ctx.fill();

        // this.ctx = new Image();
        // this.ctx.src = "./bg.png";


        window.addEventListener("resize",this.resize.bind(this));
        //this.resize();
      }
      resize(){
        this.canvas.width = document.body.clientWidth;
        this.canvas.height = document.body.clientHeight;
        this.animate();
      }

      animate(){
        this.ctx.rect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = '#b197fc';

        this.ctx.fill();
      }




    }
    
    new App();
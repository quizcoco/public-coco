import BattleGround from "/js/lib/game/ui/battleGround.js";



// class MatchCanvas{


//         constructor(){


//             this.canvas = document.querySelector(".battle-ground");
//             this.ctx =this.canvas.getContext()
//         }
// }



let battleGround = new BattleGround();

setTimeout(()=>{

    battleGround.draw();

},1000)


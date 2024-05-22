window.BattleAnimations = {

    async spin(event,onComplete){
        const element = event.caster.skillElement;
        const animationClassName = event.caster.team ==="player"?"battle-spin-right":"battle-spin-right";
        element.classList.add(animationClassName);

        //제거
        element.addEventListener("animationed",()=>{
            element.classList.remove(animationClassName);
        },{once:true});

        await utils.wait(100);
        onComplete();

    }
}
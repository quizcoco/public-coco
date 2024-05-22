// https://youtu.be/xfCPZhMw5Z0?si=c1U4GG9QxNjuIdEM&t=1216

window.SkillType = {
    physical:"physical",
    fire:"fire",
    ice:"ice",
    thunder:"thunder",
    debuff:"debuff",
    buff:"buff",
    heal:"heal"

}
window.Skills={
    "p01":{
        name:"솜방망이 펀치",
        type:SkillType.physical,
        src:"/image/room/box.png",
        actions:["damage1"],
    },
    "p02":{
        name:"깨물기",
        type:SkillType.physical,
        src:"/image/room/pot.png",
        actions:["damage1"],

    },
    "f01":{
        name:"파이어볼",
        type:SkillType.fire,
        src:"/image/room/fireball1.png",
        actions:["damage1"],

    },
    "d01":{
        name:"공격력 디버프",
        type:SkillType.debuff,
        src:"",
    },
    

}
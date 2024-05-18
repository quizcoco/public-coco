class MyInfo{
    constructor(){
        this.name = null;
        this.gender=null;


    }

    async init(){

        await fetch(`/api/users/info`)
        .then(resp=>{
            return resp.json();
        }).then(user=>{
            this.name=user.nickName;
            console.log(this.name);
        })

        await fetch(`/api/avatar/detail`)
        .then(resp=>{
            return resp.json();})
        .then(avatar=>{

            this.gender = avatar.gender;
        })
    }


}
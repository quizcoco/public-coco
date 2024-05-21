class MyInfo{
    constructor(){
        this.name = null;
        this.gender=0;
        this.point=0;


    }

    async init(){

        try{

            await fetch(`/api/users/info`)
            .then(resp=>{
                return resp.json();
            }).then(user=>{
                this.name=user.nickName;
                this.point=user.point;
                console.log("시작=제가 가진 포인트는요..."+this.point);

                console.log(this.name);
                return this.name;
            })

            await fetch(`/api/avatar/detail`)
            .then(resp=>{
                return resp.json();})
            .then(avatar=>{

                this.gender = avatar.gender;
            })


            return { name: this.name, gender: this.gender };

        } catch (error) {
            return null;
        }
    }


}
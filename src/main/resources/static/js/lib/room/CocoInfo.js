class CocoInfo{
constructor(){
    this.name = null;


}
async init(){

    try{

        await fetch(`/api/coco/detail`)
        .then(resp=>{
            return resp.json();})
        .then(coco=>{
            this.name = coco.name;
            console.log("비로그인하면 코코이름은?"+this.name)
        })

    }catch (error) {
        return null;
    }
}

// set(){

//     await fetch(`/api/users/info`)
//     .then(resp=>{
//         return resp.json();
//     }).then(user=>{
//         this.name=user.nickName;
//         console.log(this.name);
//     })
// }



}
const onlineNum = this.document.querySelector(".online-num");//span
const onlineUser = this.document.querySelector(".online-user");//span

let socket = new WebSocket("ws://localhost:8080/active-users");//192.168.43.124


socket.onmessage = function(event) {
    let activeUsers = event.data;

    onlineNum.textContent = activeUsers;
}


//로그인시 내 정보

async function myPicture(){
    await fetch(`/api/users/info`)
                .then(resp=>{
                    return resp.json();
                }).then(user=>{
                    onlineUser.style.backgroundImage=`url(${user.img})`; 
    })
}
onlineUser.onload = ()=>{
    myPicture();

}
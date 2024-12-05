const onlineInfo = this.document.querySelector("#online div");
const onlineNum = onlineInfo.querySelector(".online-num");//span
// const onlineUsers = onlineInfo.querySelector(".online-users");//div

let socket = new WebSocket("ws://localhost:8080/active-users");//192.168.43.124

//브라우저 저장소 세션 스토리지 사용
let storedUsers = JSON.parse(sessionStorage.getItem("addedUsers")) || [];
let addedUsers = new Set(storedUsers);

storedUsers.forEach(pic => {//페이지 로드시 접속자 표시
    onlineUserElement(pic) 
});


socket.onmessage = function(event) {
    console.log("Received data:", event.data);  // 서버에서 받은 데이터 출력

    let data = JSON.parse(event.data)
    
    if(data.type ==="count"){
        let activeUsers = data.value;
        onlineNum.textContent = activeUsers;
    }
    else if(data.type ==="imageList"){
        let currentUsers = new Set(data.value);
        // console.log(currentUsers);

        currentUsers.forEach(userPicture=>{
            if (!addedUsers.has(userPicture)) { //새 사용자 들어왔을 경우 엘리먼트 만들기 
                onlineUserElement(userPicture);
            }
        })
   
        addedUsers=currentUsers;
        sessionStorage.setItem("addedUsers", JSON.stringify(Array.from(addedUsers))); // Set을 배열로 변환하여 세션 스토리지에 저장합니다.
    }
    else if(data.type ==="logout") {//로그아웃시 DOM제거
        removeUserElement(data.value);
        addedUsers.delete(data.value);
        sessionStorage.setItem("addedUsers", JSON.stringify(Array.from(addedUsers))); // Set을 배열로 변환하여 세션 스토리지에 저장합니다.

    }
    
    
        

};


function onlineUserElement (userPicture){

    const friend = document.createElement("span");
    friend.classList.add("online-user");
    friend.style.backgroundImage = `url(/img/user/${userPicture})`;

    onlineInfo.insertBefore(friend,onlineInfo.firstChild);
}


function removeUserElement(userPicture) {
    
    const onlineUsers = onlineInfo.querySelectorAll(".online-user");
    
    onlineUsers.forEach(onlineUserElement=>{

        if(onlineUserElement.style.backgroundImage === `url("/img/user/${userPicture}")`){
            onlineInfo.removeChild(onlineUserElement);
        }

    })

}

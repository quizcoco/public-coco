const cmtSection = this.document.querySelector("#cmt");
const cmtList = cmtSection.querySelector(".cmt-list");
const cmtRefresh = cmtSection.querySelector(".refresh");
const cmtBtn = this.document.querySelector(".cmt-btn");

const postId = cmtSection.getAttribute("data-id");
const postUserId = cmtSection.getAttribute("data-post-user-id");
const currentUserId = cmtSection.getAttribute("data-current-user-id")||null; 
//=============코멘트 부르기==================

async function loadComments() {
    
const response = await fetch(`/api/comments/list?id=${postId}`);
const list = await response.json(); // JSON 데이터 파싱

cmtList.innerHTML = "";
let cmtHTML =``;
list.forEach(cmt => {
    const displayName = cmt.userId == postUserId ? "작성자" : `코코 ${cmt.anonymousNum}`;
    const displayDate = formatDate(new Date(cmt.regDate));
    
    cmtHTML += `<section class="comment">
            <h1 class="d:none">댓글 목록</h1>
            <div class="cmt-name">${displayName}</div>
            <div class="cmt-comment">${cmt.comment}</div>
            <div class="d:flex fl-dir:column">
                <span class="fs:1">${displayDate}</span>
                <div class="btn-div" data-id="${cmt.id}" data-userid="${cmt.userId}">
                    <span id="edit-cmt">수정</span><button id="del-cmt">삭제</button>
                </div>
            </div>
            </section>`;
            
        });
        
        cmtList.insertAdjacentHTML("afterbegin",cmtHTML);
        
        
        //댓글 수정
        const cmtSections = document.querySelectorAll(".comment");
        for(let cmtSection of cmtSections){
            const cmtDiv = cmtSection.querySelector(".cmt-comment");
            const btnDiv = cmtSection.querySelector(".btn-div");
            let editBtn = cmtSection.querySelector("#edit-cmt");
            let delBtn = cmtSection.querySelector("#del-cmt");
            editBtn.addEventListener("click",()=>{
                //textarea
                let text = cmtDiv.textContent;
                cmtDiv.innerHTML="";
                const textarea = document.createElement("textarea");
                textarea.value=text;
                textarea.classList.add("n-textbox","n-textbox-user");
                cmtDiv.appendChild(textarea);

                editBtn.style.display="none";
                delBtn.style.display="none";

                //완료버튼
                const submitBtn = document.createElement("button");
                submitBtn.textContent="완료";
                btnDiv.appendChild(submitBtn);
                const cmtId = btnDiv.getAttribute("data-id");

                submitBtn.addEventListener("click",async()=>{
                    const editedComment = textarea.value;
                    if (!editedComment) {
                        console.error('코멘트가 없습니다.');
                        return;
                    }
                
                        console.log(editedComment,cmtId);
                    const response = await fetch(`/api/comments/edit`, {
                    method: 'POST', // POST
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ comment: editedComment, cmtId: cmtId})
                    });
                    
                    await loadComments();
                })

                //취소버튼
                const cancelBtn = document.createElement("button");
                cancelBtn.textContent="취소";
                btnDiv.appendChild(cancelBtn);
                
                cancelBtn.addEventListener("click",()=>{
                    cmtDiv.removeChild(textarea);
                    cmtDiv.textContent=text;

                    //버튼복원
                    editBtn.style.display="";
                    delBtn.style.display="";
                    btnDiv.removeChild(submitBtn);
                    btnDiv.removeChild(cancelBtn);

                })



            })
                
        }
        
        //댓글 삭제
        const cmtBtnDivs = cmtList.querySelectorAll(".btn-div");
        for(let cmtBtnDiv of cmtBtnDivs){
            const editBtn = cmtBtnDiv.querySelector("#edit-cmt")
            //감추기
            const commentUserId = cmtBtnDiv.getAttribute("data-userid");
            if(!currentUserId) //비로그인일 때
                cmtBtnDiv.style.visibility = "hidden";
            else if(postUserId==currentUserId) //작성자일 때
                if(commentUserId != currentUserId)
                    editBtn.style.visibility = "hidden";
            if(postUserId!=currentUserId){//다른 유저 글일 때
                if(commentUserId != currentUserId) 
                    cmtBtnDiv.style.visibility = "hidden";
            }

            //댓글 삭제
            const delCmtBtn = cmtBtnDiv.querySelector("#del-cmt");
            delCmtBtn.addEventListener("click",async()=>{
                let cmtId=cmtBtnDiv.getAttribute("data-id");
                let userId=cmtBtnDiv.getAttribute("data-userid");

                const response = await fetch(`/api/comments/del`, {
                    method: 'POST', // POST
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ cmtId: cmtId, userId: userId})
                    });

                await loadComments();
            })    
        }
    

    }
    loadComments();

//=============코멘트 등록==================
cmtBtn.addEventListener("click",async()=>{
    let cmtValue= this.document.querySelector("textarea[name='comment']").value;
    // const postId = this.document.querySelector("input[type='hidden']").value;

    
    if (!cmtValue) {
        console.error('코멘트가 없습니다.');
        return;
    }

        console.log(cmtValue,postId);
    const response = await fetch(`/api/comments/reg`, {
    method: 'POST', // POST
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ comment: cmtValue, postId: postId})
    });


    //입력창 비우기
    this.document.querySelector("textarea[name='comment']").value=""; 
    
    await loadComments();
});


//=================댓글 새로고침======================

cmtRefresh.addEventListener("click",async()=>{

    await loadComments();
})

//=======================날짜 포멧========================

function formatDate(date) {
    const year = String(date.getFullYear()).slice(2);
    const month = padZero(date.getMonth() + 1);
    const day = padZero(date.getDate());
    const hours = padZero(date.getHours());
    const minutes = padZero(date.getMinutes());
    const seconds = padZero(date.getSeconds());
    
    return `${year}.${month}.${day} ${hours}:${minutes}:${seconds}`;
}

function padZero(num) {
    return (num < 10 ? '0' : '') + num;
}
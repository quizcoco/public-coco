const ownSection = document.getElementById("own-section");

const profileImg = ownSection.querySelector(".profile-img");
const userProfile = ownSection.querySelector(".user-profile");

const btnSection = ownSection.querySelector(".btn-section");
const imgSection = ownSection.querySelector(".img-section");

const ownAvartar = ownSection.querySelector(".own-avartar");
const ownCoco = ownSection.querySelector(".own-coco");

const showAvartar = ownSection.querySelector(".show-avartar");
const showCoco = ownSection.querySelector(".show-coco");

const inventoryBtn = ownSection.querySelector(".inventory-btn");


   /* 모바일, pc 버전 화면 전환*/ 

window.addEventListener("load", () => {

   function moveSections() {

       /* 화면이 1200보다 작을때 화면 구성*/ 
      if (window.innerWidth < 1200) {

            // 버튼 첫 화면 상태로 변경
            ownAvartar.classList.add("n-btn:filled-on");
            ownCoco.classList.add("n-btn:filled-off");
            showCoco.classList.add("hidden");
            inventoryBtn.style.position = "static";
            inventoryBtn.style.transform = "none";

            // 프로필 구역 가운데로 변경
            profileImg.style.position = "static";
            profileImg.style.transform = "none";

            userProfile.style.position = "static";
            userProfile.style.transform = "none";

            // 보유 아바타, 코코 위치 하단으로 변경
            ownAvartar.style.position = "static";
            ownAvartar.style.transform = "none";

            showAvartar.style.position = "static";
            showAvartar.style.transform = "none";

            ownCoco.style.position = "static";
            ownCoco.style.transform = "none";

            showCoco.style.position = "static";
            showCoco.style.transform = "none";

            /* 아바타, 코코 버튼 화면 전환 이벤트 */
       ownAvartar.addEventListener("click", () => {
   
            ownAvartar.classList.add("n-btn:filled-on");
            ownAvartar.classList.remove("n-btn:filled-off");
            showAvartar.classList.add("d:flex");
            showAvartar.classList.remove("hidden");

            ownCoco.classList.add("n-btn:filled-off");
            ownCoco.classList.remove("n-btn:filled-on");
            showCoco.classList.add("hidden");
            showCoco.classList.remove("d:flex");

      });

       ownCoco.addEventListener("click", () => {
   
            ownCoco.classList.add("n-btn:filled-on");
            ownCoco.classList.remove("n-btn:filled-off");
            showCoco.classList.add("d:flex");
            showCoco.classList.remove("hidden");

            ownAvartar.classList.add("n-btn:filled-off");
            ownAvartar.classList.remove("n-btn:filled-on");
            showAvartar.classList.add("hidden");
            showAvartar.classList.remove("d:flex");
      
      });

     /* 화면이 1200보다 클 때 화면 구성*/   
  } else {

      // 버튼 전부 활성화 상태로 변경
      ownAvartar.classList.add("n-btn:filled-on");
      ownAvartar.classList.remove("n-btn:filled-off");

      ownCoco.classList.add("n-btn:filled-on");
      ownCoco.classList.remove("n-btn:filled-off");

      showCoco.classList.remove("hidden");

      // 프로필 구역 왼쪽으로 변경
      profileImg.style.position = "absolute";
      profileImg.style.transform = "translateY(-50%)";
      profileImg.style.top = "38%";
      profileImg.style.left = "23%";

      userProfile.style.position = "absolute";
      userProfile.style.transform = "translateY(-50%)";
      userProfile.style.top = "38%";
      userProfile.style.left = "32%";

      // 보유 아바타, 코코 위치 오른쪽으로 변경
      ownAvartar.style.position = "absolute";
      ownAvartar.style.transform = "translateY(-50%)";
      ownAvartar.style.top = "27%";
      ownAvartar.style.right = "40%";

      showAvartar.style.position = "absolute";
      showAvartar.style.transform = "translateY(-50%)";
      showAvartar.style.top = "35%";
      showAvartar.style.right = "42.5%";

      ownCoco.style.position = "absolute";
      ownCoco.style.transform = "translateY(-50%)";
      ownCoco.style.top = "45%";
      ownCoco.style.right = "40%";

      showCoco.style.position = "absolute";
      showCoco.style.transform = "translateY(-50%)";
      showCoco.style.top = "53%";
      showCoco.style.right = "42.5%";

      inventoryBtn.style.position = "absolute";
      inventoryBtn.style.transform = "translateY(-50%)";
      inventoryBtn.style.top = "75%";
      inventoryBtn.style.right = "50%";
      
  }


  } 
  
  window.addEventListener("resize", moveSections);
  moveSections();


   /* 프로필 이미지 누르면 모달창 뜨기 */
   
  const openModal = ownSection.querySelector(".open-modal");
  const closeBtn = ownSection.querySelector(".close-btn");
  const modal = ownSection.querySelector(".modal");
  const modalBackdrop = ownSection.querySelector(".modal-backdrop");
  const modalImage = ownSection.querySelector(".modal-image");

   openModal.addEventListener("click", ()=> {
      
      modal.classList.remove("d:none");
      modalBackdrop.classList.remove("d:none");
      modal.classList.add("modal-fade-in");

      //프로필 이미지 가져오기
      const imgElement = openModal.querySelector("img");
      const imgSrc = openModal.style.backgroundImage.slice(5, -2);
      modalImage.setAttribute("src", imgSrc);
      
   });

   // 모달 창 닫기
   modal.addEventListener("click", ()=> {
      
         closeModal();
   });

   modalImage.addEventListener("click", ()=> {
     
         closeModal();
   });

   function closeModal() {
      modal.classList.replace("modal-fade-in", "modal-fade-out");
    
      setTimeout(() => {
        modal.classList.add("d:none");
        modalBackdrop.classList.add("d:none");
        modal.classList.remove("modal-fade-out");
      }, 130);
    }


});

   
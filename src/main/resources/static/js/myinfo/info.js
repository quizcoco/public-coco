const ownSection = document.getElementById("own-section");
const ownAvartar = ownSection.querySelector(".own-avartar");
const ownCoco = ownSection.querySelector(".own-coco");

const showAvartar = ownSection.querySelector(".show-avartar");
const showCoco = ownSection.querySelector(".show-coco");


/* 아바타, 코코 표시 구역 전환 */
ownAvartar.addEventListener("click", () => {
   
      ownAvartar.classList.add("n-btn:filled-on");
      ownAvartar.classList.remove("n-btn:filled-off");
      showAvartar.classList.add("d:flex");
      showAvartar.classList.remove("d:none");


      ownCoco.classList.add("n-btn:filled-off");
      ownCoco.classList.remove("n-btn:filled-on");
      showCoco.classList.add("d:none");
      showCoco.classList.remove("d:flex");

});

ownCoco.addEventListener("click", () => {
   
      ownCoco.classList.add("n-btn:filled-on");
      ownCoco.classList.remove("n-btn:filled-off");
      showCoco.classList.add("d:flex");
      showCoco.classList.remove("d:none");

      ownAvartar.classList.add("n-btn:filled-off");
      ownAvartar.classList.remove("n-btn:filled-on");
      showAvartar.classList.add("d:none");
      showAvartar.classList.remove("d:flex");
   
});






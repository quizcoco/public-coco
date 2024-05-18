// import List from '/js/study/favorite/listComponent.js'
const { createApp } = Vue;

createApp({
  data() { //모델을 리턴해줌
    return {
      list:[],
      // answer:[],
      result:0
    }
  },
  methods:{
    // getfavorite (){ //함수 선언
    // },
  },
  created() {
    fetch(`/api/favorites/list`)
    .then(resp=>{
      return resp.json();
    }).then(list=>{
      this.list = list;
        // this.question = list.question;
        // this.answer = list.answer;
    })
  },
  // template:`
  // <section class="list-shape n-item n-item:underline bg-color:main-1 d:flex mb:1" v-for="q in list">
  // <h1 class="d:none">즐겨찾기 리스트</h1>
  // <input type="checkbox" name="checkbox" class="n-toggle n-toggle-type:check-box n-toggle-size:1 as:center">
  // <a><div class="pl:5"><span>{{q.question}}</span><br><span class="color:accent-4">{{q.answer}}</span></div></a>
  // </section>
  // `
}).mount("main");

const app = Vue.createApp({
  data:() => ({
    // APIからの取得データ
    items:null,
    // 検索キーワード
    keyword:"",
    // 検索後表示
    message:""
  }),
  watch:{
    keyword:function(newkeyword,oldkeyword){
      console.log(newkeyword)
      this.message = 'Waiting for you to stop typing...'
      // getanswerを1000ミリ秒(1秒)実行しない
      this.debouncedgetanswer()
    }
  },
  // 読み込み時に実行
  mounted:function(){
    // getanswerを1000ミリ秒(1秒)実行しない
    this.debouncedgetanswer = _.debounce(this.getanswer, 1000)
  },
  // vue立ち上げ時に自動実行
  methods:{
    getanswer:function(){
      // 検索欄が空白だったら
      if(this.keywork === ""){
        console.log("検索欄空白")
        this.items = null
        return
      }
      this.message = "Lading..."
      const vm=this
      // 検索結果１ページ目(1ページ20個)分を取得、queryが検索キーワード
      const params ={ page: 1, per_page: 20, query: this.keyword }
      axios.get("https://qiita.com/api/v2/items",{params})
      // APIからデータが返ってくるとthenメソッドが呼ばれてresponse内にデータが入っている
      .then(function(response){
        console.log(response)
        vm.items = response.data
      })
      // 例外の取得でerror!の表示に続きエラーの内容を表示
      .catch(function(error){
        vm.message = "Error!" + error
      })
      // 最後の処理で空白に
      .finally(function(){
        vm.message = ""
      })
    }
  },
})
app.mount("#app")
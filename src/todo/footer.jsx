import '../assert/styles/footer.styl'

//缺点：不能在这里写style，需要拆分出去
//可以使用js来生成html，这样可以使得代码简洁，例如v-if，这里可以使用for来操作
export default {
  data(){
    return {
      author: "Atos",
    }
  },
  render(){
    return (
      <div id="footer">
        <span>Writtrn by {this.author}</span>
      </div>
    )
  }
}
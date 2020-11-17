import Vue from "vue"
import App from "./app.vue"
import "./assert/styles/test.css"
import "./assert/images/timg.jpg"

const root = document.createElement("div")
document.body.appendChild(root)

new Vue({
  render: (h) => h(App)
}).$mount(root)
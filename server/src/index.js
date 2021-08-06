import Koa from "koa"
import mongoose from "mongoose"
// serializer
import KoaBody from "koa-body"
import router from "./router"

// DB 연결
mongoose.connect("DB 주소", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const App = new Koa()

App.use(KoaBody())

App.use(router.routes())
  .use(router.allowedMethods())

App.listen(3000)  // server 3000

console.log("Web Server Listend: 3000")

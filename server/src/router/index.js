import KoaRouter from "koa-router"
import PrescriptionRouter from "./prescription"

const router = new KoaRouter({
  prefix: "/api",
})  // url 앞에 api 추가

router.use("/prescription", PrescriptionRouter.routes())

export default router

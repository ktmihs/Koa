import KoaRouter from "koa-router"
import { get, getOne,filter, post, put,update,updateTime,removeTime, remove, removeMany} from "./prescription.ctrl"
// prescription.ctrl의 기능 불러오기

const router = new KoaRouter()

// :params >> params로 입력온 data
router.get("/", get)
router.get("/:id", getOne)
router.get('/read/:filter',filter)
router.post("/", post)
router.put("/:id", put)
router.put('/:_id',update)
router.put('/:_id/:reservationTime', updateTime)
router.delete('/:_id/:reservationTime',removeTime)
router.delete("/:id", remove)
router.delete("/:patientName/:patientName", removeMany)

export default router

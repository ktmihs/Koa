import KoaRouter from "koa-router";
import {
  get, getOne, post, put, remove, removeMany,
} from "./prescription.ctrl";

const router = new KoaRouter();

router.get("/", get);
router.get("/:id", getOne);
router.post("/", post);
router.put("/:id", put);
router.delete("/:id", remove);
router.delete("/:patientName/:patientName", removeMany);

export default router;

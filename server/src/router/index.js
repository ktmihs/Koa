import KoaRouter from "koa-router";
import TicketRouter from "./ticket";
import HospitalRouter from "./hospital";
import PrescriptionRouter from "./prescription";

const router = new KoaRouter({
  prefix: "/api",
});

router.use("/ticket", TicketRouter.routes());
router.use("/hospital", HospitalRouter.routes());
router.use("/prescription", PrescriptionRouter.routes());

export default router;

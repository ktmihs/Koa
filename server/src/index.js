// const Koa = require("koa");
// const KoaRouter = require("koa-router");

import Koa from "koa";
import mongoose from "mongoose";
// serializer
import KoaBody from "koa-body";
import router from "./router";

mongoose.connect("mongodb://localhost:27017/kiosk", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const App = new Koa();

App.use(KoaBody());

App.use(router.routes())
  .use(router.allowedMethods());

App.listen(3001);

console.log("Web Server Listend: 3000");

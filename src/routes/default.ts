import controller from "../controller/default";
import express from "express";

const router = express.Router();

router.get("/", controller.index);
router.get("/hello/:name", controller.hello);

export = router;

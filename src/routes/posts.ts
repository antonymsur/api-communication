import controller from "../controller/posts";
import express from "express";
const router = express.Router();

router.get("/posts", controller.getPosts);
router.get("/posts/:id", controller.getPost);

export = router;

import controller from "../controller/users";
import express from "express";
const router = express.Router();

router.get("/users", controller.getUsers);
router.get("/users/:id", controller.getUser);

export = router;

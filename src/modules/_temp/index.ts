import { Router } from "express";
import { TempController } from "./controller"
const controller = new TempController();

const router = Router();

//Get all users
router.get("/", controller.all);

// Get one user
router.get("/:id", controller.one);

//Create a new user
router.post("/",  controller.save);

//Delete one user
router.delete("/:id", controller.remove);


export default router;
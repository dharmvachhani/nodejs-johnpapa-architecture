import { Router } from "express";
import { UserController } from "./controller"
const userController = new UserController();

const router = Router();

//Get all users
router.get("/", userController.all);

// Get one user
router.get("/:id", userController.one);

//Create a new user
router.post("/",  userController.save);

//Delete one user
router.delete("/:id", userController.remove);


export default router;
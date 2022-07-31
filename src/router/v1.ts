import { Router } from "express";
import user from "../modules/user";
import temp from "../modules/_temp";

const routes = Router();

routes.use("/users", user);
routes.use("/temp", temp);

export default routes;
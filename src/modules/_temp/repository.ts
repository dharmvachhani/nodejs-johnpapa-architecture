import { db } from "../../config/db";
import { Temp } from "./entity";

export const TempRepository = db.getRepository(Temp).extend({

})
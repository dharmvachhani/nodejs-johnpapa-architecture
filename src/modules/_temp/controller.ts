import { NextFunction, Request, Response } from "express"
import createHttpError = require("http-errors");
import { TempRepository } from "./repository"

export class TempController {

    async all(request: Request, response: Response, next: NextFunction) {
        try {
            const users = await TempRepository.find();
            response.json(users);
        } catch (error) {
            next(createHttpError(404, "Not Found"))
        }
        
    }

    async one(request: Request, response: Response, next: NextFunction) {
        const id: any = request.params.id;
        const user = await TempRepository.findOne(id)
        response.json(user);
    }

    async save(request: Request, response: Response, next: NextFunction) {
        const user = await TempRepository.save(request.body)
        response.json(user);
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        const id: any = request.params.id;
        let userToRemove = await TempRepository.findOneBy({ id })
        const user = await  TempRepository.remove(userToRemove)
        response.json(user);
    }

}
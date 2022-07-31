import { NextFunction, Request, Response } from "express"
import createHttpError = require("http-errors");
import { UserRepository } from "./repository"

export class UserController {

    async all(request: Request, response: Response, next: NextFunction) {
        try {
            const users = await UserRepository.find();
            response.json(users);
        } catch (error) {
            next(createHttpError(404, "Not Found"))
        }
        
    }

    async one(request: Request, response: Response, next: NextFunction) {
        const id: any = request.params.id;
        const user = await UserRepository.findOne(id)
        response.json(user);
    }

    async save(request: Request, response: Response, next: NextFunction) {
        const user = await UserRepository.save(request.body)
        response.json(user);
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        const id: any = request.params.id;
        let userToRemove = await UserRepository.findOneBy({ id })
        const user = await  UserRepository.remove(userToRemove)
        response.json(user);
    }

}
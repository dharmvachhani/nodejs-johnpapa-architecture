import { UserRepository } from "./repository"

export class UserService { 
    async one(id: any) {
        const user: any = await UserRepository.findOne(id);
        user.note = "business logic";
        return user;
    }
}
import { PrismaClient, User } from "@prisma/client";
import UserDto from '../dto/userDto'

const prisma = new PrismaClient();

class UserService {
    public getAllUsers = async (count : number): Promise<User[]> => {
        const result = await prisma.user.findMany({

        })
        prisma.$disconnect();
        return result;
    }

    public createUser = async(user: UserDto): Promise<User> => {
        const result = await prisma.user.create({
            data : user,
        });
        prisma.$disconnect();
        return result;
    }
}

export default UserService;
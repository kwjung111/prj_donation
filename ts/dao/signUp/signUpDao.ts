import { Prisma, PrismaClient, User } from '@prisma/client'
import SignUpInputDto from '../../dto/signUp/SignUpSvcDto';
import SignUpReslDto from '../../dto/signUp/SignUpReslDto';

const prisma = new PrismaClient();

const signUpDao = {

    createUser: async (signUpInputDto: SignUpInputDto): Promise<SignUpReslDto> => {
        //throw 
        try {
            const userCreateResult = await prisma.user.create({
                data: {
                    name: signUpInputDto.name,
                    password: {
                        create: {
                            password: signUpInputDto.nickName
                            , salt: signUpInputDto.salt
                        }
                    },
                    profile: {
                        create: {
                            nickName: signUpInputDto.nickName
                        }
                    },
                    auth: {
                        create: {
                            phone: signUpInputDto.phone
                            , email: signUpInputDto.email
                        }
                    }

                },/*
            include:{
                password : true,
                profile : true,
                auth: true
            }*/
            });

            const signUpReslDto: SignUpReslDto = {
                id: userCreateResult.id
            }
            return signUpReslDto
        }
        catch (error) {
            throw error
        }


    }
}

export default signUpDao

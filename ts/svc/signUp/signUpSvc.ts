import { PrismaClient, User } from "@prisma/client";
import util from "../../util"
import signUpDao from "../../dao/signUp/signUpDao";
import SignUpInputDto from "../../dto/signUp/SignUpSvcDto";
import SignUpReqDto from "../../dto/signUp/SignUpReqDto";
import SignUpRespDto from "../../dto/signUp/SignUpRespDto";
import dupCheckNickNameReqDto from "../../dto/dupCheck/DupChkNickNameReqDto";
import DupChkNickNameRespDto from "../../dto/dupCheck/DupChkNickNameRespDto";

const prisma = new PrismaClient();

const signUpSvc = {

    createUserFull: async (signUpReqDto: SignUpReqDto): Promise<SignUpRespDto> => {
        try {
            const salt = util.generateSalt();

            const signUpInputDto: SignUpInputDto = {
                ...signUpReqDto
                , salt: salt
            }

            const createdUser = await prisma.$transaction(async (prisma) => {
                return signUpDao.createUser(signUpInputDto)
            })

            const signUpRespDto: SignUpRespDto = {
                id: createdUser.id
            }

            return signUpRespDto;
        }
        catch (error) {
            console.error("Error Creating User : ", error);

            throw error;
        }
        finally {
            prisma.$disconnect
        }
    },
    dupCheckNickName: async (dupChk: dupCheckNickNameReqDto): Promise<DupChkNickNameRespDto> => {
        const dupChkNickNameRespDto : DupChkNickNameRespDto = {
            isDup : false
        }
        return dupChkNickNameRespDto
    }

}

export default signUpSvc;
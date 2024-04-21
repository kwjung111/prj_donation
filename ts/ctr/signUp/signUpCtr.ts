import { Request, Response } from "express"
import logger from '../../logger'
import SignUpReqDto from "../../dto/signUp/SignUpReqDto";
import signUpSvc from "../../svc/signUp/signUpSvc";

const signUpCtr = async (req: Request, res: Response): Promise<void> => {
    try {
        const body = req.body //TODO 확인해보기
        logger.data(body)
        const createUserReqDto: SignUpReqDto = body;
        const data = await signUpSvc.createUserFull(createUserReqDto);

        console.log(data)
        res.status(200).send(data)
    }
    catch(error){
        console.error("error ocurred", error)
        res.status(500).send(error)
    }
}

export default signUpCtr 
import {Router} from "express";
import signUpCtr from "../ctr/signUp/signUpCtr"
const signUpRouter : Router = Router();

signUpRouter.post('/',signUpCtr)

export default signUpRouter
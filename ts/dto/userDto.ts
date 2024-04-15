
//class-validator 필요
interface UserDto{
    id : number 
    ,name : string 
    ,phone : string | null
    ,email : string | null 
    ,regDtm : Date
    ,modDtm : Date 
}
export default UserDto;
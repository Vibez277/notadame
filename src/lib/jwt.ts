import jwt from "jsonwebtoken";
import { User } from "../../interfaces/user_types";

export const createToken=(data:User)=>{
    const tk = jwt.sign({_id:data._id,email:data.email},"Notadame-Jwt-Secret");
    return tk;
}
export const decodeToken=(token:string)=>{
    const data = jwt.decode(token);
    return data;
}
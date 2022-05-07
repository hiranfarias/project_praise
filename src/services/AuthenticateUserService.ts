import { getCustomRepository,} from "typeorm";
import { compare} from "bcryptjs";
import { sign } from "jsonwebtoken";
import { UsersRepositories } from "../repositories/UsersRepositories";


interface IAuthenricateRequest {
  email: string;
  password: string;
}

class AuthenticateUserService {

  async execute({ email, password }: IAuthenricateRequest) {

    const userRepositories = getCustomRepository(UsersRepositories);
    const user = await userRepositories.findOne({
      email
    });

    if(!user) {
      throw new Error("Incorrect Email and/or Password(s)")
    }

   const passwordMatch =  await compare(password, user.password);

   if(!passwordMatch) {
     throw new Error("Incorrect Email and/or Password(s)")
   }

   const token = sign({
     email: user.email
   }, "f9d08276bc85d30d578e8883f3c7e843", {
     subject: user.id, 
     expiresIn: "10d"
   });

   return token;
  }
}

export {AuthenticateUserService}
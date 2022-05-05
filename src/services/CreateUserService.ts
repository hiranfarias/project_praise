
import { getCustomRepository } from "typeorm"; 
import { UsersRepositories } from "../repositories/UsersRepositories";


interface IUserRequest {
  name: string;
  email: string;
  admin?: boolean
}

class CreateUserService{
  async execute( {name, email, admin}: IUserRequest) {
    const usersRepository = getCustomRepository(UsersRepositories);
    //const userAlreadyExists = await usersRepository.findOne({email});
    if(!email) {
      throw new Error("Email Incorreto, tente novamente");
    }
    const userAlreadyExists = await usersRepository.findOne({
      email,
    });

    if (userAlreadyExists) {
      throw new Error("Usuário já Existe");
    }

    const user = usersRepository.create({
      name,
      email, 
      admin
    })

    await usersRepository.save(user);

    return user;

  }
}

export { CreateUserService }
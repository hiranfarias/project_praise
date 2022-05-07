import { Request, Response, NextFunction} from "express";
import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UsersRepositories";


export async function ensureAdmin(requeste:Request, response:Response, next:NextFunction) {

  const { user_id } = requeste;
  //console.log(user_id);
  
  const usersRepositories = getCustomRepository(UsersRepositories);
  const { admin } = await usersRepositories.findOne(user_id)

  //const admin = true

  if(admin) {
    return next();
  }

  return response.status(401).json({
    error: "Sem Autorização",
  });
  }

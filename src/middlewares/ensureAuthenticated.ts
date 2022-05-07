import { Request, Response, NextFunction} from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
  sub: string;
}
export function ensureAuthenticated(request:Request, response:Response, next: NextFunction) {

  const authToken = request.headers.authorization;
  if(!authToken) {
    //return response.status(401).end(); --> mensagem padrão do 401
    return response.status(401).json({message: "Token ausente"});
  }

  // const token = authToken.split(" ")
  // console.log(token);

  const [,token] = authToken.split(" ");
  //console.log(token)

  try {

    //const decode = verify( token,"f9d08276bc85d30d578e8883f3c7e843")
    //console.log(decode);
    const { sub } = verify(token, "f9d08276bc85d30d578e8883f3c7e843") as IPayload;
    request.user_id = sub;
    return next();

  }catch(err) {

    return response.status(401).end();

  }


}
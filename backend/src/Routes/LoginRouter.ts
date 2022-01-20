import { Request, Response } from "express";
import { Router } from "express";
import "reflect-metadata";
import { createConnection } from "typeorm";
import { User } from "../entity/User";

function LoginRouter() {
  const userRouter = Router();
  const user = new User();

  createConnection()
    .then((connection) => {
      const userRepo = connection.getRepository(User);

      userRouter.post("/", async (req: Request, res: Response) => {
        console.log("start");
        console.log(req.body);
        // await userRepo.insert({
        //   username: req.body.username,
        //   realname: req.body.realname,
        // });
        if (req.body.password === "123") {
          res.status(200).send("Login Successfully");
        } else {
          res.status(500).send("Login Successfully");
        }
      });
    })
    .catch((error) => console.log(error));

  return userRouter;
}

export default LoginRouter;

import { Request, Response } from "express";
import { Router } from "express";
import "reflect-metadata";
import { createConnection } from "typeorm";
import { User } from "../entity/User";
import jwt from "jsonwebtoken";

function LoginRouter() {
  const userRouter = Router();
  const user = new User();

  createConnection()
    .then((connection) => {
      const userRepo = connection.getRepository(User);

      userRouter.post("/", async (req: Request, res: Response) => {
        console.log("start");
        console.log(req.body);

        const results = await userRepo.findOne({ Name: req.body.Name });
        console.log(results);
        if (req.body.password === "123" && results) {
          const payload = { Name: req.body.Name };
          const token = jwt.sign(payload, "secret", { expiresIn: 12000000 });
          console.log(token);
          res.status(200).send({ Msg: "Login Successfully", Token: token });
        } else {
          res.status(500).send("Login Fail");
        }
      });
    })
    .catch((error) => console.log(error));

  return userRouter;
}

export default LoginRouter;

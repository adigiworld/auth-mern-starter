import { Router } from "express";
import bcrypt from "bcrypt";
import { connectDatabase } from "../db.js";
import { createJWT } from "../utils/protect.js";

const login = Router();

login.route("/login").post(async (req, res) => {
  console.log("Request at : api/login");
  try {
    const { email, password } = req.body;
    console.log(email,password);
    const db = connectDatabase("learning");
    const user = await db.collection("users").findOne({ email });
    if (!user) {
      // res.status(401).json({ status: "user not exist" });
      res.sendStatus(401);
      return
    }
    const { _id: id, passwordHash, info, isVerified } = user;
    const isCorrectPW = await bcrypt.compare(password, passwordHash);
    if (isCorrectPW) {
      await createJWT({ id, email, info, isVerified })
        .then((token) => res.status(200).json({ token }))
        .catch((_e) =>
          res.status(500).json({ message: "Server Error: to get a token" })
        );
    } else {
      // res.status(401).json({ message: "Credentials are wrong" })
      res.sendStatus(401);
    }

  } catch (error) {
    console.log("Failed the login process");
    console.log(error);
  }
});

export { login }

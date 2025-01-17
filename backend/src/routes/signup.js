import { Router } from "express";
import { v4 as uuid } from "uuid";
import bcrypt from "bcrypt";
import { connectDatabase } from "../db.js";
import { createJWT } from "../utils/protect.js";
import { sendEmail } from "../utils/sendEmail.js";

const signup = Router();

signup.route("/signup").post(async (req, res) => {
  // console.log("Request at : api/signup");
  try {
    const { email, password } = req.body;
    const db = connectDatabase("learning");
    const user = await db.collection("users").findOne({ email: email });
    // console.log("Connected", email, password);
    if (user) {
      // res.status(409).json({ message: "user already exist" });
      res.sendStatus(409);
      return;
    }
    const salt = await bcrypt.genSalt(10)
    // .then(data => { console.log(data); return data; });
    const pwHash = await bcrypt.hash(password, salt);
    const verificationString = uuid();
    const startingInfo = {
      name: "",
      qualification: "",
      examStatus: "",
    };
    const result = await db.collection("users").insertOne({
      email: email,
      passwordHash: pwHash,
      info: startingInfo,
      isVerified: false,
      verificationString,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
    const { insertedId } = result;
    try {
      await sendEmail({
        to: email,
        from: "amrohaedu@gmail.com",
        subject: "Please verify your email",
        text: `Thanks for signing up!, click here: http://localhost:5173/verify-email/${verificationString}`,
        html: `<h1>Welcome to Auth MERN App</h1><p>Thanks for signing up!,<br/>click here: http://localhost:5173/verify-email/${verificationString}</p>`
      });
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
      return;
    }
    await createJWT({
      id: insertedId,
      email,
      info: startingInfo,
      isVerified: false,
    })
      .then((token) => res.status(200).json({ token }))
      .catch((err) => {
        console.log(err);
        res.status(500).json({ message: "Server Error" });
      });
  } catch (err) {
    console.log("Failed the signup process");
    console.log(err);
  }
});

export { signup }

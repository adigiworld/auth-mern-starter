import { Router } from "express";
import { ObjectId } from "mongodb";
import { sendEmail } from "../utils/sendEmail.js";
import { connectDatabase } from "../db.js";
import { createJWT } from "../utils/protect.js";

const email = Router();

email.route("/verify-email").put(async (req, res) => {
  console.log("Request At: /api/email/verify-email");
  const { verificationString } = req.body;
  // console.log(verificationString);
  const db = await connectDatabase("learning");
  const result = await db.collection("users").findOne({ verificationString });
  if (!result) { return res.status(401).json({ message: "The email verification code is incorrect" }); }
  const { _id: id, email, info } = result;
  await db.collection("users").updateOne({ _id: new ObjectId(id) }, { $set: { isVerified: true } });
  await createJWT({
    id,
    email,
    info,
    isVerified: true,
  })
    .then((token) => res.status(200).json({ token }))
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Server Error" });
    });
});

// email.route("/test-email").post(async (_req, res) => {
//   try {
//     sendEmail({
//       to: "amrohaedu+test1@gmail.com",
//       from: "amrohaedu@gmail.com",
//       subject: "Verification of Email",
//       text: "Is it working?",
//       html: "<h1>Welcome</h1>"
//     });
//     res.sendStatus(200);
//   } catch (err) {
//     console.error(err);
//     res.sendStatus(500);
//   }
// });
export { email }

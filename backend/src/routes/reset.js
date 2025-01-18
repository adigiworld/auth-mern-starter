import { Router } from "express";
import { v4 as uuid } from "uuid";
import bcrypt from "bcrypt";
import { connectDatabase } from "../db.js";
import { sendEmail } from "../utils/sendEmail.js";

const reset = Router();

reset.route("/forgot-password/:email").put(async (req, res) => {
  const { email } = req.params;
  // console.info(`Request At : forgot-password/${email}`);
  const db = await connectDatabase("learning");
  const pwResetCode = uuid();
  const result = await db.collection("users").updateOne({ email }, { $set: { passwordResetCode: pwResetCode } });
  // console.log(result);
  // if (result.nModified > 0) {
  if (result.modifiedCount > 0) {
    // console.log("Get email in DB");
    try {
      await sendEmail({
        to: email,
        from: "amrohaedu@gmail.com",
        subject: "Reset Password",
        text: `To reset your password, click this link: http://localhost:5173/reset-password/${pwResetCode}`,
        html: `<h1>To reset to password,</h1><br/><p>click this link: http://localhost:5173/reset-password/${pwResetCode}</p>`
      });
    } catch (err) {
      // console.error(err);
      return res.sendStatus(500);
    }
  }
  res.sendStatus(200);
});

reset.route("/:passwordResetCode/reset-password").put(async (req, res) => {
  const { newPassword } = req.body;
  const { passwordResetCode } = req.params;
  // console.log(`${newPassword}-${passwordResetCode}`);
  const newPwHash = await bcrypt.hash(newPassword, 10);
  const db = await connectDatabase("learning");
  const result = await db.collection("users").findOneAndUpdate({ passwordResetCode },
    { $set: { passwordHash: newPwHash }, $unset: { passwordResetCode: "" } });
  // console.log(result);
  if (result === null) {
    return res.sendStatus(404);
  }
  res.sendStatus(200);
});

export { reset };

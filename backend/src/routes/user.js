import { Router } from "express";
import { ObjectId } from "mongodb";
import { connectDatabase } from "../db.js";
import { createJWT } from "../utils/protect.js";

const user = Router();
user.route("/:userId").put(async (req, res) => {
  console.log("Request at : api/users");
  const { userId } = req.params;
  const updateInfo = (({ name, eduQualification, examStatus }) => ({
    name,
    eduQualification,
    examStatus,
  }))(req.body);
  // const { id, isVerified } = req.user;
  const { id } = req.user;
  if (id !== userId) {
    return res.status(403).json({ message: "Not allowed to update this user's info" });
  }
  // if (!isVerified) { return res.status(403).json({ message: "You need to verify your email, To update your info" }); }
  const db = connectDatabase("learning");
  const result = await db
    .collection("users")
    .findOneAndUpdate(
      { _id: new ObjectId(id) },
      // { inputId: id },
      { $set: { info: updateInfo, updatedAt: new Date().toISOString() } },
      { returnDocument: "after" }
    )
    .then((data) => {
      // console.log(data);
      return data;
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
  // const { email, info } = result;
  const { email, info, isVerified } = result;
  await createJWT({ id, email, info, isVerified })
    .then((token) => {
      return res.status(200).json({ token });
    })
    .catch((err) => {
      return res.status(200).json({ message: err });
    });
})

export { user }

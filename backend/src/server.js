import express, { json, urlencoded } from "express";
import { forgotPassword, login, signup, user } from "./routes/index.js";
import { protect } from "./utils/protect.js";
import { email } from "./routes/email.js";

const app = express();
const PORT = process.env.PORT || 8080;

app.use(urlencoded({ extended: true }));
app.use(json());

app.get("/", (_req, res) => {
  res.jsonp({ status: "OK" });
});

app.use("/api", login);
app.use("/api", signup);
app.use("/api", email);
app.use("/api", forgotPassword);
app.use("/api/users", protect, user);


export { app, PORT };

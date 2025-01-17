import express, { json, urlencoded } from "express";
import cors from "cors";
import { forgotPassword, login, signup, user } from "./routes/index.js";
import { protect } from "./utils/protect.js";
import { email } from "./routes/email.js";

const app = express();
const PORT = process.env.PORT || 8080;

app.use(urlencoded({ extended: true }));
app.use(json());
// app.use(express.static("../../frontend/dist/client/"));

app.use(cors({ orign: "http://localhost:5173" }));
app.use("/", (req, _res, next) => {
  console.warn(`${req.method} : ${req.url}`);
  next();
});

app.get("/", (_req, res) => {
  res.jsonp({ status: "OK" });
});

app.use("/api", login);
app.use("/api", signup);
app.use("/api/email", email);
app.use("/api", forgotPassword);
app.use("/api/users", protect, user);


export { app, PORT };

import jwt from "jsonwebtoken";

export const createJWT = async ({ id, email, info, isVerified }) => {
  const token = jwt.sign(
    { id: id, email: email, info: info, isVerified: isVerified },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
  return token;
};

export const protect = (req, res, next) => {
  const bearer = req.headers.authorization;
  if (!bearer) {
    res.status(401);
    res.json({ message: "Not Authorized" });
    return;
  }
  const [_, token] = bearer.split(" ");
  if (!token) {
    res.status(401);
    res.json({ message: "Not a valid Token" });
    return;
  }
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    next();
  } catch (err) {
    console.error(err);
    res.status(401);
    res.json({ message: "Not a valid Token" });
    return;
  }
};

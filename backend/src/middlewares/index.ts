import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

export const authMiddleware = (req: any, res: any, next: any) => {
  const json_data: { token: string } = req.body;
  console.log("in auth middleware");
  try {
    const token = json_data.token?.replace("Bearer ", "");
    console.log(token);
    if (!token) {
      return res
        .status(401)
        .json({ message: "No token, authorization denied" });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Token is not valid" });
  }
};

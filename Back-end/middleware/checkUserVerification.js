import db from "../database/models/index";
const { User } = db;

export const checkUserVerification = async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ where: { email } });

  if (!user) return res.status(400).json({ message: "User not found" });
  if (!user.isVerified)
    return res.status(401).json({ message: "Account not verified!" });

  next();
};

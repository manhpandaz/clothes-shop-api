import User from "../models/User.js";
import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  const encrypted = CryptoJS.AES.encrypt(
    req.body.password,
    process.env.SECRET_KEY
  ).toString();

  //   console.log(encrypted);
  const newUser = new User({
    name: req.body.name,
    username: req.body.username,
    email: req.body.email,
    password: encrypted,
  });

  try {
    const saveUser = await newUser.save();
    res.status(201).json(saveUser);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const login = async (req, res) => {
  try {
    const email = await User.findOne({
      email: req.body.email,
    });

    // console.log("email:", email);

    if (!email) return res.status(401).json("wrong credential");

    const decryptedPass = CryptoJS.AES.decrypt(
      email.password,
      process.env.SECRET_KEY
    );
    // console.log("decryptedPass:", decryptedPass);
    const OriginalPassword = decryptedPass.toString(CryptoJS.enc.Utf8);

    // console.log("OriginalPassword:", OriginalPassword);

    if (OriginalPassword !== req.body.password) {
      return res.status(401).json("wrong credential");
    }
    // console.log(OriginalPassword);
    // console.log("body password:", req.body.password);
    const accessToken = jwt.sign(
      {
        id: email._id,
        isAdmin: email.isAdmin,
      },
      process.env.JWT_SEC,
      {
        expiresIn: "3d",
      }
    );
    const { password, ...others } = email._doc;

    res.status(200).json({ ...others, accessToken });
  } catch (err) {
    res.status(500).json(err);
  }
};
export const logout = (req, res) => {};

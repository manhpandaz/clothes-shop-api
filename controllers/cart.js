import Cart from "../models/Cart.js";
import CryptoJS from "crypto-js";

export const addCart = async (req, res) => {
  const newCart = new Cart(req.body);
  try {
    const saveCart = newCart.save();
    res.status(200).json(saveCart);
  } catch (err) {
    res.status(500).json(err);
  }
};
export const getCart = async (req, res) => {
  try {
    const Cart = await Cart.findById(req.params.id);
    // console.log(Cart);
    // const { title, ...others } = Cart._doc;
    res.status(200).json(Cart);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getALLCart = async (req, res) => {
  try {
    const Carts = await Cart.find();
    res.status(500).json(Carts);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const updateCart = async (req, res) => {
  try {
    const update = await Cart.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );
    res.status(200).json(update);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const deleteCart = async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.status(200).json("this Cart has been deleted!");
  } catch (error) {
    res.status(500).json(error);
  }
};

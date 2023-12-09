import Product from "../models/Product.js";
import CryptoJS from "crypto-js";
export const addProduct = async (req, res) => {
  const newProduct = new Product(req.body);
  try {
    const saveProduct = newProduct.save();
    res.status(200).json(saveProduct);
  } catch (err) {
    res.status(500).json(err);
  }
};
export const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    // console.log(product);
    // const { title, ...others } = product._doc;
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getALLProduct = async (req, res) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;
  try {
    let products;
    if (qNew) {
      products = await Product.find().sort({ createAt: -1 }).limit(5);
    } else if (qCategory) {
      product = await Product.find({
        catergories: {
          $in: [qCategory],
        },
      });
    } else {
      products = await Product.find();
    }

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const updateProduct = async (req, res) => {
  try {
    const update = await Product.findByIdAndUpdate(
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

export const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json("this product has been deleted!");
  } catch (error) {
    res.status(500).json(error);
  }
};

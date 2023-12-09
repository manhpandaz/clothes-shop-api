import Order from "../models/Order.js";

export const addOrder = async (req, res) => {
  const newOrder = new Order(req.body);
  try {
    const saveOrder = newOrder.save();
    const { products, ...Others } = saveOrder;
    res.status(200).json(saveOrder);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getOrder = async (req, res) => {
  try {
    const Order = await Order.findById(req.params.id);
    // console.log(Order);
    // const { title, ...others } = Order._doc;
    res.status(200).json(Order);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getALLOrder = async (req, res) => {
  try {
    const Orders = await Order.find();
    res.status(500).json(Orders);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getIncome = async (req, res) => {
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));
  try {
    const income = await Order.aggregate([
      { $month: { createAt: { $gte: previousMonth } } },
      {
        $project: {
          month: { $month: "$createAt" },
          sale: "$amount",
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
    ]);

    res.status(200).json(income);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const updateOrder = async (req, res) => {
  try {
    const update = await Order.findByIdAndUpdate(
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

export const deleteOrder = async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).json("this Order has been deleted!");
  } catch (error) {
    res.status(500).json(error);
  }
};

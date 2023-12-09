import stripe from "stripe";
import payment from "../controllers/payment";

const key = stripe(process.env.STRIPE_KEY);

export default Payment = (req, res) => {
  key.charges.create(
    {
      source: req.body.tokenId,
      amount: req.body.amount,
      currency: "usd",
    },
    (stripErr, stripRes) => {
      if (stripErr) {
        res.status(500).json(stripErr);
      } else {
        res.status(200).json(stripRes);
      }
    }
  );
};

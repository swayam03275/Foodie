import Cart from "../models/cartModel.js";

export const addToCart = async (req, res) => {
  try {
    const { foodId, quantity, restaurantId } = req.body;
    const userId = req.user._id;

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: [{ foodId, quantity, restaurantId }] });
    } else {
      const itemIndex = cart.items.findIndex(
        item => item.foodId.toString() === foodId
      );

      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;
      } else {
        cart.items.push({ foodId, quantity, restaurantId });
      }
    }

    await cart.save();
    res.status(200).json(await cart.populate("items.foodId items.restaurantId"));
  } catch (error) {
    res.status(500).json({ message: "Error adding to cart", error });
  }
};

export const getCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const cart = await Cart.findOne({ userId }).populate("items.foodId items.restaurantId");
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: "Error fetching cart", error });
  }
};

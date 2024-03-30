const Cart = require('../models/cart.model');
const { v4: uuidv4 } = require('uuid'); // Importing uuidv4 from uuid package

exports.createCart = async (req, res) => {
  try {
    const { user, items, totalPrice } = req.body;
    const cartId = uuidv4(); // Generating unique cart ID
    const cart = new Cart({ cartId, user, items, totalPrice });
    const savedCart = await cart.save();
    res.status(201).json(savedCart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};





// Delete cart by ID
exports.deleteCart = async (req, res) => {
  try {
    const { cartId } = req.params;
    await Cart.findOneAndDelete({ cartId });
    res.json({ message: 'Cart deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get cart by ID
exports.getCartById = async (req, res) => {
  try {
    const { cartId } = req.params;
    const cart = await Cart.findOne({ cartId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update cart by ID
exports.updateCart = async (req, res) => {
  try {
    const { cartId } = req.params;
    const { items, totalPrice } = req.body;
    const updatedCart = await Cart.findOneAndUpdate({ cartId }, { items, totalPrice }, { new: true });
    if (!updatedCart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    res.json(updatedCart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


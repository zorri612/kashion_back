import Order from "../models/Order.js";
import Product from "../models/Product.js";

// Crear orden
export const createOrder = async (req, res) => {
  try {
    const { userId, items } = req.body;

    // Calcular total
    let total = 0;

    for (let item of items) {
      const product = await Product.findById(item.productId);

      if (!product) return res.status(404).json({ error: "Producto no encontrado" });

      if (product.stock < item.qty)
        return res.status(400).json({ error: `Stock insuficiente para ${product.name}` });

      // Restar stock
      product.stock -= item.qty;
      await product.save();

      total += product.price * item.qty;
    }

    const order = await Order.create({
      user: userId,
      items: items.map(i => ({
        product: i.productId,
        qty: i.qty,
        price: i.price
      })),
      total
    });

    return res.status(201).json(order);
  } catch (error) {
    return res.status(500).json({ error: "Error creando orden" });
  }
};

// Historial de compras
export const getOrdersByUser = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.params.userId })
      .populate("items.product")
      .sort({ createdAt: -1 });

    return res.json(orders);
  } catch (error) {
    return res.status(500).json({ error: "Error obteniendo órdenes" });
  }
};

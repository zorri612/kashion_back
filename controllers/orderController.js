import Order from "../models/Order.js";
import Product from "../models/Product.js";

// Crear orden
export const createOrder = async (req, res) => {
  try {
    const { userId, items } = req.body;

    let total = 0;

    for (let item of items) {
      const product = await Product.findById(item.productId);

      if (!product)
        return res.status(404).json({ error: "Producto no encontrado" });

      // Buscar la talla
      const tallaSeleccionada = product.tallas.find(
        (t) => t.talla === item.talla
      );

      if (!tallaSeleccionada)
        return res.status(400).json({
          error: `La talla ${item.talla} no existe para ${product.name}`
        });

      // Verificar stock de la talla
      if (tallaSeleccionada.stock < item.qty)
        return res.status(400).json({
          error: `Stock insuficiente en talla ${item.talla} para ${product.name}`
        });

      // Descontar stock en la talla específica
      tallaSeleccionada.stock -= item.qty;
      await product.save();

      // Calcular subtotal
      total += product.price * item.qty;
    }

    // Crear la orden
    const order = await Order.create({
      user: userId,
      items: items.map((i) => ({
        product: i.productId,
        talla: i.talla,
        qty: i.qty
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

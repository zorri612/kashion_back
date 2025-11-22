import Order from "../models/Order.js";
import Product from "../models/Product.js";
import nodemailer from "nodemailer";

import { sendPurchaseEmail } from "../utils/sendPurchaseEmail.js";
import User from "../models/User.js";

import dotenv from "dotenv";
dotenv.config();


// Crear orden
export const createOrder = async (req, res) => {
  try {
    const { userId, items } = req.body;

    let total = 0;

    for (let item of items) {
      const product = await Product.findById(item.productId);

      if (!product)
        return res.status(404).json({ error: "Producto no encontrado" });

      const tallaSeleccionada = product.tallas.find(
        (t) => t.talla === item.talla
      );

      if (!tallaSeleccionada)
        return res.status(400).json({
          error: `La talla ${item.talla} no existe para ${product.name}`
        });

      if (tallaSeleccionada.stock < item.qty)
        return res.status(400).json({
          error: `Stock insuficiente en talla ${item.talla} para ${product.name}`
        });

      tallaSeleccionada.stock -= item.qty;
      await product.save();

      total += product.price * item.qty;
    }

    const order = await Order.create({
      user: userId,
      items: items.map((i) => ({
        product: i.productId,
        talla: i.talla,
        qty: i.qty
      })),
      total
    });

    // ➜ Popular productos para poder enviarlos por correo
    const savedOrder = await Order.findById(order._id)
      .populate("items.product", "name image price");

    // Email del usuario (si lo tienes en DB)
    const user = await User.findById(userId);

    // Configurar nodemailer
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    // Generar HTML dinámico
    const itemsHTML = savedOrder.items
      .map(
        (i) => `
      <div style="margin-bottom: 20px;">
        <img src="${i.product.image}" width="120" style="border-radius: 8px;" />
        <p><strong>${i.product.name}</strong></p>
        <p>Talla: ${i.talla}</p>
        <p>Cantidad: ${i.qty}</p>
      </div>
    `
      )
      .join("");

    const mailOptions = {
      from: `"🛍️ KASHION ONLINE" <no-reply@kashion.com>`,
      to: user.email,
      subject: "✅Confirmación de tu compra!",
      html: `
        <h2>¡Gracias por tu compra!</h2>
        <p>Tu orden ha sido registrada exitosamente.</p>

        <h3>Detalles de la compra:</h3>
        ${itemsHTML}

        <h3>Total pagado: <strong>$${total.toLocaleString()}</strong></h3>

        <br />
        <p>Correo generado automáticamente, por favor no responder.</p>
        <p>Hecho con 💖 Kashion Store - Tienda Virtual</p>
      `
    };

    await transporter.sendMail(mailOptions);

    return res.status(201).json(savedOrder);
  } catch (error) {
    console.log(error);
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

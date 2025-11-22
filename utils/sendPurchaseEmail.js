import { transporter } from "../config/nodemailer.js";

export const sendPurchaseEmail = async (to, order) => {
  await transporter.sendMail({
    from: `"🛍️KASHION ONLINE" <${process.env.EMAIL_USER}>`,
    to,
    subject: "✅ Confirmación de compra - Kashion",
    html: `
      <h2>¡Gracias por tu compra!</h2>
      <p>Tu orden ha sido registrada exitosamente.</p>

      <h3>Detalles de la orden:</h3>
      <ul>
        ${order.items
          .map(
            (i) =>
              `<li>Producto: ${i.name} | Talla: ${i.talla} | Cantidad: ${i.qty}</li>`
          )
          .join("")}
      </ul>

      <p><strong>Total pagado:</strong> $${order.total.toLocaleString()}</p>

      <br />
      <p>Hecho con 💖 Kashion Store - Tienda Virtual</p>
    `,
  });
};

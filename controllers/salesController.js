import Sale from "../models/Sale.js";

export const createSale = async (req, res) => {
  const { userId, items } = req.body;

  try {
    const sale = await Sale.create({
      userId,
      items,
    });

    res.json({
      ok: true,
      saleId: sale._id,
    });

  } catch (e) {
    res.status(500).json({ ok: false, msg: "Error registrando venta" });
  }
};

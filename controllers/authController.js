import User from "../models/User.js";
import bcrypt from "bcryptjs";

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ ok: false, msg: "Usuario no existe" });

    const valid = bcrypt.compareSync(password, user.password);
    if (!valid)
      return res.status(400).json({ ok: false, msg: "Contraseña incorrecta" });

    res.json({
      ok: true,
      user: { id: user._id, name: user.name }
    });

  } catch (error) {
    res.status(500).json({ ok: false, msg: "Error en el servidor" });
  }
};

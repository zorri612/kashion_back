import User from "../models/User.js";

// Registrar usuario
export const registerUser = async (req, res) => {
  try {
    const { name,email, password } = req.body; //falta integrar password

    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ error: "Usuario ya registrado" });

    const user = await User.create({ name, email, password });

    return res.status(201).json(user);
  } catch (error) {
    return res.status(500).json({ error: "Error registrando usuario" });
  }
};

// Login
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "Usuario no encontrado" });

    return res.json(user);
  } catch (error) {
    return res.status(500).json({ error: "Error en login" });
  }
};

// Información de usuario
export const getUserInfo = async (req, res) => {
  try {
    const user = await User.findById(req.params.email);
    if (!user) return res.status(404).json({ error: "Usuario no encontrado" });

    return res.json(user);
  } catch (error) {
    return res.status(500).json(
      { error: "Error buscando usuario" },
      console.log(error)
    );
    
  }
};

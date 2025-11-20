import Product from "../models/Product.js";

// Crear producto
export const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    return res.status(201).json(product);
  } catch (error) {
    return res.status(500).json({ error: "Error creando producto", details: error.message });
  }
};

// Obtener todos los productos
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    return res.json(products);
  } catch (error) {
    return res.status(500).json({ error: "Error obteniendo productos" });
  }
};

// Obtener productos por categoría
export const getProductsByCategory = async (req, res) => {
  try {
    const { category } = req.body;
    const products = await Product.find({ category });
    return res.json(products);
  } catch (error) {
    return res.status(500).json({ error: "Error obteniendo productos" });
  }
};

// Obtener producto por ID
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product)
      return res.status(404).json({ error: "Producto no encontrado" });

    return res.json(product);
  } catch (error) {
    return res.status(500).json({ error: "Error buscando producto" });
  }
};

// Actualizar producto
export const updateProduct = async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    return res.json(updated);
  } catch (error) {
    return res.status(500).json({ error: "Error actualizando producto" });
  }
};

// Eliminar producto
export const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    return res.json({ message: "Producto eliminado" });
  } catch (error) {
    return res.status(500).json({ error: "Error eliminando producto" });
  }
};

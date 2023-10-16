import productService from "../services/product.service.js";

const createService = async (req, res) => {
  try {
    const { product, price, brand, description, inserted_by } = req.body;

    // Verificando se todos os campos foram enviados
    if (!product || !price || !brand || !inserted_by) {
      res.status(400).send({
        message: "Submit all fields for registration ",
      });
    }

    const createProduct = await productService.createService(req.body).catch((err) => console.log(err.message));
    
    if (!createProduct) {
      return res.status(400).send({
        message: "Error creating Product",
      });
    }
    
    res.status(201).send({
      message: "Product created successfully",
      user: {
        id: createProduct.id,
        product,
        price,
        brand,
        description,
        inserted_by,
      },
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
const deleteService = async (req, res) => {
  try {
    const { id } = req.params;
    await productService.deleteService(id);

    res.status(204).end();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const findAll = async (req, res) => {
  try {
    const product = await productService.findAllService();

    if (product.length === 0) {
      return res.status(204).send({
        message: "There are no registered products",
      });
    }
    res.send(product);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
const findById = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await productService.findByIdService(id);
    if (!product) {
      return res.status(404).send({ message: "Product not found" });
    }
    res.send(product);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
const update = async (req, res) => {
  try {
    const { _id, product, price, brand, description, inserted_by } = req.body;
    
    // Verificando se todos os campos foram enviados
    if (!product && !price && !brand && !description && !inserted_by) {
      res.status(400).send({
        message: "Submit at least one field for update",
      });
    }

    await productService.updateService(
      _id,
      product,
      price,
      brand,
      description,
      inserted_by
    );
    res.send({
      message: "Product successfully updated",
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
export default { createService, findAll, findById, update, deleteService };
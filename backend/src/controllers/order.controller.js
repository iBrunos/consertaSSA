import orderService from "../services/order.service.js";

const createService = async (req, res) => {
  try {
    const { type, status } = req.body;

    // Verificando se todos os campos foram enviados
    if (!type || !status) {
      res.status(400).send({
        message: "Submit all fields for registration ",
      });
    }
    // Obtendo o buffer da imagem
    const anexos = req.file ? req.file.buffer : null;

    const createOrder = await orderService.createService({
      type,
      status,
      anexos, // Passa o buffer do arquivo para a propriedade "anexos"
    });

    if (!createOrder) {
      return res.status(400).send({
        message: "Error creating User",
      });
    }

    res.status(201).send({
      message: "Order created successfully",
      user: {
        id: createOrder.id,
        type,
        status,
      },
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
const deleteService = async (req, res) => {
  try {
    const { id } = req.params;
    await orderService.deleteService(id);

    res.status(204).end();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const findAll = async (req, res) => {
  try {
    const order = await orderService.findAllService();

    if (order.length === 0) {
      return res.status(204).send({
        message: "There are no registered orders",
      });
    }
    res.send(order);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
const findById = async (req, res) => {
  try {
    const id = req.params.id;
    const order = await orderService.findByIdService(id);
    if (!order) {
      return res.status(404).send({ message: "Order not found" });
    }
    res.send(order);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
const update = async (req, res) => {
  try {
    const { _id, type, status} = req.body;

    // Verificando se todos os campos foram enviados
    if (!type || !status) {
      res.status(400).send({
        message: "Submit at least one field for update",
      });
    }

    const anexos = req.file ? req.file.buffer : null;

    await userService.updateService(
      _id,
      type,
      status,
      anexos
    );

    res.send({
      message: "Order successfully updated",
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: err.message });
  }
};
export default { createService, findAll, findById, update, deleteService };
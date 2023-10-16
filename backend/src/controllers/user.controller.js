import userService from "../services/user.service.js";

const createService = async (req, res) => {
  try {
    const { username, password, level, email, store, phone } = req.body;

    // Verificando se todos os campos foram enviados
    if (!username || !password || !level || !store || !email || !phone) {
      return res.status(400).send({
        message: "Submit all fields for resgistration",
      });
    }

    // Obtendo o buffer da imagem
    const avatar = req.file ? req.file.buffer : null;

    const createUser = await userService.createService({
      username,
      password,
      level,
      email,
      phone,
      store,
      avatar, // Passa o buffer do arquivo para a propriedade "avatar"
    });

    if (!createUser) {
      return res.status(400).send({
        message: "Error creating User",
      });
    }

    res.status(201).send({
      message: "User created successfully",
      user: {
        id: createUser.id,
        username,
        password,
        level,
        email,
        phone,
        store,
      },
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    await userService.deleteService(id);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const findAll = async (req, res) => {
  try {
    const user = await userService.findAllService();

    if (user.length === 0) {
      return res.status(400).send({
        message: "There are no registered users",
      });
    }
    res.send(user);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
const findById = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await userService.findByIdService(id);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    res.send(user);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
const update = async (req, res) => {
  try {
    const { _id, username, password, level, email,store, phone } = req.body;

    // Verificando se todos os campos foram enviados
    if (!username || !password || !level || !email || !store || !phone) {
      res.status(400).send({
        message: "Submit at least one field for update",
      });
    }

    const avatar = req.file ? req.file.buffer : null;

    await userService.updateService(
      _id,
      username,
      password,
      level,
      email,
      phone,
      store,
      avatar
    );

    res.send({
      message: "User successfully updated",
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: err.message });
  }
};

export default { createService, findAll, findById, update, deleteUser };

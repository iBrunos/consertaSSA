import companyService from "../services/company.service.js";

const createService = async (req, res) => {
  try {
    const { email, nome, tipo, senha, cnpj } = req.body;
    console.log('Conteúdo do corpo da solicitação (req.body):', req.body);
    console.log("email: ", email);
    console.log("nome: ", nome);
    console.log("tipo: ", tipo);
    console.log("senha: ", senha);
    console.log("cnpj: ", cnpj);

    // Verificando se todos os campos foram enviados
    if (!email || !nome || !tipo || !senha || !cnpj) {
      res.status(400).send({
        message: "Submit all fields for registration",
      });
    }

    const createCompany = await companyService.createService({
      email,
      nome,
      tipo,
      senha,
      cnpj

    });

    if (!createCompany) {
      return res.status(400).send({
        message: "Error creating Company",
      });
    }

    res.status(201).send({
      message: "Company created successfully",
      company: {
        id: createCompany.id,
        email,
        nome,
        tipo,
      },
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const deleteService = async (req, res) => {
  try {
    const { id } = req.params;
    await companyService.deleteService(id);

    res.status(204).end();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const findAll = async (req, res) => {
  try {
    const companies = await companyService.findAllService();

    if (companies.length === 0) {
      return res.status(204).send({
        message: "There are no registered companies",
      });
    }
    res.send(companies);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const findById = async (req, res) => {
  try {
    const id = req.params.id;
    const company = await companyService.findByIdService(id);

    if (!company) {
      return res.status(404).send({ message: "Company not found" });
    }

    res.send(company);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const update = async (req, res) => {
  try {
    const { _id, email, nome, tipo, senha } = req.body;

    // Verificando se pelo menos um campo foi enviado para atualização
    if (!email && !nome && !tipo && !senha) {
      res.status(400).send({
        message: "Submit at least one field for update",
      });
    }


    await companyService.updateService(_id, email, nome, tipo, senha);

    res.send({
      message: "Company successfully updated",
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: err.message });
  }
};

export default { createService, findAll, findById, update, deleteService };

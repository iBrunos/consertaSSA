import entryService from "../services/entry.service.js";

const createService = async (req, res) => {
    try {

        const { product, observation, amount, entry_price, store, inserted_by, type, expiration_date } = req.body;
        // Verificando se todos os campos foram enviados
        if (!product || !amount || !entry_price || !store || !inserted_by || !type || !expiration_date) {
            res.status(400).send({
                message: "Submit all fields for resgistration",
            });
        }

        const createEntry = await entryService.createService(req.body).catch((err) => console.log(err.message));
        if (!createEntry) {
            return res.status(400).send({
                message: "Error creating Entry",
            });
        }

        res.status(201).send({
            message: "Entry created successfully",
            user: {
                id: createEntry.id,
                product,
                observation,
                amount,
                entry_price,
                store,
                inserted_by,
                expiration_date,
                type,
            },
        });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};
const deleteEntry = async (req, res) => {
    const { id } = req.params;

    try {
        await entryService.deleteService(id);
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const findAll = async (req, res) => {
    try {
        const entry = await entryService.findAllService();

        if (entry.length === 0) {
            return res.status(204).send({
                message: "There are no registered entrys",
            });
        }
        res.send(entry);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};
const findById = async (req, res) => {
    try {
        const id = req.params.id;
        const product = await entryService.findByIdService(id);
        if (!product) {
            return res.status(404).send({ message: "Entry not found" });
        }
        res.send(product);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};
const update = async (req, res) => {
    try {
      const { _id, product, observation, amount, entry_price, store, inserted_by, type, expiration_date, in_stock } = req.body;
      // Verificando se todos os campos foram enviados
      if (!product && !observation && !amount && !entry_price && !store && !inserted_by && !type && !expiration_date) {
        res.status(400).send({
          message: "Submit at least one field for update",
        });
      }
      
  
      await entryService.updateService(
        _id,
        product,
        observation,
        amount,
        entry_price,
        inserted_by,
        store,
        type,
        expiration_date,
        in_stock
      );
  
      res.send({
        message: "Entry successfully updated",
      });
    } catch (err) {
      console.log(err);
      res.status(500).send({ message: err.message });
    }
  };
  

export default { createService, findAll, findById, update, deleteEntry };
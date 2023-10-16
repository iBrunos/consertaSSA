import Entry from '../models/Entry.js';

const createService = (body) => Entry.create(body);

const findAllService = () => Entry.find();

const findByIdService = (id) => Entry.findById(id);

const updateService = (id, product, observation, amount, entry_price, store, inserted_by, type, expiration_date, in_stock ) => Entry.findOneAndUpdate({_id: id}, {product, observation, amount, entry_price, store, inserted_by, type, expiration_date, in_stock });

const deleteService = (id) => Entry.findOneAndDelete({_id: id});
export default {
    createService,
    findAllService,
    findByIdService,
    updateService,
    deleteService // nova função de delete
};
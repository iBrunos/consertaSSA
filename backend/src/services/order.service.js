import Order from '../models/Order.js';

const createService = (body) => Order.create(body)

const findAllService = () => Order.find();

const findByIdService = (id) => Order.findById(id);

const updateService = (id, type, status, anexos) => Order.
findOneAndUpdate({_id: id},{type, status, anexos});

const deleteService = (id) => Order.findOneAndDelete({_id: id});
export default {
    createService,
    findAllService,
    findByIdService,
    updateService,
    deleteService
};
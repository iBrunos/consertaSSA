import Company from '../models/Company.js';

const createService = (body) => Company.create(body)

const findAllService = () => Company.find();

const findByIdService = (id) => Company.findById(id);

const updateService = (id, type, status, anexos) => Company.
findOneAndUpdate({_id: id},{type, status, anexos});

const deleteService = (id) => Company.findOneAndDelete({_id: id});
export default {
    createService,
    findAllService,
    findByIdService,
    updateService,
    deleteService
};
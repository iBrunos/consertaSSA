import Stock from '../models/Stock.js';

const createService = (body) => Stock.create(body);

const findAllService = () => Stock.find();

const findByIdService = (id) => Stock.findById(id);

const updateService = (id, quantity) => Stock.findOneAndUpdate({ _id: id }, { quantity }, { new: true });

const deleteService = (id) => Stock.findOneAndDelete({ _id: id });

const findByProductService = (productName) => Stock.findOne({ product: productName });

export default {
  createService,
  findAllService,
  findByIdService,
  updateService,
  deleteService,
  findByProductService,
};

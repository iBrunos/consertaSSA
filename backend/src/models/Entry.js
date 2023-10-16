import mongoose from 'mongoose';
import Stock from './Stock.js';

const EntrySchema = new mongoose.Schema({
  product: {
    type: String,
    required: true,
    unique: false,
  },
  observation: {
    type: String,
    unique: false,
  },
  amount: {
    type: Number,
    required: true,
    unique: false,
  },
  entry_price: {
    type: Number,
    required: true,
    unique: false,
  },
  store: {
    type: String,
    enum: ['Loja 01', 'Loja 02'],
    required: true,
  },
  inserted_by: {
    type: String,
    required: true,
    unique: false,
  },
  type: {
    type: String,
    required: true,
    unique: false,
  },
  in_stock: {
    type: Boolean,
    required: true,
    unique: false,
    default: true,
  },
  expiration_date: {
    type: String,
    required: true,
    unique: false,
  },
}, );

// hook de pós-salvamento para atualizar a quantidade no estoque (Create)
EntrySchema.post('save', async function (doc) {
  const stock = await Stock.findOne({ product: doc.product });
  stock.quantity += doc.amount;
  await stock.save();
});

// hook de pós-remoção para atualizar a quantidade no estoque (Delete)
EntrySchema.post('findOneAndDelete', async function (doc, next) {
  const stock = await Stock.findOne({ product: doc.product });
  stock.quantity -= doc.amount;
  await stock.save();
  next();
});

// hook de pós-atualização para atualizar a quantidade no estoque (Update)
EntrySchema.post('findOneAndUpdate', async function (doc) {
  const entry = await Entry.findById(doc._id);
  const diffAmount = entry.amount - doc.amount;
  const stock = await Stock.findOne({ product: entry.product });
  stock.quantity += diffAmount;
  await stock.save();
});


const Entry = mongoose.model("Entrys", EntrySchema);

export default Entry;
import mongoose from 'mongoose';
import Stock from './Stock.js';
const ExitSchema = new mongoose.Schema({
    product: {
      type: String,
      required: true,
      unique: false,
    },
    observation: {
      type: String,
      required: false,
      unique: false,
    },
    amount: {
      type: Number,
      required: true,
      unique: false,
    },
    exit_price: {
      type: Number,
      required: true,
      unique: false,
    },
    inserted_by: {
      type: String,
      required: true,
      unique: false,
    },
    payment: {
      type: String,
      required: true,
      unique: false,
    },
    store: {
      type: String,
      enum: ['Todas','Loja 01', 'Loja 02'],
      required: true,
  },
    type: {
      type: String,
      required: true,
      unique: false,
    }
}, { timestamps: true });

// hook de pós-salvamento para atualizar a quantidade no estoque
ExitSchema.post('save', async function (doc) {
  const stock = await Stock.findOne({ product: doc.product });
  stock.quantity -= doc.amount;
  await stock.save();
});
// hook de pré-remoção para atualizar a quantidade no estoque
ExitSchema.post('findOneAndDelete', async function (doc, next) {
const stock = await Stock.findOne({ product: doc.product });
stock.quantity += doc.amount;
await stock.save();
next();
});
// hook de pós-remoção para atualizar a quantidade no estoque (Update)
ExitSchema.post('findOneAndUpdate', async function (doc) {
  const entry = await Exit.findById(doc._id);
  const diffAmount = doc.amount - entry.amount;
  const stock = await Stock.findOne({ product: entry.product });
  stock.quantity += diffAmount;
  await stock.save();
});


const Exit = mongoose.model("Exits", ExitSchema);

export default Exit;
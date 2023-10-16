import mongoose from 'mongoose';

const StockSchema = new mongoose.Schema({
    product: {
        type: String,
        require: true,
        unique: true,
    },
    id_product: {
        type: String,
        require: true,
    },
    quantity: { 
        type: Number, 
        default: 0 
    }
}, {
    timestamps: { createdAt: true, updatedAt: true }
});

const Stock = mongoose.model("Stock", StockSchema);

export default Stock;

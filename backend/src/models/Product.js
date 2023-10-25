import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
    Type: {
        type: String,
        require: true,
        unique: true,
    },
    Status: { 
        type: Number, 
        require: true,
    },
    Anexos: {
        type: String,
        require: true,
    },
});


const Product = mongoose.model("Products", OrderSchema);

export default Product;
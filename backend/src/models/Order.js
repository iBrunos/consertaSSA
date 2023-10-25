import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
    Type: {
        type: String,
        require: true,
        enum: ['Conserto de rua', 'Vazamento', 'Esgoto'],

    },
    Status: { 
        type: String, 
        enum: ['Aberto', 'Fechado', 'Em andamento'],
        require: true,
    },
    Anexos: {
        type: Buffer,
        require: true,
    },
});

const Order = mongoose.model("Orders", OrderSchema);

export default Order;
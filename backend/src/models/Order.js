import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
    },
    status: { 
        type: String, 
        required: true,
    },
    anexos: {
        type: Buffer
    },
}, {
    timestamps: true, // Add timestamps for createdAt and updatedAt
});

const Order = mongoose.model("Orders", OrderSchema);

export default Order;

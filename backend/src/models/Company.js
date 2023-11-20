import mongoose from 'mongoose';

const CompanySchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    nome: {
        type: String,
        required: true,
    },
    tipo: {
        type: String,
        required: true,
    },
    senha: {
        type: String,
        required: true,
    },
    cnpj: {
        type: String,
        required: true,
    },
}, {
    timestamps: true, // Adiciona timestamps para createdAt e updatedAt
});

const Company = mongoose.model("Companies", CompanySchema);

export default Company;

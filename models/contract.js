import mongoose from "mongoose";

const contractSchema = mongoose.Schema({
    suppervendorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    startDate: {
        type: String,
        required: true
    },
    endDate: {
        type: String,
        required: true
    },
    contractAmount: {
        type: Number,
        required: true
    }
});

const Contract = mongoose.model("Contract", contractSchema);
export default Contract;

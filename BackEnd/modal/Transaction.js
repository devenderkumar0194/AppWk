const { required } = require('joi');
const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        default: 'N/A',
    },
    desc: {
        type: String,
        required: true,
    },
    credit: {
        type: Number,
        required: true,
    },
    debit: {
        type: Number,
        required: true,
    },
    balence: {
        type: Number,
        required: true,
    },
  },
  {
    timestamps: true
  }
);

const TransactionModal = mongoose.model('Transaction', TransactionSchema);
module.exports = TransactionModal;
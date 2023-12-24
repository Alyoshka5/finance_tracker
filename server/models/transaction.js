const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TransactionSchema = new Schema({
    amount: { type: Number, required: true },
    type: { type: String, required: true, enum: ['Expense', 'Income'], default: 'Expense' },
    date: { type: Date, default: Date.now },
    category: { type: String },
    description: { type: String, maxLength: 200 },
    details: { type: String, maxLength: 500 }
})

module.exports = mongoose.model('Transaction', TransactionSchema);
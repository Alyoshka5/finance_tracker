const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TransactionSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    amount: { type: Number, required: true },
    type: { type: String, required: true, enum: ['Expense', 'Income'], default: 'Expense' },
    date: { type: Date, default: Date.now },
    category: { type: String },
    description: { type: String, maxLength: 200 },
    details: { type: String, maxLength: 500 },
    dateCreated: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Transaction', TransactionSchema);
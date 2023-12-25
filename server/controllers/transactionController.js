const asyncHandler = require('express-async-handler');

const Transaction = require('../models/transaction');

exports.list = asyncHandler(async (req, res, next) => {
    const transactions = await Transaction.find({ user: req.userId }).exec();

    res.json(transactions);
});

exports.create = asyncHandler(async (req, res, next) => {

    const transaction = new Transaction({
        user: req.userId,
        ...req.body
    });

    await transaction.save();
    
    res.json(transaction);
});

exports.update = asyncHandler(async (req, res, next) => {
    res.json({})
});

exports.delete = asyncHandler(async (req, res, next) => {
    res.json({})
});

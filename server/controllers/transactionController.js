const asyncHandler = require('express-async-handler');

const Transaction = require('../models/transaction');

exports.list = asyncHandler(async (req, res, next) => {
    const transactions = await Transaction.find({}).exec();

    res.json(transactions);
});

exports.create = asyncHandler(async (req, res, next) => {
    res.json({})
});

exports.update = asyncHandler(async (req, res, next) => {
    res.json({})
});

exports.delete = asyncHandler(async (req, res, next) => {
    res.json({})
});

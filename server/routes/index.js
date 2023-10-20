const express = require('express');
const router = express.Router();

const transactionController = require('../controllers/transactionController')


// transactions
router.get('/transactions', transactionController.list);

router.post('/transaction/create', transactionController.create);

router.put('/transaction/:id/update', transactionController.update);

router.delete('/transaction/:id/delete', transactionController.delete);


module.exports = router;

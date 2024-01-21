const express = require('express');
const router = express.Router();

const transactionController = require('../controllers/transactionController')


router.get('/', transactionController.list);

router.post('/', transactionController.create);

router.put('/', transactionController.update);

router.delete('/:id', transactionController.delete);


module.exports = router;

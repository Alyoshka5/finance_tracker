const express = require('express');
const router = express.Router();

const transactionController = require('../controllers/transactionController')


router.get('/', transactionController.list);

router.post('/create', transactionController.create);

router.put('/:id/update', transactionController.update);

router.delete('/:id/delete', transactionController.delete);


module.exports = router;

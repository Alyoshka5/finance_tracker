const express = require('express');
const router = express.Router();

const transactionController = require('../controllers/transactionController')
const userController = require('../controllers/userController');


// transactions
router.get('/transactions', transactionController.list);

router.post('/transaction/create', transactionController.create);

router.put('/transaction/:id/update', transactionController.update);

router.delete('/transaction/:id/delete', transactionController.delete);


// users
router.post('/signup', userController.signup);

router.post('/login', userController.login)

module.exports = router;

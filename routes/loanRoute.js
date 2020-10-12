const express = require('express');
const loanController = require('./../controllers/loanController');

const router = express.Router();

router.post('/createLoan', loanController.createLoan);
router.get('/getLoan/:email', loanController.getAllLoan);


module.exports = router;
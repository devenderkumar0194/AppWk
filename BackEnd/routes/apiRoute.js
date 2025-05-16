const express = require('express');
const apiRouter = express.Router();

const TransactionController = require('../controller/TransactionController');

apiRouter.post("/add-trns", TransactionController.addTrns);
apiRouter.get("/trns-list", TransactionController.trnsList);

module.exports = apiRouter;
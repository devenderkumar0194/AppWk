const express = require('express');
const apiRouter = express.Router();

const TransactionController = require('../controller/TransactionController');
const UserController = require('../controller/UserController');


apiRouter.post("/register", UserController.register);
apiRouter.post("/login", UserController.login);

apiRouter.post("/add-trns", TransactionController.addTrns);
apiRouter.get("/trns-list", TransactionController.trnsList);

module.exports = apiRouter;
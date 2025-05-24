const express = require('express');
const apiRouter = express.Router();
const apiAuthRouter = express.Router();

const TransactionController = require('../controller/TransactionController');
const UserController = require('../controller/UserController');
const userMiddleware = require('../middleware/userMiddleware');

apiRouter.post("/register", UserController.register);
apiRouter.post("/login", UserController.login);
apiRouter.get("/logout", UserController.logout);


// auth routes 
// apiAuthRouter.get("/dashboard", UserController.dashboard);
// apiAuthRouter.get("/about-us", UserController.aboutUs);
apiAuthRouter.get("/user-detiails", UserController.userUetiails);

apiAuthRouter.post("/add-trns", TransactionController.addTrns);
apiAuthRouter.get("/trns-list", TransactionController.trnsList);


// apiAuthRouter.post("/update-profile", upload.single('image') ,UserController.updateProfile);

apiRouter.use('/', userMiddleware.authCheck ,apiAuthRouter);

module.exports = apiRouter;
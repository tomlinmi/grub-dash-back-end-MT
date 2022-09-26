const router = require("express").Router();
const controller = require("./orders.controller");

const methodNotAllowed = require("../errors/methodNotAllowed");


// TODO: Implement the /orders routes needed to make the tests pass
/*In the src/orders/orders.router.js file, add two routes: 
/orders, and /orders/:orderId and attach the handlers 
(create, read, update, delete, and list) exported from src/orders/orders.controller.js.*/

router.route("/:orderId").get(controller.read).all(methodNotAllowed);

router.route("/").get(controller.list).all(methodNotAllowed);

router
  .route("/:orderId")
  .get(controller.read)
  .put(controller.update)
  .all(methodNotAllowed);

router
  .route("/")
  .get(controller.list)
  .post(controller.create)
  .all(methodNotAllowed);


  module.exports = router;
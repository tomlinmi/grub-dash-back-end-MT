const path = require("path");

// Use the existing order data
const orders = require(path.resolve("src/data/orders-data"));

// Use this function to assigh ID's when necessary
const nextId = require("../utils/nextId");

// TODO: Implement the /orders handlers needed to make the tests pass
/*In the src/orders/orders.controller.js
 file, add handlers and middleware functions to
create, read, update, delete, and list orders.*/

function create(req, res) {
    const { data: { deliverTo, mobileNumber, status, dishId, dishName, dishImage_Url, dishPrice, dishQuantity } = {} } = req.body;
 const newOrder ={
    id:++nextId,
    deliverTo: deliverTo,
    mobileNumber: mobileNumber,
    status: status,
    dishId: dishes.id,
    dishName:dishes.name,
    dishImage_Url: dishes.image_url,
    dishPrice:dishes.dishPrice,
    dishQuantity: dishes.quantity,
 }; 
    orders.push(newOrder);
    res.status(201).json({ data: newOrder });
  }


function read(req, res, next) {
    res.json({ data: res.locals.order });
  };

 

function update(req, res) {
    const order = res.locals.order;
   
     const { data: { text } = {} } = req.body;
   
   order.text = text;
   
     res.json({ data: order });
   }
 /*
function list(req, res) {
    res.json({ data: orders });
  }
*/

function list(req, res) {
    const { dishId } = req.params;
    res.json({ data: orders.filter(dishId ? order => order.dishes.id == dishId : () => true) });
  }



  function destroy(req, res) {
    const { orderId } = req.params;
    const index = orders.findIndex((order) => order.id === Number(orderId));
    if (index > -1) {
      orders.splice(index, 1);
    }
    res.sendStatus(204);
  }




  function orderExists(req, res, next) {
    const orderId = Number(req.params.orderId);
    const foundOrder = orders.find((order) => order.id === orderId);
    if (foundOrder) {
      res.locals.order=foundOrder;
      return next();
    }
    next({
      status: 404,
      message: `Order id not found: ${req.params.orderId}`,
    });
  }

  function bodyDataHas(propertyName) {
    return function (req, res, next) {
      const { data = {} } = req.body;
      if (data[propertyName]) {
        return next();
      }
      next({
          status: 400,
          message: `Must include a ${propertyName}`
      });
    };
  }
/*
  function nameHasText(req, res, next) {
    const { data: { name } = {} } = req.body;
  
    if (name) {
      return next();
    }
    next({ status: 400, message: "Dish must include a name" });
  }
*/
  module.exports = {
    create: [ create],
    list,
    read: [orderExists, read],
    update: [orderExists, bodyDataHas, update],
    delete: [orderExists, destroy],
    orderExists,
  };
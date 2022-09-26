const path = require("path");

// Use the existing dishes data
const dishes = require(path.resolve("src/data/dishes-data"));

// Use this function to assign ID's when necessary
const nextId = require("../utils/nextId");

// TODO: Implement the /dishes handlers needed to make the tests pass
/*In the src/dishes/dishes.controller.js file, add handlers and middleware functions to 
create, read, update, and list dishes. Note that dishes cannot be deleted.*/


function create(req, res) {
    const { data: { name, description, price, image_url, } = {} } = req.body;
 const newDish ={
    id:++nextId,
    name:name,
    description:description,
    price: price,
    image_rl:image_url,
 }; 
    orders.push(newDish);
    res.status(201).json({ data: newDish });
  }


function read(req, res, next) {
    res.json({ data: res.locals.dish });
  };

 

function update(req, res) {
    const dish = res.locals.dish;
    const { data: { name, description, price, image_url } = {} } = req.body;
   
   dish.name = name;
   dish.description = description;
   dish.price = price;
   dish.image_url = image_url;
   
     res.json({ data: dish });
   }
 
function list(req, res) {
    res.json({ data: dishes });
  }


  function dishExists(req, res, next) {
    const dishId = Number(req.params.dishId);
    const foundDish = dishes.find((dish) => dish.id === dishId);
    if (foundDish) {
      res.locals.dish=foundDish;
      return next();
    }
    next({
      status: 404,
      message: `Dish does not exist:${req.params.dishId}`,
    });
  }


  function idDoesntMatch(req, res, next){


  }
  
  function bodyDataHas(propertyName) {
    return function (req, res, next) {
      const { data = {} } = req.body;
      if (data[propertyName]) {
        return next();
      }
      next({
          status: 400,
          message: `Dish must include a ${propertyName}`
      });
    };
  }

function priceNotValid(req, res, next){
    const { data: { price }  = {} } = req.body;
    if (price <= 0|| !Number.isInteger(price) ){
        return next({
            status: 400,
            message: "Dish must have a price that is an integer greater than 0"`
        });
    }
    next();
  }



  function hasImage_Url(req, res, next){

    const { data: { image_url } = {} } = req.body;

    if (image_url) {
      return next();
    }
    next({ status: 400, message: "Dish must include a image_url" });
  };

  
  

  module.exports = {
    create: [
        bodyDataHas("name"),
        bodyDataHas("description"),
        bodyDataHas("price"),
        bodyDataHas("image_url"),   
        priceNotValid,
        hasImage_Url, 
        create],
    list,
    read: [dishExists, read],
    update: [dishExists, 
        bodyDataHas("name"),
        bodyDataHas("description"),
        bodyDataHas("price"),
        bodyDataHas("image_url"),   
        priceNotValid,
        hasImage_Url,
        idDoesntMatch,
        
        update],
    dishExists,
  };
  
  
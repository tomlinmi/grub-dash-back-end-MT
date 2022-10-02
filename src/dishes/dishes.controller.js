const path = require("path");

// Use the existing dishes data
const dishes = require(path.resolve("src/data/dishes-data"));

// Use this function to assign ID's when necessary
const nextId = require("../utils/nextId");


//validation middlewares

function dishExists(req, res, next) { 
  const { dishId } = req.params; 
  const foundDish = dishes.find((dish) => dish.id == dishId); 
    if (foundDish) { res.locals.dish = foundDish;  
     return next(); 
                   } next({ status: 404, message: `Dish does not exist: ${dishId}` }); }

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


function hasValidPrice(req, res, next) { 
  const { data: { price } = {} } = req.body; 
 if (Number(price) > 0 && Number.isInteger(price)) { 
 return next(); } 
 next({ status: 400, message: `Dish must have a price that is an integer greater than 0` });
  }


function hasImage_Url(req, res, next){

    const { data: { image_url } = {} } = req.body;

    if (image_url) {
      return next();
    }
    next({ status: 400, message: "Dish must include a image_url" });
  };

  function hasValidId(req, res, next) { const { dishId } = req.params; const { data: { id } = {} } = req.body; if (id) { if (id === dishId) { return next(); } return next({ status: 400, message: `Dish id does not match route id. Dish: ${id}, Route: ${dishId}`, }); } next(); }



// TODO: Implement the /dishes handlers needed to make the tests pass
/*In the src/dishes/dishes.controller.js file, add handlers and middleware functions to 
create, read, update, and list dishes. Note that dishes cannot be deleted.*/

function create(req, res) {
    const { data: { name, description, price, image_url, } = {} } = req.body;
const newDish = { id: nextId(), name, description, price, image_url }; 
    dishes.push(newDish);
    res.status(201).json({ data: newDish });
  }


function read(req, res) {
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


  

  module.exports = {
    create: [
        bodyDataHas("name"),
        bodyDataHas("description"),
        bodyDataHas("price"),
        bodyDataHas("image_url"),   
        hasValidPrice,
        hasImage_Url, 
        create],
    list,
    read: [dishExists, read],
    update: [
        dishExists, 
        bodyDataHas("name"),
        bodyDataHas("description"),
        bodyDataHas("price"),
        bodyDataHas("image_url"),
       
        hasValidPrice,
        hasImage_Url,
        hasValidId,
        update],
    
  };
  
  
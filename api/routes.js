'use strict';
module.exports = function(app) {
  let productsCtrl = require('./Controllers/ProductsController');
  let formCtrl = require('./Controllers/FormController');
  let accCtrl = require('./Controllers/AccountControllers')
  // todoList Routes
  app.route('/process')
    .get(formCtrl.get)
    .post(formCtrl.create)
    .put(formCtrl.search);

  app.route('/process/:id')
    .get(formCtrl.detail)
    .put(formCtrl.update)
    .delete(formCtrl.delete);

  app.route('/login').post(accCtrl.post);

  app.route('/register')
    .put(accCtrl.put)
    .post(accCtrl.checkUserExist);
    
  app.route('/checkEmail').post(accCtrl.checkEmailExist);

  app.route('/products')
    .get(productsCtrl.get)
    .post(productsCtrl.store);
    
  app.route('/products/:productId')
    .get(productsCtrl.detail)
    .put(productsCtrl.update)
    .delete(productsCtrl.delete);

  
};
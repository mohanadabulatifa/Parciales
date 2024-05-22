'use strict'
const RestaurantCategoryController = require('../controllers/RestaurantCategoryController')
const RestaurantCategoryValidation = require('../controllers/validation/RestaurantValidation')

module.exports = (options) => {
  const app = options.app
  const middlewares = options.middlewares

  app.route('/restaurantCategories')
    .get(RestaurantCategoryController.indexRestaurantCategory)
    .post(
      middlewares.isLoggedIn,
      middlewares.hasRole('owner'),
      RestaurantCategoryValidation.create,
      middlewares.handleValidation,
      RestaurantCategoryController.create

    )
}

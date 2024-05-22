const { check } = require('express-validator')
const { checkFileIsImage, checkFileMaxSize } = require('./FileValidationHelper')
const maxFileSize = 2000000 // around 2Mb
const { Restaurant } = require('../../models')

const checkCodeMismoPropExists = async (value, { req }) => {
  try {
    const restaurantCodigo = await Restaurant.findOne({
      where: { codigo: value }
    })
    if (restaurantCodigo === null) {
      return Promise.resolve()
    } else { Promise.reject(new Error('No puedes utilizar el mismo codigo de otro restaurante tuyo.')) }
  } catch (err) {
    return Promise.reject(new Error(err))
  }
}

module.exports = {
  create: [
    check('name').exists().isString().isLength({ min: 1, max: 255 }).trim(),
    check('description').optional({ nullable: true, checkFalsy: true }).isString().trim(),
    check('address').exists().isString().isLength({ min: 1, max: 255 }).trim(),
    check('postalCode').exists().isString().isLength({ min: 1, max: 255 }),
    check('url').optional({ nullable: true, checkFalsy: true }).isString().isURL().trim(),
    check('shippingCosts').exists().isFloat({ min: 0 }).toFloat(),
    check('email').optional({ nullable: true, checkFalsy: true }).isString().isEmail().trim(),
    check('phone').optional({ nullable: true, checkFalsy: true }).isString().isLength({ min: 1, max: 255 }).trim(),
    check('restaurantCategoryId').exists({ checkNull: true }).isInt({ min: 1 }).toInt(),
    check('codigo').optional({ nullable: true, checkFalsy: true }).isString().isLength({ min: 1, max: 10 }).trim(),
    check('porcentajeDiscount').optional({ nullable: true, checkFalsy: true }).isInt({ min: 1, max: 99 }).toInt(),
    check('codigo').custom(checkCodeMismoPropExists),
    check('promocion').optional({ nullable: true, checkFalsy: true }).isFloat({ min: 0, max: 100 }).toFloat,
    check('userId').not().exists(),
    check('heroImage').custom((value, { req }) => {
      return checkFileIsImage(req, 'heroImage')
    }).withMessage('Please upload an image with format (jpeg, png).'),
    check('heroImage').custom((value, { req }) => {
      return checkFileMaxSize(req, 'heroImage', maxFileSize)
    }).withMessage('Maximum file size of ' + maxFileSize / 1000000 + 'MB'),
    check('logo').custom((value, { req }) => {
      return checkFileIsImage(req, 'logo')
    }).withMessage('Please upload an image with format (jpeg, png).'),
    check('logo').custom((value, { req }) => {
      return checkFileMaxSize(req, 'logo', maxFileSize)
    }).withMessage('Maximum file size of ' + maxFileSize / 1000000 + 'MB')
  ],
  update: [
    check('name').exists().isString().isLength({ min: 1, max: 255 }).trim(),
    check('description').optional({ nullable: true, checkFalsy: true }).isString().trim(),
    check('address').exists().isString().isLength({ min: 1, max: 255 }).trim(),
    check('postalCode').exists().isString().isLength({ min: 1, max: 255 }),
    check('url').optional({ nullable: true, checkFalsy: true }).isString().isURL().trim(),
    check('shippingCosts').exists().isFloat({ min: 0 }).toFloat(),
    check('email').optional({ nullable: true, checkFalsy: true }).isString().isEmail().trim(),
    check('phone').optional({ nullable: true, checkFalsy: true }).isString().isLength({ min: 1, max: 255 }).trim(),
    check('promocion').optional({ nullable: true, checkFalsy: true }).isFloat({ min: 0, max: 100 }).toFloat,
    check('restaurantCategoryId').exists({ checkNull: true }).isInt({ min: 1 }).toInt(),
    check('userId').not().exists(),
    check('heroImage').custom((value, { req }) => {
      return checkFileIsImage(req, 'heroImage')
    }).withMessage('Please upload an image with format (jpeg, png).'),
    check('heroImage').custom((value, { req }) => {
      return checkFileMaxSize(req, 'heroImage', maxFileSize)
    }).withMessage('Maximum file size of ' + maxFileSize / 1000000 + 'MB'),
    check('logo').custom((value, { req }) => {
      return checkFileIsImage(req, 'logo')
    }).withMessage('Please upload an image with format (jpeg, png).'),
    check('logo').custom((value, { req }) => {
      return checkFileMaxSize(req, 'logo', maxFileSize)
    }).withMessage('Maximum file size of ' + maxFileSize / 1000000 + 'MB')
  ]
}

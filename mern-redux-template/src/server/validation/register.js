const Validator = require('validator')
const _ = require('lodash')
module.exports = function validateRegisterInput(data) {
  let errors = {}
  const validatorName = !_.isEmpty(data.name) ? data.name : ''
  const validatorEmail = !_.isEmpty(data.email) ? data.email : ''
  const validatorPassword = !_.isEmpty(data.password) ? data.password : ''
  const validatorPassword2 = !_.isEmpty(data.password2) ? data.password2 : ''

  if(!Validator.isLength(validatorName, { min: 2, max: 30 })) {
    errors.name = 'Name must be between 2 and 30 characters'
  }

  if(Validator.isEmpty(validatorName)) {
    errors.name = 'Name is required'
  }
  if(Validator.isEmpty(validatorEmail)) {
    errors.email = 'Email is required'
  }
  if(!Validator.isEmail(validatorEmail)) {
    errors.email = 'Email is Invalid'
  }
  if(Validator.isEmpty(validatorPassword)) {
    errors.password = 'Password is required'
  }
  if(!Validator.isLength(validatorPassword, { min: 6, max: 30 })) {
    errors.password = 'Password must be between 6 and 30 characters'
  }
  if(Validator.isEmpty(validatorPassword2)) {
    errors.password2 =  'Confirm Password is required'
  }
  if(!Validator.equals(validatorPassword, validatorPassword2)) {
    errors.password2 = 'Passwords must match'
  }

  return {
    errors,
    isValid: _.isEmpty(errors)
  }
}

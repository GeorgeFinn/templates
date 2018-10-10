const Validator = require('validator')
const _ = require('lodash')
module.exports = function validateLoginInput(data) {
  let errors = {}
  const validatorEmail = !_.isEmpty(data.email) ? data.email : ''
  const validatorPassword = !_.isEmpty(data.password) ? data.password : ''

  if(!Validator.isEmail(validatorEmail)) {
    errors.email = 'Email is Invalid'
  }
  if(Validator.isEmpty(validatorEmail)) {
    errors.email = 'Email is required'
  }
  if(Validator.isEmpty(validatorPassword)) {
    errors.password = 'Password is required'
  }

  return {
    errors,
    isValid: _.isEmpty(errors)
  }
}

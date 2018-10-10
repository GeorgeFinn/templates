const Validator = require('validator')
const _ = require('lodash')
module.exports = function validateProfileInput(data) {
  let errors = {}

  const validatorUsername = !_.isEmpty(data.username) ? data.username: ''
  const validatorItem = !_.isEmpty(data.item) ? data.item : ''
  const validatorItemList = !_.isEmpty(data.itemList) ? data.itemList: ''

  if(!Validator.isLength(validatorUsername, { min: 2, max: 30 })) {
    errors.username = 'Profile username must be between 2 and 30 characters'
  }
  if(Validator.isEmpty(validatorUsername)) {
    errors.username = 'Profile username is required'
  }
  if(Validator.isEmpty(validatorItem)) {
    errors.item = 'Profile item is required'
  }
  if(Validator.isEmpty(validatorItemList)) {
    errors.itemList = 'Profile itemList is required'
  }

  return {
    errors,
    isValid: _.isEmpty(errors)
  }
}

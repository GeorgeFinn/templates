const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const passport = require('passport')

const validateProfileInput = require('../../validation/profile')
//LOAD
//Profile Model
const Profile = require('../../models/Profile')
//User Profile
const User = require('../../models/User')

// @route GET api/profile/test
// @desc Tests profile route
// @access Public
router.get('/test', (req, res) => res.json({
  msg: "Profile works"
}))

// GET api/profile
// Get current users profile
// Private
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  const errors = {}
  Profile.findOne({ user: req.user.id })
    .populate('user', ['name', 'avatar'])
    .then(profile => {
      if(!profile) {
        errors.noprofile = 'There is no profile for this user'
        return res.status(404).json(errors);
      }
      res.json(profile)
    })
    .catch(err => {
      res.status(404).json(err)
    })
})

// GET api/profile/username/:username
// Get profile by username
// Private
router.get('/username/:username', (req, res) => {
  const errors = {}
  Profile.findOne({ username: req.params.username })
    .populate('user', ['name', 'avatar'])
    .then(profile => {
      if(!profile) {
        errors.noprofile = 'There is no profile for this user'
        return res.status(404).json(errors);
      }
      res.json(profile)
    })
    .catch(err => {
      res.status(404).json({ profile: 'There is no profile for this user'})
    })
})

// GET api/profile/username/:username
// Get profile by username
// Private
router.get('/all', (req, res) => {
  const errors = {}
  Profile.find()
  .populate('user', ['name', 'avatar'])
  .then(profiles => {
    if(!profiles) {
      errors.noprofile = 'There are no profiles'
      return res.status(404).json(errors);
    }
    res.json(profiles)
  })
  .catch(err => {
    res.status(404).json({ profile: 'There are no profiles'})
  })
})

// @route GET api/profile/user/:user_id
// @desc Get profile by user
// @access Private
router.get('/user/:user_id', (req, res) => {
  const errors = {}
  Profile.findOne({ user: req.params.user_id })
    .populate('user', ['name', 'avatar'])
    .then(profile => {
      if(!profile) {
        errors.noprofile = 'There is no profile for this user'
        return res.status(404).json(errors);
      }
      res.json(profile)
    })
    .catch(err => {
      res.status(404).json(err)
    })
})


// @route POST api/profile
// @desc Create user profile
// @access Private
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { errors, isValid } = validateProfileInput(req.body)

  //validation
  if(!isValid) {
    return res.status(400).json(errors)
  }
  // Fields
  const profileFields = {}
  profileFields.user = req.user.id
  if (req.body.username) profileFields.username = req.body.username
  if (req.body.item) profileFields.item = req.body.item
  if(typeof req.body.itemList !== 'undefined') { //SPLIT the array
    profileFields.itemList = req.body.itemList.split(',')
  }

  Profile.findOne({ user: req.user.id })
    .then(profile => {
      if(profile) {
        Profile.findOneAndUpdate({ user: req.user.id }, { $set: profileFields }, { new: true })
          .then(profile => res.json(profile))
      } else {
        //CREATE ONE
        Profile.findOne({ username: profileFields.username }).then(profile => {
          if(profile) {
            errors.username = 'That username already exists'
            res.status(400).json(errors)
          }
          new Profile(profileFields).save().then(profile => res.json(profile))
        })
      }
    })
})

module.exports = router

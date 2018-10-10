import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

import TextFieldGroup from '../components/shared/TextFieldGroup'
import { createProfile } from '../actions/profileActions'

class CreateProfile extends Component {
  constructor(props) {
    super(props)
    this.state= {
      username: '',
      item: '',
      itemList: '',
      errors: {}
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.errors) {
      this.setState({ errors: nextProps.errors })
    }
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const profileData = {
      username: this.state.username,
      item: this.state.item,
      itemList:this.state.itemList
    }
    this.props.createProfile(profileData, this.props.history)
  };

  render() {
    const { errors } = this.state
    return(
      <div>
        <div className="login-container">
          <h2>Create Profile</h2>
          <div className="caption" style={{ fontSize: "14px" }}>
            Let's get some more details
          </div>
          <form onSubmit={this.handleSubmit}>
            <TextFieldGroup
              placeholder="Username"
              name="username"
              type="text"
              value={this.state.username}
              onChange={this.handleChange}
              error={errors.username}
              required
            />
            <TextFieldGroup
              placeholder="Item"
              name="item"
              type="text"
              value={this.state.item}
              onChange={this.handleChange}
              error={errors.item}
              required
            />
            <TextFieldGroup
              placeholder="ItemList"
              name="itemList"
              type="itemList"
              value={this.state.itemList}
              onChange={this.handleChange}
              error={errors.itemList}
              required
            />
            <input className="submit-button" type="submit" value="Submit" />
          </form>
        </div></div>
    )
  }
}
CreateProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
})


export default connect(mapStateToProps, { createProfile })(withRouter(CreateProfile))

import React, { Component } from "react";
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';

import { getCurrentProfile } from '../actions/profileActions'

class Profile extends Component {
  componentDidMount() {
    this.props.getCurrentProfile()
  }
  render() {
    const { user } = this.props.auth;
    const { profile } = this.props.profile;
    let profileContent;

    if(profile !== null) {
    if(Object.keys(profile).length > 0) { //is there any profile data?
      profileContent = <h1>TODO: Display Profile</h1>
    } else {
      //USER is logged in but has no profile
      profileContent = (
        <div>
        <h1>Welcome { user.name }</h1>
        <div>
        You have not yet setup a profile, please add some info
      </div>
        <br />
        <Link to="/create-profile" className="btn btn-lg btn-info">
          Create Profile
        </Link>
      </div>
      )
    }
  }

    return (
      <div className='profile' style={{ marginTop: '100px', textAlign: 'center' }}>
        {profileContent}
      </div>
    )
  }
}

Profile.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
})

export default connect(mapStateToProps, { getCurrentProfile })(Profile);

import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import styled from 'styled-components'

import { logoutUser } from "../actions/authActions";
import { clearCurrentProfile } from "../actions/profileActions";

const LinkButton = styled(NavLink)`
  background-image: transparent;
  color: linear-gradient(#eecda3, #ef629f);
;
  padding: .8em 1.5em;
  border-radius: 8px;
  transition: all .5s;
  background-size: 200% auto;
  font-weight:600;
  &:hover {
    color: white;
    background-image: linear-gradient(to right, #eecda3 0%, #ef629f 51%, #eecda3 100%);
    background-position: right center;
  }
`

const NavBarWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: 3em;
  align-items: center;
  margin: 0 auto;
  width: 80vw;

`
const LeftButton = styled(LinkButton)`
  margin-right: 30px;
`

const RightButton = styled(LinkButton)`
  margin-left: 30px;
`

const LeftColumn = styled.div`
  text-align: left;
`

const RightColumn = styled.div`
  text-align: right;
`



class Navbar extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
  }

  handleLogout = e => {
    this.props.logoutUser();
    this.props.clearCurrentProfile();
  };

  render() {
    const { isAuthenticated, user } = this.props.auth;

    const guestLinks = (
      <RightColumn size={6}>
        <RightButton to="/signup" activeClassName="active">Sign Up</RightButton>
        <RightButton to="/login" activeClassName="active">Login</RightButton>
      </RightColumn>
    );

    const authLinks = (
      <RightColumn size={6}>
        <LeftButton to="/login" onClick={this.handleLogout} activeClassName="active">Logout</LeftButton>
        <LeftButton to="/profile" activeClassName="active">Profile</LeftButton>
      </RightColumn>
    );

    return (
      <NavBarWrapper>
        <LeftColumn size={6}>
          <LinkButton to="/" exact activeClassName="active">
            MERN
          </LinkButton>
        </LeftColumn>
        {isAuthenticated ? authLinks : guestLinks}
      </NavBarWrapper>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = ({ auth }) => ({
  auth: auth
});

export default connect(
  mapStateToProps,
  { logoutUser, clearCurrentProfile }
)(Navbar);

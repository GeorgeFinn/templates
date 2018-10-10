import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import styled from 'styled-components'

import TextFieldGroup from '../components/shared/TextFieldGroup'
import { loginUser } from "../actions/authActions";

const LoginWrapper = styled.div`
  max-width: 500px;
  margin: 0 auto;
`

const LoginHeader = styled.h1`
  margin-bottom: 5px;
`

const Caption = styled.div`
  font-size: 14px;
  text-transform: uppercase;
  margin-bottom: 30px;
`

const SubmitButton = styled.input`
  padding: 20px 20px;
  border-radius: 8px;
  outline: none;
  border: 1px solid #ddd;
  background-image: linear-gradient(to right, #02aab0 0%, #00cdac 51%, #02aab0 100%);
  background-size: 200% auto;
  transition: all .5s ease-out;
  color: white;
  margin-top: 30px;
  font-weight: 600;
  font-size: 18px;
  width: 100%;
  &:hover {
    background-position: right center;
    cursor: pointer;
  }
`


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errors: {}
    };
  }
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }
  }

  componentWillReceiveProps({ auth, errors }) {
    if (auth.isAuthenticated) {
      this.props.history.push("/");
    }

    if (errors) {
      this.setState({ errors });
    }
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password
    };
    console.log("logged in user");
    this.props.loginUser(userData);
  };

  render() {
    const { errors } = this.state;
    return (
        <LoginWrapper>
          <LoginHeader>Login</LoginHeader>
          <Caption>
            Enter credentials to access your profile
          </Caption>
          <form onSubmit={this.handleSubmit}>
            <TextFieldGroup
              placeholder="Email"
              name="email"
              type="email"
              value={this.state.email}
              onChange={this.handleChange}
              error={errors.email}
            />
            <TextFieldGroup
              placeholder="Password"
              name="password"
              type="password"
              value={this.state.password}
              onChange={this.handleChange}
              error={errors.password}
            />
            <SubmitButton type="submit" value="Submit"/>
          </form>
        </LoginWrapper>
    );
  }
}
Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(withRouter(Login));

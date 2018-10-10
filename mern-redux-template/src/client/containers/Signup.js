import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import styled from 'styled-components'

import { registerUser } from "../actions/authActions";
import TextFieldGroup from '../components/shared/TextFieldGroup'

const SignupWrapper = styled.div`
  max-width: 500px;
  margin: 0 auto;
`

const SignupHeader = styled.h1`
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

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
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
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };
    console.log("created new user");
    this.props.registerUser(newUser, this.props.history);
  };

  render() {
    const { errors } = this.state;
    return (
        <SignupWrapper>
          <SignupHeader>Sign Up</SignupHeader>
          <Caption>Create your MERN-boilerplate account</Caption>
          <form onSubmit={this.handleSubmit}>
            <TextFieldGroup
              placeholder="Name"
              name="name"
              type="text"
              value={this.state.name}
              onChange={this.handleChange}
              error={errors.name}
              required
            />
            <TextFieldGroup
              placeholder="Email"
              name="email"
              type="email"
              value={this.state.email}
              onChange={this.handleChange}
              error={errors.email}
              required
            />
            <TextFieldGroup
              placeholder="Password"
              name="password"
              type="password"
              value={this.state.password}
              onChange={this.handleChange}
              error={errors.password}
              required
            />
            <TextFieldGroup
              placeholder="Confirm Password"
              name="password2"
              type="password"
              value={this.state.password2}
              onChange={this.handleChange}
              error={errors.password2}
              required
            />
            <SubmitButton type="submit" value="Submit"/>
          </form>
        </SignupWrapper>
    );
  }
}

Signup.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

function mapStateToProps({ auth, errors }) {
  return {
    auth,
    errors
  };
}

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Signup));

import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled from 'styled-components'

const HeaderText = styled.h1`
  text-align: center;
`

class Home extends Component {
  render() {
    return (
      <HeaderText>
        Check out this <br />MERN Boilerplate
      </HeaderText>

    );
  }
}

export default Home;

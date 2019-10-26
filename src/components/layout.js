import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components';
import base from './base.css'
import Navigation from './navigation'

class Layout extends React.Component {
  render() {
    const { location, children } = this.props
    let header

    let rootPath = `/`
    if (typeof __PREFIX_PATHS__ !== `undefined` && __PREFIX_PATHS__) {
      rootPath = __PATH_PREFIX__ + `/`
    }

    return (
      <LayoutRoot>
        {children}
      </LayoutRoot>
    )
  }
}

export default Layout

const LayoutRoot = styled.div`
  width: 100vw;
  height: 100vh;
`;

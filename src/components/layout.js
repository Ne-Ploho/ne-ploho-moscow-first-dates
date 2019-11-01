import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components';

class Layout extends React.Component {
  render() {
    const { location, children } = this.props
    let header

    return (
      <LayoutRoot>
        {children}
      </LayoutRoot>
    )
  }
}

export default Layout

const LayoutRoot = styled.div`
  width: 100%;
  height: 100%;
`;

import React from 'react'
import styled from 'styled-components';
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'
import Layout from '../components/layout'
import Dialog from '../components/Dialog';

class AboutTemplate extends React.Component {
  render() {
    const { data } = this.props;
    const siteTitle = data.site.siteMetadata.title;

    return (
      <Layout location={this.props.location} >
        <div style={{ background: '#fff' }}>
          <Helmet title={`О карте | ${siteTitle}`} />
        </div>
        <Dialog>
          ololo
        </Dialog>
      </Layout>
    )
  }
}

export default AboutTemplate


export const pageQuery = graphql`
  query AboutQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`

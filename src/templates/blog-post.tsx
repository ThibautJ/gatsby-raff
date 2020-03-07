import React from 'react'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'
import get from 'lodash/get'
import Layout from '../components/layout'

class blogTemplate extends React.Component {
  render() {
    const post = get(this.props, 'data.contentfulBlog')
    const siteTitle = get(this.props, 'data.site.siteMetadata.title')

    console.log('post', post)

    return (
      <Layout>
        <div style={{ background: '#fff' }}>
          <Helmet title={`${post.title} | ${siteTitle}`} />
          <div className="wrapper">
            <h1 className="section-headline">{post.title}</h1>
            <p
              style={{
                display: 'block',
              }}
            >
              {post.publishDate}
            </p>
            <div
              dangerouslySetInnerHTML={{
                __html: post.body.body,
              }}
            />
          </div>
        </div>
      </Layout>
    )
  }
}

export default blogTemplate

export const pageQuery = graphql`
  query BlogBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    contentfulBlog(slug: { eq: $slug }) {
      title
      publishDate(formatString: "MMMM Do, YYYY")
      body {
        body
      }
    }
  }
`

import * as React from "react"
import { Link, graphql } from "gatsby"
import styled from "styled-components"

import Layout from "../components/layout"
import SEO from "../components/seo"

const Title = styled.h1`
  display: inline-block;
`

const BlogTitle = styled.h3`
  margin-bottom: 20px;

  &:hover {
    color: #1dcaff;
  }
`

const BlogLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`

const BlogBody = styled.div`
  margin-bottom: 50px;
`

export default ({ data }) => (
  <Layout>
    <SEO title="Home" />
    <div>
      <Title>Pablo's Thoughts!</Title>
      <h4>{data.allMarkdownRemark.totalCount} Posts</h4>
      {data.allMarkdownRemark.edges.map(({ node }) => (
        <BlogBody key={node.id}>
          <BlogLink to={node.fields.slug}>
            <BlogTitle>
              {node.frontmatter.title} <span>- {node.frontmatter.date}</span>
            </BlogTitle>
          </BlogLink>
          <p>{node.frontmatter.description || node.excerpt}</p>
        </BlogBody>
      ))}
    </div>
  </Layout>
)

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */

export const query = graphql`
  query {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date
            description
          }
          fields {
            slug
          }
          excerpt
        }
      }
    }
  }
`

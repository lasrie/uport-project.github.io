import React from 'react'
import Helmet from 'react-helmet'
import styled from 'styled-components'
import SEO from '../components/SEO/SEO'
import SiteHeader from '../components/Layout/Header'
import SiteFooter from '../components/Layout/Footer'
import ServerLanding from '../components/server/ServerLanding'
import BuildingBlocks from '../components/BuildingBlocks'
import Solutions from '../components/Solutions'
import config from '../../data/SiteConfig'
import heroImg from '../images/hero-img.svg'
import backgroundImg from '../images/grey-background.png'
import blueTick from '../images/Tick.svg'
import AutoLinkText from 'react-autolink-text2'

class Index extends React.Component {
  render () {
    const postEdges = this.props.data.allMarkdownRemark.edges
    const messages = []

    /* If there is an announcement, broadcast it at the top of each page */
    if (this.props.data.announcement) {
      this.props.data.announcement.edges.forEach(announcement => {
        messages.push(
          <h4>
            <AutoLinkText text={`${announcement.node.frontmatter.announcement}`}
              linkProps={{target: '_blank'}} />
          </h4>
        )
      })
    }

    return (
      <div className='index-container'>
        <Helmet title={config.siteTitle} />
        <SEO postEdges={postEdges} />
        <main>
          <IndexHeadContainer>
            <SiteHeader
              activeSection={''}
              location={this.props.location}
              types={this.props.data.navTypes} />
            <Hero className={`home-hero`}>
              <div className={`hero-wrapper`}>
                <div className={'Grid Grid--gutters'}>
                  <div className='Grid-cell hero-left'>
                    <h1 className='hero-title'>Build User-Centric Ethereum Apps</h1>
                    <ValueProps>
                      <h2>Give your users the sovereignty to manage details about their digital-selves.</h2>
                    </ValueProps>
                  </div>
                  <div className='Grid-cell hero-img-wrap'>
                    <div className={`hero-img`}>
                      <img src={heroImg} />
                    </div>
                  </div>
                </div>
                <div className={'Grid Grid--gutters hero-features'}>
                  <div className='Grid-cell'>
                    <div className="hero-feature">
                      <h2>Connect Users to Your web3 dApp</h2>
                      <p>Add full support for uPort by adding a single line of code to your web3 dApp.</p>
                      <ul>
                        <li>Onboard new users within minutes</li>
                        <li>Instantly create a privacy-preserving Ethereum account</li>
                        <li>Build for both desktop and mobile browsers</li>
                      </ul>
                      <div className={`hero-button`}>
                        <a href='/gettingstarted'>
                          Connect With Your Users
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className='Grid-cell'>
                    <div className="hero-feature">
                      <h2>Issue & Request Verified Credentials</h2>
                      <p>Help your users build their digital identity by issuing Verified Credentials about them or the things they do in your app.</p>
                      <ul>
                        <li>Request Ethereum transaction signing with web3</li>
                        <li>Issue and Request Verified Credentials about your users</li>
                      </ul>
                      <div className={`hero-button`}>
                        <a href='/uport-credentials/index'>
                          Issue Verified Credentials
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <AnnouncementContainer>{messages}</AnnouncementContainer>
            </Hero>
          </IndexHeadContainer>
          <BodyContainer className={`body-container`}>
            <Solutions />
            <BuildingBlocks />
          </BodyContainer>
          <FooterContainer>
            <SiteFooter />
          </FooterContainer>
        </main>
      </div>
    );
  }
}

export default Index

const AnnouncementContainer = styled.div`
  text-align: center;
  align-self: center;
  margin: auto;
  color: #cc0066;
`
const IndexHeadContainer = styled.div`
  background: ${props => props.theme.brand};
  header {
    width: 90vw;
    margin: 0 auto;
  }
`

const ValueProps = styled.div`
  h2 {
     color: #8986a0;
  }
`

const Hero = styled.div`
  h2 {
    font-size 24px;
  }
  ul {
     margin-top: 1em;
     font-size: 16px;
     list-style: none;
  }
  ul li::before {
    content: '';
    color: #62B482;
    display: inline-block;
    width: 1em;
    height: 1em;
    margin-right: 15px;
    vertical-align: middle;
    text-align: center;
    position: relative;
    bottom: 2px;
    direction: rtl;
    background-image: url(${blueTick});
    background-size: contain;
    background-repeat: no-repeat;
  }
  background-color: #fff;
  .hero-wrapper {
    width: 90vw;
    margin: 0 auto;
    padding: 60px 0;
  }
  .hero-img-wrap {
    flex: 0 0 42%;
    align-self: center;
  }
  @media screen and (max-width: 600px) {
   h1 {
     font-size: 34px;
     line-height: 40px;
   }
   .hero-wrapper {
     padding: 0;
   }
   .hero-features {
     h2 {
       margin-top: 20px;
     }
   }
 }
`

const BodyContainer = styled.div`
  background-color: #F9F9FA;
  margin: 0 auto;
`
const FooterContainer = styled.footer`
  background-color: #6c59cf;
  clear: all;
`

/* eslint no-undef: "off"*/
export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(
      limit: 2000
    ) {
      edges {
        node {
          fields {
            slug
          }
          excerpt
          timeToRead
          frontmatter {
            title
          }
        }
      }
    }
    navTypes:
    allMarkdownRemark(
      filter: { frontmatter: { category: { ne: null }, index: { ne: null }}}
    ) {
      edges {
        node {
          fields {
            slug
          }
          headings {
            value
            depth
          }
          frontmatter {
            category
            type
            index
          }
        }
      }
    }
    announcement: allMarkdownRemark(
      filter: { frontmatter: { announcement: { ne: null } } }) {
        totalCount
        edges {
          node {
            frontmatter {
              announcement
            }
          }
        }
      }
  }
`;

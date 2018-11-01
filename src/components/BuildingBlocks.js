import React, {Component} from 'react'
import styled from 'styled-components'

const Container = styled.section`
    background-color: #fff;
    .building-blocks-wrapper {
      margin: 0 auto;
      padding: 60px 0;
    }
    h2 {
      font-size: 32px;
      font-weight: bold;
      line-height: 40px;
      text-align: left;
    }
    h3, h4 {
      padding: 20px;
      color: #8986A0;
      font-size: 24px;
      line-height: 32px;
    }
    h4 {
      color: #5C50CA;
      padding: 0 0 20px;
      margin: 0;
    }
    p {
      padding: 0;
      margin: 0;
    }
    .code-block {
      border-radius: 4px;
      background-color: #f9f9fa;
      margin-top: 20px;
      height: 50px;
      font-family: Consolas, Menlo, Monaco, "Andale Mono WT", "Andale Mono", "Lucida Console", "Lucida Sans Typewriter", "DejaVu Sans Mono", "Bitstream Vera Sans Mono", "Liberation Mono", "Nimbus Mono L", "Courier New", Courier, monospace;
      color: #3db77d;
      white-space: nowrap;
      span {
        display: table-cell;
        vertical-align: middle;
        padding: 13px 0px 18px 20px;
      }
    }
    .block-item {
      box-shadow: 0px 0px 4px
      rgba(0,0,0, 0.25);
      border-radius: 4px;
      margin-bottom: 30px;
      margin-left: 30px;
      padding: 20px;
      position: relative;
    }
    a {
        color: inherit;
        text-decoration: none;
    }
    .nudge-right {
      padding-left: 28px;
    }

  @media (min-width: 768px) {
    .code-block {
      bottom: 20px;
      left: 20px;
      margin-top: 0;
      position: absolute;
      right: 20px;
    }
    .block-item {
      min-height: 250px;
    }
  }
  @media screen and (max-width: 600px) {
    .block-item {
      margin-left: 20px;
      padding: 5px;
    }
    .building-blocks-wrapper {
      padding-left: 10px;
      padding-right: 10px;
    }
    h2 {
      padding-left: 10px;
    }
    .nudge-right {
      padding-left: 20px;
    }
  }
`

class BuildingBlocks extends Component {
  render () {
    return (
      <Container className='building-blocks'>
        <a id='platform'/>
        <div className='building-blocks-wrapper'>
          <h2>Identity Building Blocks</h2>
          <div className={'Grid Grid--gutters'}>
            <div>
              <h3 className='nudge-right'>Libraries</h3>
              <div>
                <div className='block-item'>
                  <a href='/categories/uport-connect'>
                    <h4 className='arrow'>uPort Connect</h4>
                    <p>Single sign-on and transaction signing for your client-side app</p>
                  </a>
                  <div className={'code-block'}>
                    <span>npm -i uport-connect</span>
                  </div>
                </div>
                <div className='block-item'>
                  <a href='/categories/uport-credentials'>
                    <h4 className='arrow'>uPort Credentials</h4>
                    <p>Request, sign, and issue credentials from your app server</p>
                  </a>
                  <div className={'code-block'}>
                    <span>npm -i uport-credentials</span>
                  </div>
                </div>
                <div className='block-item'>
                  <a href='/categories/uport-transports'>
                    <h4 className='arrow'>uPort Transports</h4>
                    <p>Set up communication channels between your app and uPort clients.</p>
                  </a>
                  <div className={'code-block'}>
                    <span>npm -i uport-transports</span>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h3 className='nudge-right'>Tools</h3>
              <div>
                <div className='block-item'>
                  <a href='/categories/ethr-did'>
                    <h4 className='arrow'>EthrDID</h4>
                    <p>Create Decentralized Identifiers and manage their interactions in your app.</p>
                  </a>
                  <div className={'code-block'}>
                    <span>npm -i ethr-did</span>
                  </div>
                </div>
                <div className='block-item'>
                  <a href='/categories/ethr-did-registry'>
                    <h4 className='arrow'>EthrDID Registry</h4>
                    <p>Smart contract for the resolution and management of decentralized identifiers (DIDs)</p>
                  </a>
                  <div className={'code-block'}>
                    <span>npm -i ethr-did-registry</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    )
  }
}

export default BuildingBlocks

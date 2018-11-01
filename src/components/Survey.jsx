import React, { Component } from 'react'
import styled from 'styled-components'

class DevSurvey extends Component {

  constructor() {
    super();
    this.state = { choice: null }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const eventName = `content-survey-${this.state.choice !== null ? 'updated' : 'taken'}`;
    switch(event.target.value){
      case 'true':
        this.setState({choice: true}, () => {
          window.analytics.track(eventName, this.state, {context: { ip: '0.0.0.0' }});
        });
        break;
      case 'false':
        this.setState({choice: false}, () => {
          window.analytics.track(eventName, this.state, {context: { ip: '0.0.0.0' }});
        });
        break;
      default:
        this.setState({choice: null});
    }
  }

  render() {
    return(
      <SurveyContainer>
        <Form>
          <HR />
          <Row>
            <H5>Was this article helpful?</H5>
            <Column>
              <Label>
                <Input type='radio' value='true' name='survey' onChange={this.handleChange} />
                Yes
              </Label>
            </Column>
            <Column>
              <Label>
                <Input type='radio' value='false' name='survey' onChange={this.handleChange} />
                No
              </Label>
            </Column>
          </Row>
        </Form>
      </SurveyContainer>
    )
  }
}

export default DevSurvey

const Form = styled.form`
  width: 100%;
`

const HR = styled.hr`
  background-color: rgb(229, 229, 229);
  height: 1px;
`

const H5 = styled.h5`
  margin-bottom: 10px;
  @media (min-width: 768px) {
    margin: auto;
  }
  padding-right: 10px;
`

const Input = styled.input`
  margin: 0 10px 0 0;
  padding-left: 5px;
`

const Label = styled.label`
  padding: 10px;
  margin: auto;
  @media (min-width: 768px) {
    padding: 0 5px;
  }
`

const Row = styled.div`
  @media (min-width: 768px) {
    display: flex;
    flex-direction: row;
  }
  max-width: 25rem;
`

const Column = styled.div`
  margin: auto;
`

const SurveyContainer = styled.div`
  padding-bottom: 20px;
  padding-top: 20px;
  display: flex;
  margin: auto;
`

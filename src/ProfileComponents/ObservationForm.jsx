import React from 'react'
import { Form } from 'semantic-ui-react'

class ObservationForm extends React.Component {
    constructor() {
      super()
  
      this.state = this.getInitialState()
    }
  
    getInitialState = () => ({ location: '', image_one: '', image_two: '', image_three: '', image_four: '', image_five: '', image_six: '', mushroom_id: '' })
  
    handleChange = (e, { name, value }) => this.setState({ [name]: value })
  
    handleSubmit = e => {
      e.preventDefault()
    //   const { location, image_one, image_two, image_three, image_four, image_five, image_six, mushroom_id } = this.state
      
        fetch('http://localhost:3000/observations', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'Authorization': `Bearer ${this.props.token}`
            },
            body: JSON.stringify(this.state)
        })
        .then(resp => resp.json())
        .then(observation => this.props.addNewObservation(observation))
        .catch(error => console.error(error))
      this.setState(this.getInitialState())
    }
  
    render() {
      const { location, image_one, image_two, image_three, image_four, image_five, image_six, mushroom_id } = this.state
      const { handleChange, handleSubmit } = this
      return (
        <div>
          <h3>Add an Observation!</h3>
          <Form onSubmit={handleSubmit}>
            <Form.Group widths="equal">
                <Form.Input
                fluid
                label="Location"
                placeholder="Location"
                name="location"
                value={location}
                onChange={handleChange}
                />
                <Form.Input
                fluid
                label="Image One"
                placeholder="url"
                name="image_one"
                value={image_one}
                onChange={handleChange}
                />
                <Form.Input
                fluid
                label="Image Two"
                placeholder="url"
                name="image_two"
                value={image_two}
                onChange={handleChange}
                />
                <Form.Input
                fluid
                label="Image Three"
                placeholder="url"
                name="image_three"
                value={image_three}
                onChange={handleChange}
                />
                <Form.Input
                fluid
                label="Image Four"
                placeholder="url"
                name="image_four"
                value={image_four}
                onChange={handleChange}
                />
                <Form.Input
                fluid
                label="Image Five"
                placeholder="url"
                name="image_five"
                value={image_five}
                onChange={handleChange}
                />
                <Form.Input
                fluid
                label="Image Six"
                placeholder="url"
                name="image_six"
                value={image_six}
                onChange={handleChange}
                />
                <Form.Input
                fluid
                label="Mushroom"
                placeholder="Mushroom"
                name="mushroom_id"
                value={mushroom_id}
                onChange={handleChange}
                />
            </Form.Group>
            <Form.Button>Submit</Form.Button>
          </Form>
        </div>
      )
    }
  }
  
  export default ObservationForm
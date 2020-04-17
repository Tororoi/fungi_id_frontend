import React from 'react'
import { Form } from 'semantic-ui-react'

class Observation extends React.Component {

    state = {
        edit: false,
        newMush: this.props.observation.mushroom
    }

    handleDelete = () => {
        this.props.deleteObs(this.props.observation)
    }

    handleUpdate = () => {

    }

    handleSubmit = e => {
        e.preventDefault()

        const newObs={...this.props.observation, mushroom_id: this.props.chosen.id}
        this.props.updateObs(newObs)
        this.setState({
            newMush: `${this.props.chosen.genus} ${this.props.chosen.species}`
        })
      }

    clickEdit = (e) => {
        this.setState({
            edit: !this.state.edit
        })
    }

    updateForm = () => {
        return (
            <Form onSubmit={this.handleSubmit}>
            <Form.Group widths="equal">
            <Form.Input
            fluid
            label="Mushroom"
            placeholder={this.props.chosen.id}
            name="mushroom_id"
            value={this.props.chosen.id}
            />
        </Form.Group>
        <Form.Button>Submit</Form.Button>
      </Form>
        )
    }

    render() {
        let {mushroom, location, image_one, image_two, image_three, image_four, image_five, image_six} = this.props.observation
        return (
            <>
            <h3 className="ex" onClick={this.handleDelete}>X</h3>
            <span className="observation_card">
                <img src={image_one}></img>
                <p>{this.state.newMush}</p>
                {this.state.edit ? this.updateForm() : null }
                <p>{location}</p>
                <p className='edit' onClick={this.clickEdit}>EDIT</p>
            </span>
            <span>
                {this.state.edit ? this.props.renderMushrooms() : ''}
            </span>
            </>
        )
    }
}
  
export default Observation
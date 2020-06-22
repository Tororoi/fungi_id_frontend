import React from 'react'
import { Form } from 'semantic-ui-react'

class Observation extends React.Component {

    state = {
        edit: false,
        newMush: this.props.observation.binomial
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
            label="Change Mushroom"
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
        let {binomial, mushroom, location, image_one, image_two, image_three, image_four, image_five, image_six} = this.props.observation
        console.log(this.state.edit)
        return (
            <>
            <h3 className="ex" onClick={this.handleDelete}>X</h3>
            <span className="observation_card">
                <img src={image_one}></img>
                <p style={{fontStyle: 'italic',}}>{this.state.newMush}</p>
                {this.state.edit ? this.updateForm() : null }
                <p>{mushroom.common_name}</p>
                <p>{location}</p>
                <h5 className='edit' onClick={this.clickEdit}>EDIT</h5>
            </span>
            <span>
                {this.state.edit ? this.props.renderMushrooms() : ''}
            </span>
            </>
        )
    }
}
  
export default Observation
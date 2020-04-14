import React, { Component } from 'react';
import ObservationForm from '../ProfileComponents/ObservationForm'

class ProfileContainer extends Component {

    state = {
        observeClicked: false
    }

    clickObserve = (e) => {
        this.setState({
            observeClicked: !this.state.observeClicked
        })
    }

    renderForm = () => {
        console.log("observe me")
        // <ObservationForm/>
    }

    render() {
        const {username, avatar, bio} = this.props.user
        return (
            <>
            <h1>Profile</h1>
            <span className="userinfo">
                <div>avatar: {avatar}</div>
                <div>username: {username}</div>
                <div>bio: {bio}</div>
                <div>observations: {''}</div>
            </span>
            <span className='new_observation' onClick={this.clickObserve}>
                Make a new Observation!
                <ObservationForm token={this.props.token} addNewObservation={this.props.addNewObservation}/>
                {this.renderForm() ? this.state.observedClicked : 'Make a new observation'}
            </span>
            </>
        )
    }
}

export default ProfileContainer;
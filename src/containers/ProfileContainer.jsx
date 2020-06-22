import React, { Component } from 'react';

import Observation from '../ProfileComponents/Observation'

class ProfileContainer extends Component {

    state = {
        observeClicked: false,
        myClicked: false
    }

    clickObserve = (e) => {
        this.setState({
            observeClicked: !this.state.observeClicked
        })
    }

    clickMine = (e) => {
        this.setState({
            myClicked: !this.state.myClicked
        })
    }



    renderObservations = () => {
        let myObs = this.props.user.observations.map((obsPOJO) => {
            return (
            <>
            
                <Observation
                    key={obsPOJO.id}
                    observation={obsPOJO}
                    deleteObs={this.props.deleteObs}
                    updateObs={this.props.updateObs}
                    renderObsForm={this.props.renderObsForm}
                    renderMushrooms={this.props.renderMushrooms}
                    chosen={this.props.chosen}
                    token={this.props.token}
                />
            </>
            )
        })
        return myObs
    }

    render() {
        const {username, avatar, bio, observations} = this.props.user
        return (
            <>
            <h1>Profile</h1>
            <span className="userinfo">
                <div>avatar: {avatar}</div>
                <div>username: {username}</div>
                <div>bio: {bio}</div>
                <span className='my_observations' onClick={this.clickMine}>observations: </span>
                <div className='observation_container'>
                {this.state.myClicked ? this.renderObservations() : ''}
                </div>
            </span>
            <span className='new_observation' onClick={this.clickObserve}>
                {this.state.observeClicked ? 'Hide Form' : 'Make a New Observation!'}
            </span>
            <span>
                {this.state.observeClicked && !this.state.myClicked ? this.props.renderObsForm() : ''}
            </span>
            </>
        )
    }
}

export default ProfileContainer;
import React from 'react';
import './App.css';
import {Switch, Route, withRouter, Redirect} from 'react-router-dom'

import NavBar from './components/NavBar'
import Search from './components/Search'
import Form from './components/Form'
import ObservationForm from './ProfileComponents/ObservationForm'
import ProfileContainer from './containers/ProfileContainer'
import MushroomContainer from './containers/MushroomContainer'

class App extends React.Component {

  state = {

    user: {
      id: 0,
      username: "",
      observations: []
    },
    token: "",
    mushrooms: [],
    observation_list: [],
    searchTerm: '',
    searchTags: [],
    chosen: ''
  }

  componentDidMount(){

    if (localStorage.token) {
      fetch("http://localhost:3000/persist", {
        headers: {
          "Authorization": `bearer ${localStorage.token}`
        }
      })
      .then(r => r.json())
      .then(this.handleResponse)
    }

    fetch("http://localhost:3000/mushrooms")
      .then(r => r.json())
      .then(mushrooms => {
        this.setState({
          mushrooms: mushrooms
        })
      })

    fetch("http://localhost:3000/observations")
      .then(r => r.json())
      .then(observations => {
        this.setState({
          observation_list: observations
        })
      })
  }

  handleLoginSubmit = (userInfo) => {
    console.log("Login form has been submitted")

    fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(userInfo)
    })
      .then(r => r.json())
      .then(this.handleResponse)
  }

  handleRegisterSubmit = (userInfo) => {
    console.log("Register form has been submitted")

    fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({user: userInfo})
    })
      .then(r => r.json())
      .then(this.handleResponse)
  }

  handleLogout = () => {
    this.setState({
      user: {
        id: 0,
        username: "",
        observations: []
      },
      token: ""
    })
    localStorage.clear()
  }

  handleResponse = (resp) => {
    if (!resp.message) {
      localStorage.token = resp.jwt
      this.setState({
        user: resp.user,
        token: resp.jwt
      }, () => {
        this.props.history.push("/profile")
      })
    }
    else {
      alert(resp.message)
    }

  }

  deleteObs = (badObs) => {
    let newList = this.state.user.observations.filter(o => {
      return o.id !== badObs.id
    })

    this.setState({
      user: {
        ...this.state.user,
        observations: newList
      }
    })

    fetch(`http://localhost:3000/observations/${badObs.id}`, {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json', "Authorization": `bearer ${localStorage.token}`}
    })
  }

  updateObs = (obs) => {
    console.log(obs)
    fetch(`http://localhost:3000/observations/${obs.id}`, {
      method: 'PATCH',
      headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'Authorization': `Bearer ${this.state.token}`
      },
      body: JSON.stringify(obs)
  })
  .then(resp => resp.json())
  .then(observation => this.updateObservation(observation))
  }

  handleSearchChange = e => {
    this.setState({ searchTerm: e.target.value })
  }

  addSearchTags = (tag) => {
    this.setState({ searchTags: [...this.state.searchTags, tag] })
  }

  removeSearchTags = (tag) => {
    let newList = this.state.searchTags.filter(t => {
      return t !== tag
    })
    this.setState({
      searchTags: newList
    })
  }

  renderForm = (routerProps) => {
    if(routerProps.location.pathname === "/login"){
      return <Form formName="Login Form" handleSubmit={this.handleLoginSubmit}/>
    } else if (routerProps.location.pathname === "/register") {
      return <Form formName="Register Form" handleSubmit={this.handleRegisterSubmit}/>
    }
  }

  renderProfile = (routerProps) => {

    if (this.state.token) {
      return <ProfileContainer
        mushrooms={this.state.mushrooms}
        user={this.state.user}
        token={this.state.token}
        addNewObservation={this.addNewObservation}
        renderObsForm={this.renderObsForm}
        renderMushrooms={this.renderMushrooms}
        chosen={this.state.chosen}
        deleteObs={this.deleteObs}
        updateObs={this.updateObs}
      />
    } else {
      return <Redirect to="/login"/>
    }
  }

  renderObsForm = () => {
    return (
        <>
        <ObservationForm chosen={this.state.chosen} token={this.state.token} addNewObservation={this.addNewObservation}/>
        {this.renderMushrooms()}
        </>
    )
}

  renderMushrooms = (routerProps) => {
    const desiredMushrooms = this.state.mushrooms.filter(m =>
      `${m.phylum} ${m.classis} ${m.order} ${m.family} ${m.genus} ${m.species} ${m.keywords}`.toLowerCase().includes(this.state.searchTerm.toLowerCase())
    )
    let core = ``
    this.state.searchTags.forEach(t => {
      core = `${core}(?=.*${t})`
    })
    let re = new RegExp(`${core}.+`, "g")
    const taggedMushrooms = desiredMushrooms.filter(m => {
      return !!re.test(m.keywords)
      })
    return (
      <>
      <Search searchTags={this.state.searchTags} onChange={this.handleSearchChange} addSearchTags={this.addSearchTags} removeSearchTags={this.removeSearchTags}/>
      <MushroomContainer
        mushrooms={taggedMushrooms}
        chooseMush={this.chooseMush}
        chosen={this.state.chosen}
        // user={this.state.user}
        // token={this.state.token}
        // addNewObservation={this.addNewObservation}
      />
      </>
    )
  }

  chooseMush = (mushPOJO) => {
    this.setState({
        chosen: mushPOJO
    })
}

  addNewObservation = (newlyCreatedObservation) => {
    let copy = [...this.state.user.observations, newlyCreatedObservation]

    this.setState({
      user: {
        ...this.state.user,
        observations: copy
      }
    })
  }

  updateObservation = (upObs) => {
    console.log(upObs)

    // let newList = this.state.user.observations.filter(o => {
    //   return o.id !== upObs.id
    // })
  
    // this.setState({
    //   user: {
    //     ...this.state.user,
    //     observations: newList
    //   }
    // })
    // let copy = [...this.state.user.observations, upObs]

    // this.setState({
    //   user: {
    //     ...this.state.user,
    //     observations: copy
    //   }
    // })
  }

  render(){
    return (
      <div className="App">
        <NavBar token={this.state.token} handleLogout={this.handleLogout}/>
        <Switch>
          <Route path="/mushrooms" render={ this.renderMushrooms } />
          <Route path="/login" render={ this.renderForm } />
          <Route path="/register" render={ this.renderForm }/>
          <Route path="/profile" render={ this.renderProfile } />
          <Route path="/" exact render={() => <h1>Home</h1>} />
        </Switch>
      </div>
    )
  }

}

export default withRouter(App) ;

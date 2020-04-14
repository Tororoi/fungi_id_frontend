import React from 'react';
import './App.css';
import {Switch, Route, withRouter, Redirect} from 'react-router-dom'

import NavBar from './components/NavBar'
import Form from './components/Form'
import ProfileContainer from './containers/ProfileContainer'

class App extends React.Component {

  state = {

    user: {
      id: 0,
      username: "",
      observations: []
    },
    token: "",
    mushrooms: []
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
      />
    } else {
      return <Redirect to="/login"/>
    }
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

  render(){
    return (
      <div className="App">
        <NavBar/>
        {this.state.token && <button onClick={this.handleLogout}>Log out</button>}
        <Switch>
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

import {Component} from 'react'

import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'

import Home from './components/Home'

import PopularMovies from './components/PopularMovies'

import MovieItemDetails from './components/MovieItemDetails'

import ProtectedRoute from './components/ProtectedRoute'
import NotFound from './components/NotFound'
import Search from './components/Search'
import Account from './components/Account'
import './App.css'

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/login" component={LoginForm} />
        <ProtectedRoute exact path="/" component={Home} />
        <ProtectedRoute exact path="/popular" component={PopularMovies} />
        <ProtectedRoute exact path="/movies/:id" component={MovieItemDetails} />
        <ProtectedRoute exact path="/search" component={Search} />
        <ProtectedRoute exact path="/account" component={Account} />
        <Route exact path="/not-found" component={NotFound} />
        <Redirect to="/not-found" />
      </Switch>
    )
  }
}

export default App

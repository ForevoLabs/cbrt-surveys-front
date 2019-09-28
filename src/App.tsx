import React from 'react'
import axios from 'axios'
import Login from './screens/Login'
import ListOfSurveys from './screens/ListOfSurveys'
import { Routes } from './types'
import { BASE_URL } from './constants'
import './App.css'

interface State {
  route: Routes
  currentSurvey: number | null
}

export default class App extends React.Component<{}, State> {
  state = {
    route: Routes.Loading,
    currentSurvey: null,
  }

  componentDidMount () {
    this.checkLogin()
  }

  goTo = (route: Routes) => this.setState({ route })

  checkLogin = () => {
    axios
      .get(BASE_URL + '/user', { withCredentials: true })
      .then((res) => {
        if (res.data.user !== void 0) {
          this.goTo(Routes.ListOfSurveys)
        } else {
          this.goTo(Routes.Login)
        }
      })
  }

  render () {
    const { route } = this.state

    return (
      <div className="App">
        {route === Routes.Loading &&
        'Загрузка...'}
        {route === Routes.Login &&
        <Login checkLogin={this.checkLogin} />}
        {route === Routes.ListOfSurveys &&
        <ListOfSurveys />}
      </div>
    )
  }
}

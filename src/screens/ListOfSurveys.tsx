import React from 'react'
import { Button, Container, Paper, Typography } from '@material-ui/core'
import axios from 'axios'
import { Survey, SurveyData } from '../types'
import { BASE_URL } from '../constants'
import NewSurvey from '../containers/NewSurvey'

interface Props {
  checkLogin (): void
}

interface State {
  isLoading: boolean
  rawSurveys: SurveyData
  error: string
}

export default class ListOfSurveys extends React.Component<Props, State> {
  state = {
    isLoading: true,
    rawSurveys: {
      surveys: [],
    },
    error: '',
  }

  handleAddSurvey = (survey: Survey, cb: (res: boolean) => void) => {
    const newSurveys = {
      surveys: [...this.state.rawSurveys.surveys, survey],
    }
    axios
      .post(BASE_URL, newSurveys, { withCredentials: true })
      .then(() => {
        this.setState({
          error: '',
          rawSurveys: newSurveys,
        })
        cb(true)
      })
      .catch(() => {
        this.setState({ error: 'Ошибка сохранения' })
        cb(false)
      })
  }

  componentDidMount () {
    axios
      .get(BASE_URL, { withCredentials: true })
      .then(({ data }) => {
        this.setState({ isLoading: false, rawSurveys: data })
      })
  }

  handleLogout = () => {
    axios
      .get(BASE_URL + '/logout', { withCredentials: true })
      .then(() => {
        this.props.checkLogin()
      })
  }

  render() {
    const { isLoading, rawSurveys } = this.state

    if (isLoading) {
      return 'Загрузка данных...'
    }

    return (
      <Container maxWidth="md">
        <Paper>
          <div style={{ float: 'right' }}>
            <Button color="secondary" onClick={this.handleLogout}>
              Выйти
            </Button>
          </div>
          <Typography variant="h3" gutterBottom>Опросы</Typography>
          {rawSurveys.surveys.map((survey: Survey) => (
            <div key={survey.id}>
              <Typography variant="h6">{survey.title}</Typography>
              <Typography variant="subtitle1" paragraph>{survey.description}</Typography>
            </div>
          ))}
          <Typography color="error">{this.state.error}</Typography>
          <NewSurvey addSurvey={this.handleAddSurvey} />
        </Paper>
      </Container>
    )
  }
}

import React from 'react'
import { Container, Paper, Typography } from '@material-ui/core'
import axios from 'axios'
import { SurveyData } from '../types'
import { BASE_URL } from '../constants'

interface Props {

}

interface State {
  isLoading: boolean
  rawSurveys: SurveyData
}

export default class ListOfSurveys extends React.Component<Props, State> {
  state = {
    isLoading: true,
    rawSurveys: {
      surveys: [],
    },
  }

  componentDidMount () {
    axios
      .get(BASE_URL, { withCredentials: true })
      .then(({ data }) => {
        this.setState({ isLoading: false, rawSurveys: data })
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
          <Typography variant="h3" paragraph>Опросы</Typography>
          {rawSurveys.surveys.map((survey: SurveyData['surveys'][0]) => (
            <>
              <Typography variant="h6">{survey.title}</Typography>
              <Typography variant="subtitle1" paragraph>{survey.description}</Typography>
            </>
          ))}
        </Paper>
      </Container>
    )
  }
}

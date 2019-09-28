import React, { FormEvent } from 'react'
import { Button, Container, TextField, Typography } from '@material-ui/core'
import { Survey } from '../types'

const DEFAULT_SURVEY: Survey = {
  id: Math.floor(Math.random() * 1e9 + 100),
  title: '',
  description: '',
  expirationDate: '2019-09-30T00:00:00.000Z',
  sections: [],
}

interface Props {
  addSurvey (survey: Survey, cb: (res: boolean) => void): void
}

interface State {
  survey: Survey
}

export default class NewSurvey extends React.Component<Props, State> {
  state = {
    survey: DEFAULT_SURVEY,
  }

  handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      survey: {
        ...this.state.survey,
        title: event.target.value,
      },
    })
  }

  handleChangeDescription = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      survey: {
        ...this.state.survey,
        description: event.target.value,
      },
    })
  }

  handleChangeDate = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    if (!value) {
      return
    }

    const expirationDate = new Date(event.target.value).toISOString()
    this.setState({
      survey: {
        ...this.state.survey,
        expirationDate,
      },
    })
  }

  handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    window.scrollTo({ top: 0 })
    this.props.addSurvey(this.state.survey, (res) => {
      if (res) {
        this.setState({ survey: DEFAULT_SURVEY })
      }
    })
  }

  render () {
    const { survey } = this.state
    return (
      <>
        <Typography variant="h3" gutterBottom>Новый опрос</Typography>
        <Container maxWidth="sm">
          <form onSubmit={this.handleSubmit}>
            <TextField
              label="Заголовок"
              margin="normal"
              value={survey.title}
              onChange={this.handleChangeTitle}
              fullWidth
              required
            />
            <TextField
              label="Описание"
              margin="normal"
              value={survey.description}
              onChange={this.handleChangeDescription}
              fullWidth
              required
            />
            <TextField
              label="Дата окончания опроса"
              margin="normal"
              type="date"
              value={survey.expirationDate.slice(0, 10)}
              onChange={this.handleChangeDate}
              fullWidth
              required
              InputLabelProps={{
                shrink: true,
              }}
            />
            <Button
              type="submit"
              style={{ margin: '1em 0' }}
              variant="contained"
              color="primary"
              fullWidth
            >
              Создать
            </Button>
          </form>
        </Container>
      </>
    )
  }
}

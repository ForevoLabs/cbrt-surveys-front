import React, { FormEvent } from 'react'
import axios from 'axios'
import { Button, Container, Paper, TextField, Typography } from '@material-ui/core'
import { BASE_URL } from '../constants'

interface Props {
  checkLogin (): void
}

interface State {
  username: string
  password: string
  status: string
}

export default class Login extends React.Component<Props, State> {
  state = {
    username: '',
    password: '',
    status: '',
  }

  handleLogIn = (event: FormEvent) => {
    event.preventDefault()
    const { username, password } = this.state

    axios
      .post(BASE_URL + '/login', { username, password }, { withCredentials: true })
      .then(() => {
        this.setState({ status: '' })
        this.props.checkLogin()
      })
      .catch(() => {
        this.setState({ status: 'Имя пользователя и/или пароль неправильные.' })
      })
  }

  handleChangeUsername = (event: React.ChangeEvent<HTMLInputElement>) => this.setState(
    { username: event.target.value })

  handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => this.setState(
    { password: event.target.value })

  render () {
    return (
      <Container maxWidth="xs">
        <Paper>
          <form onSubmit={this.handleLogIn}>
            <TextField
              id="username"
              label="Имя пользователя"
              autoComplete="username"
              margin="normal"
              value={this.state.username}
              onChange={this.handleChangeUsername}
              fullWidth
              required
            />
            <TextField
              id="password"
              label="Пароль"
              type="password"
              autoComplete="current-password"
              margin="normal"
              value={this.state.password}
              onChange={this.handleChangePassword}
              fullWidth
              required
            />
            <Button
              type="submit"
              style={{ margin: '1em 0' }}
              variant="contained"
              color="primary"
              fullWidth
            >
              Вход
            </Button>
            <Typography color="error">{this.state.status}</Typography>
          </form>
        </Paper>
      </Container>
    )
  }
}

import React from 'react'
import { Button, Paper } from '@material-ui/core'
import { MinimalSection } from '../types'

interface Props {
  data: MinimalSection

  onChange (
    name: keyof MinimalSection | keyof MinimalSection['base'],
    value: string | number | boolean,
    base: boolean,
  ): void

  remove (): void
}

export default class Section extends React.Component<Props> {
  render () {
    return (
      <Paper style={{ margin: '1em 0' }}>
        <div>
          Section {this.props.data.type}
        </div>
        <Button
          style={{ margin: '1em 0 0' }}
          color="secondary"
          onClick={this.props.remove}
        >
          × Удалить
        </Button>
      </Paper>
    )
  }
}

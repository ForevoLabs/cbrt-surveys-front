import React from 'react'
import { Button, Checkbox, FormControlLabel, Paper, TextField } from '@material-ui/core'
import { MinimalSection, RadioBlock, ShortAnswerBlock } from '../types'

type BaseKeys = 'items' | 'placeholder' | 'other' | 'required'
type Names = keyof MinimalSection | BaseKeys
const CHECKBOXES: Names[] = ['required']

interface Props {
  data: MinimalSection

  onChange (
    name: Names,
    value: string | number | boolean,
    base?: boolean,
  ): void

  remove (): void
}

export default class Section extends React.Component<Props> {
  makeChangeHandler = (
    name: Names,
    base?: boolean,
  ) => (event: React.ChangeEvent<HTMLInputElement>) => {
    this.props.onChange(name,
      CHECKBOXES.includes(name) ? event.target.checked : event.target.value,
      base)
  }

  render () {
    const { data } = this.props
    const { type } = data

    return (
      <Paper style={{ margin: '1em -40px' }}>
        <div>
          <TextField
            label="Заголовок"
            margin="normal"
            value={data.title}
            onChange={this.makeChangeHandler('title')}
            fullWidth
            required
          />
          <TextField
            label="Описание"
            margin="normal"
            value={data.description}
            onChange={this.makeChangeHandler('description')}
            fullWidth
          />
          <TextField
            label="URL изображения"
            margin="normal"
            value={data.image}
            onChange={this.makeChangeHandler('image')}
            fullWidth
          />
          <TextField
            label="URL видео"
            margin="normal"
            value={data.video}
            onChange={this.makeChangeHandler('video')}
            fullWidth
          />
          <TextField
            label="Геоданные, широта"
            margin="normal"
            value={data.lat}
            onChange={this.makeChangeHandler('lat')}
            type="number"
            fullWidth
          />
          <TextField
            label="Геоданные, долгота"
            margin="normal"
            value={data.lng}
            onChange={this.makeChangeHandler('lng')}
            type="number"
            fullWidth
          />
          {(type === 'radiobuttons' ||
            type === 'checkboxes' ||
            type === 'dropdown') &&
          <>
            <TextField
              label="Варианты ответов (один в строке)"
              margin="normal"
              value={(data.base as RadioBlock).items}
              onChange={this.makeChangeHandler('items', true)}
              multiline
              rows="5"
              variant="outlined"
              fullWidth
              required
            />
            <TextField
              label="Подпись к полю «Другое»"
              margin="normal"
              value={(data.base as RadioBlock).other}
              onChange={this.makeChangeHandler('other', true)}
              fullWidth
            />
          </>}
          {type === 'shortAnswer' &&
          <TextField
            label="Плейсхолдер для короткого ответа"
            margin="normal"
            value={(data.base as ShortAnswerBlock).placeholder}
            onChange={this.makeChangeHandler('placeholder', true)}
            fullWidth
          />}
          <FormControlLabel
            label="Обязательность поля"
            control={
              <Checkbox
                checked={data.base.required}
                onChange={this.makeChangeHandler('required', true)}
              />
            }
          />

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

import React, { FormEvent } from 'react'
import { Button, Container, TextField, Typography } from '@material-ui/core'
import { MinimalSection, Survey } from '../types'
import { convertMiniSections } from '../utils'
import Section from './Section'

const DEFAULT_SURVEY: Survey = {
  id: Math.floor(Math.random() * 1e9 + 100),
  title: '',
  description: '',
  expirationDate: '2019-09-30T00:00:00.000Z',
  sections: [],
}

type Key = MinimalSection['type']

const SECTION_TYPES: Record<Key, string> = {
  radiobuttons: 'Радиокнопки',
  checkboxes: 'Флажки',
  dropdown: 'Выпадающий список',
  shortAnswer: 'Однострочный ответ',
  paragraph: 'Многострочный ответ',
}

interface Props {
  addSurvey (survey: Survey, cb: (res: boolean) => void): void
}

interface State {
  survey: Survey
  sections: MinimalSection[]
}

export default class NewSurvey extends React.Component<Props, State> {
  state = {
    survey: DEFAULT_SURVEY,
    sections: [],
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

  makeAddSection = (sectionType: MinimalSection['type']) => () => {
    const { sections } = this.state

    let base: MinimalSection['base'] = ((): MinimalSection['base'] => {
      switch (sectionType) {
        case 'radiobuttons':
        case 'checkboxes':
        case 'dropdown':
          return {
            type: sectionType,
            items: [],
            other: '',
            required: false,
          }
        case 'shortAnswer':
          return {
            type: 'shortAnswer',
            placeholder: '',
            required: false,
          }
        case 'paragraph':
          return {
            type: 'paragraph',
            required: false,
          }
      }
    })()

    this.setState({
      sections: [
        ...sections, {
          type: sectionType,
          title: '',
          description: '',
          image: '',
          video: '',
          lat: 0,
          lng: 0,
          base,
        },
      ],
    })
  }

  handleChangeSection = (index: number) => (name: string, value: any, base = false) => {
    const { sections } = this.state
    const newSections = [...sections]

    if (base) {
      // @ts-ignore
      newSections[index].base[name] = value
    } else {
      // @ts-ignore
      newSections[index][name] = value
    }

    this.setState({ sections: newSections })
  }

  handleRemoveSection = (index: number) => () => {
    const { sections } = this.state
    const newSections = [...sections]

    newSections.splice(index, 1)

    this.setState({
      sections: newSections,
    })
  }

  handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    window.scrollTo({ top: 0 })
    const surveyWithSections = {
      ...this.state.survey,
      sections: this.state.sections.map(convertMiniSections),
    }

    this.props.addSurvey(surveyWithSections, (res) => {
      if (res) {
        this.setState({ survey: DEFAULT_SURVEY })
      }
    })
  }

  render () {
    const { survey, sections } = this.state
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
            {sections.map((section: MinimalSection, i) => (
              <div key={`${i}${section.type}`}>
                <Section
                  data={section}
                  onChange={this.handleChangeSection(i)}
                  remove={this.handleRemoveSection(i)}
                />
              </div>
            ))}
            {Object.entries(SECTION_TYPES)
              .map(([sectionType, name]) => (
                <Button
                  key={sectionType}
                  style={{ margin: '0.5em 1em 0.5em 0' }}
                  variant="contained"
                  onClick={this.makeAddSection(sectionType as MinimalSection['type'])}
                >
                  + {name}
                </Button>
              ))}
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

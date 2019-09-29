export enum Routes {
  Loading,
  Login,
  ListOfSurveys,
  Survey,
}

export interface SurveyData {
  surveys: Survey[]
}

export interface Survey {
  id: number,
  title: string,
  description: string,
  expirationDate: string,
  sections: Section[]
}

export interface Section {
  blocks: Block[]
}

export type Block = TitleBlock | DescriptionBlock | ImageBlock | VideoBlock | GeoBlock
  | RadioBlock | CheckboxesBlock | DropdownBlock | ShortAnswerBlock | ParagraphBlock

export interface MinimalSection {
  type: 'radiobuttons' | 'checkboxes' | 'dropdown' | 'shortAnswer' | 'paragraph',
  title: string,
  description?: string,
  image?: string,
  video?: string,
  lat?: number,
  lng?: number,
  base: RadioBlock | CheckboxesBlock | DropdownBlock | ShortAnswerBlock | ParagraphBlock
}

export interface TitleBlock {
  type: 'title'
  text: string
}

export interface DescriptionBlock {
  type: 'description'
  text: string
}

export interface ImageBlock {
  type: 'image'
  text: string
}

export interface VideoBlock {
  type: 'video'
  text: string
}

export interface GeoBlock {
  type: 'geoData'
  lat: number
  lng: number
}

interface BaseBlock {
  required?: boolean
}

export interface RadioBlock extends BaseBlock {
  type: 'radiobuttons'
  items: string[]
  other?: string
}

export interface CheckboxesBlock extends BaseBlock {
  type: 'checkboxes'
  items: string[]
  other?: string
}

export interface DropdownBlock extends BaseBlock {
  type: 'dropdown'
  items: string[]
  other?: string
}

export interface ShortAnswerBlock extends BaseBlock {
  type: 'shortAnswer'
  placeholder: string
}

export interface ParagraphBlock extends BaseBlock {
  type: 'paragraph'
}

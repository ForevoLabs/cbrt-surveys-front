import { MinimalSection, Section } from './types'

export const convertMiniSections = (minimal: MinimalSection): Section => {
  const result: Section = {
    blocks: [
      {
        type: 'title',
        text: minimal.title,
      },
    ],
  }

  if (minimal.description) {
    result.blocks.push({
      type: 'description',
      text: minimal.description,
    })
  }

  if (minimal.image) {
    result.blocks.push({
      type: 'image',
      text: minimal.image,
    })
  }

  if (minimal.video) {
    result.blocks.push({
      type: 'video',
      text: minimal.video,
    })
  }

  if (minimal.lat && minimal.lng) {
    result.blocks.push({
      type: 'geoData',
      lat: Number(minimal.lat),
      lng: Number(minimal.lng),
    })
  }

  switch (minimal.type) {
    case 'radiobuttons':
    case 'checkboxes':
    case 'dropdown':
      result.blocks.push({
        type: minimal.type,
        // @ts-ignore
        items: minimal.base.items ? minimal.base.items.split('\n') : void 0,
        // @ts-ignore
        other: minimal.base.other || void 0,
        required: minimal.base.required || void 0,
      })
      break
    case 'shortAnswer':
      result.blocks.push({
        type: 'shortAnswer',
        // @ts-ignore
        placeholder: minimal.base.placeholder || void 0,
        required: minimal.base.required || void 0,
      })
      break
    case 'paragraph':
      result.blocks.push({
        type: 'paragraph',
        required: minimal.base.required || void 0,
      })
      break
  }

  return result
}

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
      lat: minimal.lat,
      lng: minimal.lng,
    })
  }

  switch (minimal.type) {
    case 'radiobuttons':
    case 'checkboxes':
    case 'dropdown':
      result.blocks.push({
        type: minimal.type,
        // @ts-ignore
        items: minimal.items.split('\n'),
        // @ts-ignore
        other: minimal.other || void 0,
        // @ts-ignore
        required: minimal.required || void 0,
      })
      break
    case 'shortAnswer':
      result.blocks.push({
        type: 'shortAnswer',
        // @ts-ignore
        placeholder: minimal.placeholder,
        // @ts-ignore
        required: minimal.required || void 0,
      })
      break
    case 'paragraph':
      result.blocks.push({
        type: 'paragraph',
        // @ts-ignore
        required: minimal.required || void 0,
      })
      break
  }

  return result
}

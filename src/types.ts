export interface Settings {
  fileFormat: FileFormat
  oscFrequency: number
  firstOscFrequency: number
  bpm: number
  beatsPerBar: number
  numberOfPreBars: number
  doubleTime: boolean
  highlightMiddle: boolean
  panClick: Pan
  panCue: Pan
}

export interface Section {
  type: CueType
  numberOfBars: number
}

export type Pan = -1 | 0 | 1

export const fileFormats = ['wav', 'mp3'] as const
export type FileFormat = typeof fileFormats[number]

export const cueTypes = [
  'AcaPella',
  'Band',
  'Break',
  'Bridge',
  'Chorus',
  'Count',
  'End',
  'Instrumental',
  'Intro',
  'KeyChange',
  'Outro',
  'PreChorus',
  'Ready',
  'Riff',
  'Solo',
  'Tag',
  'Turn',
  'Verse'
] as const
export type CueType = typeof cueTypes[number]

export const countTypes = ['1', '2', '3', '4', '5', '6', '7'] as const
export type CountType = typeof countTypes[number]

export const oscTypes = ['sine', 'sawtooth', 'square', 'triangle'] as const
export type OscType = typeof oscTypes[number]

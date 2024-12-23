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
  muteClick: boolean
  muteCue: boolean
  numberOfChannels: ChannelNumber
  sampleRate: SampleRate
}

export const defaultSettings: Settings = {
  fileFormat: 'wav',
  oscFrequency: 1318,
  firstOscFrequency: 1760,
  bpm: 120,
  beatsPerBar: 4,
  numberOfPreBars: 1,
  doubleTime: false,
  highlightMiddle: false,
  panClick: 0,
  panCue: 0,
  muteClick: false,
  muteCue: false,
  numberOfChannels: 2,
  sampleRate: 48000
}

export type SettingsMapping = Required<{
  [k in keyof Settings]: string
}>

export interface Section {
  orderCue: OrderCueType
  modalCue?: ModalCueType | null
  numberOfBars: number
  noCountIn?: boolean
}

export const defaultSections: Section[] = [{ orderCue: 'Intro', numberOfBars: 4, modalCue: null, noCountIn: false }]

export type SectionMapping = Required<{
  [k in keyof Section]: string
}>

export type CueMapping = {
  [c in CueType]: string
}

export interface Mappings {
  [version: string]: {
    t: SettingsMapping
    s: SectionMapping
    c: CueMapping
  }
}

export const sampleRates = [44100, 48000] as const
export type SampleRate = (typeof sampleRates)[number]

export const pans = [-1, 0, 1] as const
export type Pan = (typeof pans)[number]

export const fileFormats = ['wav'] as const // mp3 throws error
export type FileFormat = (typeof fileFormats)[number]

export const channelNumbers = [1, 2] as const
export type ChannelNumber = (typeof channelNumbers)[number]

export const orderCueTypes = [
  'Break',
  'Bridge',
  'Chorus',
  'Count',
  'End',
  'Instrumental',
  'Intro',
  'Outro',
  'PreChorus',
  'Ready',
  'Riff',
  'Solo',
  'Tag',
  'Turn',
  'Verse'
] as const
export type OrderCueType = (typeof orderCueTypes)[number]

export const modalCueTypes = ['AcaPella', 'Band', 'Build', 'Calm', 'Drop', 'Drums', 'Instrumental', 'KeyChange', 'Power'] as const
export type ModalCueType = (typeof modalCueTypes)[number]

export const cueTypes = [...orderCueTypes, ...modalCueTypes] as const
export type CueType = (typeof cueTypes)[number]

export const countTypes = ['1', '2', '3', '4', '5', '6', '7'] as const
export type CountType = (typeof countTypes)[number]

export const oscTypes = ['sine', 'sawtooth', 'square', 'triangle'] as const
export type OscType = (typeof oscTypes)[number]

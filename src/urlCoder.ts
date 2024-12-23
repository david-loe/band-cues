import LZString from 'lz-string'
import { toJson, toRJson } from 'really-relaxed-json'
import {
  ChannelNumber,
  channelNumbers,
  CueType,
  defaultSections,
  defaultSettings,
  Mappings,
  Pan,
  pans,
  SampleRate,
  sampleRates,
  Section,
  Settings
} from './types'

type mappedData = { [k: string]: number | string | boolean }

export default class URLCoder {
  baseURL = window.location.origin + window.location.pathname
  currentVersion = 'v1'
  mappings: Mappings = {
    v1: {
      t: {
        fileFormat: 'f',
        oscFrequency: 'of',
        firstOscFrequency: 'fo',
        bpm: 't',
        beatsPerBar: 'b',
        numberOfPreBars: 'pb',
        doubleTime: 'd',
        highlightMiddle: 'h',
        panClick: 'pi',
        panCue: 'pu',
        muteClick: 'mi',
        muteCue: 'mu',
        numberOfChannels: 'c',
        sampleRate: 's'
      },
      s: {
        orderCue: 'o',
        modalCue: 'm',
        numberOfBars: 'b',
        noCountIn: 'c'
      },
      c: {
        Break: 'B',
        Bridge: 'b',
        Chorus: 'c',
        Count: 'C',
        End: 'e',
        Instrumental: 'i',
        Intro: 'I',
        Outro: 'o',
        PreChorus: 'p',
        Ready: 'r',
        Riff: 'R',
        Solo: 's',
        Tag: 't',
        Turn: 'T',
        Verse: 'v',
        AcaPella: 'a',
        Band: 'ba',
        Build: 'bu',
        Calm: 'ca',
        Drop: 'd',
        Drums: 'D',
        KeyChange: 'k',
        Power: 'P'
      }
    }
  }

  mapSettings(settings: Settings, version = this.currentVersion) {
    return Object.entries(settings).reduce((acc, [key, value]) => {
      acc[this.mappings[version]['t'][key as keyof Settings]] = value
      return acc
    }, {} as mappedData)
  }

  mapSections(sections: Section[], version = this.currentVersion) {
    return sections.map((section) => {
      return Object.entries(section).reduce((acc, [key, value]) => {
        let val = value
        if (key === 'orderCue' || key == 'modalCue') {
          val = this.mappings[version]['c'][val as CueType]
        }
        acc[this.mappings[version]['s'][key as keyof Section]] = val
        return acc
      }, {} as mappedData)
    })
  }

  unmapSettings(mapped: mappedData, version = this.currentVersion, settings = defaultSettings): Settings {
    // Invertiere die Mapping-Tabelle
    const reverseMapping = Object.entries(this.mappings[version]['t']).reduce((revMapping, [originalKey, mappedKey]) => {
      revMapping[mappedKey] = originalKey as keyof Settings
      return revMapping
    }, {} as Record<string, keyof Settings>)

    // Erzeuge die ursprünglichen Settings
    return Object.entries(mapped).reduce((acc, [key, value]) => {
      const originalKey = reverseMapping[key]
      //@ts-ignore
      acc[originalKey] = value
      return acc
    }, settings)
  }

  unmapSections(mapped: mappedData[], version = this.currentVersion): Section[] {
    // Invertiere die Mapping-Tabelle
    const reverseSectionMapping = Object.entries(this.mappings[version]['s']).reduce((revMapping, [originalKey, mappedKey]) => {
      revMapping[mappedKey] = originalKey as keyof Section
      return revMapping
    }, {} as Record<string, keyof Section>)

    const reverseCueMapping = Object.entries(this.mappings[version]['c']).reduce((revMapping, [originalKey, mappedKey]) => {
      revMapping[mappedKey] = originalKey as CueType
      return revMapping
    }, {} as Record<string, CueType>)

    // Erzeuge die ursprünglichen Settings
    return mapped.map((mappedSection) => {
      return Object.entries(mappedSection).reduce((section, [key, value]) => {
        const originalKey = reverseSectionMapping[key]
        let val = value
        if (originalKey === 'orderCue' || originalKey == 'modalCue') {
          val = reverseCueMapping[val as CueType]
        }
        //@ts-ignore
        section[originalKey] = val
        return section
      }, {} as Section)
    })
  }

  cueToUrl(settings: Settings, sections: Section[], version = this.currentVersion) {
    const mapped = {
      t: this.mapSettings(settings, version),
      s: this.mapSections(sections, version)
    }
    const json = JSON.stringify(mapped, (key, val) => (val === null || val === false ? undefined : val))
    const rjson = toRJson(json)
    const compressed = LZString.compressToEncodedURIComponent(rjson)
    return `${this.baseURL}?${version}=${compressed}`
  }
  urlToCue(searchString: string): { settings: Settings; sections: Section[] } {
    const settings = defaultSettings
    const sections = defaultSections
    if (searchString.startsWith('?')) {
      const urlParams = new URLSearchParams(searchString)
      let version = ''
      let str = ''
      for (const v in this.mappings) {
        let val = urlParams.get(v)
        if (val) {
          version = v
          str = val
          break
        }
      }

      switch (version) {
        case 'v1': {
          const rjson = LZString.decompressFromEncodedURIComponent(str)
          const json = toJson(rjson)
          const data: { t: mappedData; s: mappedData[] } = JSON.parse(json)
          return {
            settings: this.unmapSettings(data.t, version),
            sections: data.s.length > 0 ? this.unmapSections(data.s, version) : sections
          }
          break
        }

        default: {
          // Sections parsen
          const parsedSections = []
          for (const sectionParam of urlParams.getAll('sections')) {
            // JSON.parse gibt 'any' zurück, wir casten auf Section
            const parsed = JSON.parse(sectionParam) as Section
            parsedSections.push(parsed)
          }
          if (parsedSections.length > 0) {
            sections.push(...parsedSections)
          }
          // Settings parsen
          const settingsKeys = Object.keys(settings) as (keyof Settings)[]
          for (const setting of settingsKeys) {
            const value = urlParams.get(setting)
            if (value !== null) {
              // Hier differenziert auf Typ prüfen
              switch (setting) {
                case 'fileFormat':
                  if (value === 'wav') {
                    // || value === 'mp3'
                    settings[setting] = value
                  }
                  break

                case 'oscFrequency':
                case 'firstOscFrequency':
                case 'bpm':
                case 'beatsPerBar':
                case 'numberOfPreBars': {
                  const num = parseInt(value, 10)
                  if (!isNaN(num)) {
                    settings[setting] = num // TypeScript weiß, dass der erwartete Typ number ist
                  }
                  break
                }

                case 'doubleTime':
                case 'highlightMiddle':
                case 'muteClick':
                case 'muteCue':
                  // Boolean-Werte konvertieren
                  if (value === 'true') {
                    settings[setting] = true
                  } else if (value === 'false') {
                    settings[setting] = false
                  }
                  break

                case 'panClick':
                case 'panCue': {
                  const panVal = parseInt(value, 10)
                  if (pans.includes(panVal as Pan)) {
                    settings[setting] = panVal as Pan
                  }
                  break
                }

                case 'numberOfChannels': {
                  const num = parseInt(value, 10)
                  if (channelNumbers.includes(num as ChannelNumber)) {
                    settings[setting] = num as ChannelNumber
                  }
                  break
                }
                case 'sampleRate': {
                  const num = parseInt(value, 10)
                  if (sampleRates.includes(num as SampleRate)) {
                    settings[setting] = num as SampleRate
                  }
                  break
                }
              }
            }
          }

          break
        }
      }
    }
    return { settings, sections }
  }
}

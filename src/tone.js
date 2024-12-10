import * as Tone from 'tone'
import { bufferToWave, wave2mp3 } from './utils'

export default class MD {
  constructor(settings, sections, oscTypes) {
    this.settings = settings
    this.sections = sections
    this.oscTypes = oscTypes
  }

  getSection(beat) {
    var countBeats = 0
    for (var i = 0; i < this.sections.length; i++) {
      var isFirstBeatOfSection = countBeats + 1 === beat
      countBeats += this.settings.beatsPerBar * this.sections[i].numberOfBars
      if (beat <= countBeats) {
        return { section: this.sections[i], isFirstBeatOfSection: isFirstBeatOfSection }
      }
    }
    return { section: null, isFirstBeatOfSection: false }
  }

  async generateCues() {
    const startTime = Date.now() // Startzeit wird für Logging-Zwecke gespeichert


    // Gesamtanzahl der Takte berechnen, einschließlich Vorbereitungs-Takte
    var totalNumberOfBars = this.settings.numberOfPreBars
    for (const section of this.sections) {
      totalNumberOfBars += section.numberOfBars
    }

    // Berechnung der Gesamtdauer der Cue-Audiosequenz
    const cueDuration = Math.ceil((60 / this.settings.bpm) * this.settings.beatsPerBar * totalNumberOfBars)

    // Offline-Audio-Rendering mit Tone.js
    const buffer = await Tone.Offline(
      async ({ transport }) => {
        // Oszillatoren für Tonausgabe initialisieren
        const osc = new Tone.Oscillator(this.settings.oscFrequency, this.oscTypes[0]).toDestination()
        const firstOsc = new Tone.Oscillator(this.settings.firstOscFrequency, this.oscTypes[0]).toDestination()
        const offlineDestination = Tone.getDestination() // Offline-Audioziel für Tone.js

        const player = {} // Speicher für Player-Objekte
        var sectionTypes = [] // Speichert die Typen der Abschnitte

        // Extrahiert die eindeutigen Abschnittstypen
        for (var i = 0; i < this.sections.length; i++) {
          sectionTypes.push(this.sections[i].type)
        }
        sectionTypes = [...new Set(sectionTypes)]

        // Lädt Audiodateien für jeden Abschnittstyp
        for (const type of sectionTypes) {
          player[type] = new Tone.Player().connect(offlineDestination)
          await player[type].load(require('./assets/cues/' + type + '.wav')) // Audiodatei laden
        }

        // Lädt Audiodateien für die Beats pro Takt (außer dem ersten Beat)
        for (i = 2; i <= this.settings.beatsPerBar; i++) {
          player[i.toString()] = new Tone.Player().connect(offlineDestination)
          await player[i.toString()].load(require('./assets/cues/' + i.toString() + '.wav'))
        }

        transport.bpm.value = this.settings.bpm // Setzt das Tempo des Transports

        var countBeats = 0 // Zählt die abgespielten Beats
        var cueCounting = false // Markiert, ob eine Cue-Ansage läuft

        // Hauptzeitplan für Beat-Wiederholungen
        transport.scheduleRepeat((time) => {
          if (++countBeats > totalNumberOfBars * this.settings.beatsPerBar) {
            transport.stop() // Stoppt den Transport nach der letzten Takt
          } else {
            // Erster Beat eines Takts
            if (countBeats % this.settings.beatsPerBar === 1) {
              cueCounting = false // Cue-Ansage zurücksetzen
              firstOsc.start(time).stop(time + 0.04) // Startet den ersten Oszillator kurz

              // Berechnet den aktuellen Beat relativ zu den Vorbereitungs-Takten
              var recalcedCountBeats = countBeats - (this.settings.numberOfPreBars - 1) * this.settings.beatsPerBar
              if (recalcedCountBeats >= 0) {
                const getSection = this.getSection(recalcedCountBeats) // Holt den aktuellen Abschnitt
                if (getSection.isFirstBeatOfSection) {
                  player[getSection.section.type].start(time) // Spielt Cue für Abschnittstyp ab
                  cueCounting = true // Aktiviert Cue-Ansage
                }
              }
            } else {
              // Andere Beats im Takt
              if (this.settings.highlightMiddle && countBeats % this.settings.beatsPerBar === this.settings.beatsPerBar / 2 + 1) {
                firstOsc.start(time).stop(time + 0.04) // Mittlerer Beat hervorheben
              } else {
                osc.start(time).stop(time + 0.04) // Standardton für andere Beats
              }
              if (cueCounting) {
                // Spielt Beat-spezifische Cue ab, wenn Cue-Ansage aktiv ist
                player[(((countBeats - 1) % this.settings.beatsPerBar) + 1).toString()].start(time)
              }
            }
          }
        }, '4n') // Wiederholung im Viertelnoten-Rhythmus

        // Falls Double-Time aktiviert ist, spielt es zusätzliche Cue-Töne
        if (this.settings.doubleTime) {
          transport.scheduleRepeat(
            (time) => {
              osc.start(time).stop(time + 0.04)
            },
            '4n',
            '8n', // Startzeit auf halbe Noten
          )
        }

        transport.start() // Startet den Transport
      },
      cueDuration, // Gesamtdauer der Offline-Rendering-Sitzung
      1, // Offline-Rendering-Qualität (1 = normale Auflösung)
    )

    // Konvertiert den Audio-Buffer in eine WAVE-Datei
    const wave = bufferToWave(buffer.get())

    // Erstellt eine URL für die generierte Audiodatei je nach Dateiformat
    if (this.settings.fileFormat === 'wav') {
      return URL.createObjectURL(new Blob([wave], { type: 'audio/wav' }))
    } else if (this.settings.fileFormat === 'mp3') {
      return URL.createObjectURL(new Blob(wave2mp3(wave), { type: 'audio/mp3' }))
    }
    console.log(Date.now() - startTime) // Protokolliert die verstrichene Zeit
  }
}





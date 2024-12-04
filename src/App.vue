<template>
  <div class="container">
    <h1>Band Cues🎧</h1>
    <form @submit.prevent="generate()">
      <div class="row mb-5">
        <div class="col-auto">
          <label for="bpm" class="form-label">BPM <i class="bi bi-speedometer"></i> </label>
          <input type="number" class="form-control" id="bpm" v-model="settings.bpm" min="1" max="300" />
          <div class="form-check form-switch">
            <input class="form-check-input" type="checkbox" id="doubleTime" v-model="settings.doubleTime" />
            <label class="form-check-label" for="doubleTime">Double Time Click</label>
          </div>
        </div>

        <div class="col-auto">
          <label for="beatsPerBar" class="form-label">Beats per Bar</label>
          <input type="number" class="form-control" id="beatsPerBar" min="2" max="8" v-model="settings.beatsPerBar" />
        </div>
        <div class="col-auto">
          <label for="firstOscFrequency" class="form-label">First Click Tone [hz]</label>
          <input type="number" class="form-control" id="firstOscFrequency" min="20" max="20000" v-model="settings.firstOscFrequency" />
          <div class="form-check form-switch" v-if="settings.beatsPerBar % 2 == 0">
            <input class="form-check-input" type="checkbox" id="highlightMiddle" v-model="settings.highlightMiddle" />
            <label class="form-check-label" for="highlightMiddle">Also {{ settings.beatsPerBar / 2 + 1 }}. Beat</label>
          </div>
        </div>
        <div class="col-auto">
          <label for="oscFrequency" class="form-label">Click Tone [hz]</label>
          <input type="number" class="form-control" id="oscFrequency" min="20" max="20000" v-model="settings.oscFrequency" />
        </div>
        <div class="col-auto">
          <label for="fileFormat" class="form-label">File Format</label>
          <select class="form-select" v-model="settings.fileFormat" id="fileFormat">
            <option v-for="format in fileFormats" :key="format">{{ format }}</option>
          </select>
        </div>
        <small v-if="settings.fileFormat === 'mp3'">ℹ Converting to MP3 takes signifigantly longer than WAV</small>
        <small v-if="settings.beatsPerBar === 3">ℹ Consider 6 Beats per Bar and also 3. beat high frequency</small>
      </div>
      <div class="mb-4">
        <div class="row mb-2">
          <div class="col-auto" style="min-width: 390px">
            <ul class="list-group">
              <li class="list-group-item">
                <div class="row align-items-end">
                  <div class="col-auto" style="max-width: 160px">
                    <label for="preBarsSection" class="form-label">Section</label>
                    <input type="text" class="form-control" value="Prebars" id="preBarsSection" readonly />
                  </div>
                  <div class="col-auto" style="max-width: 80px">
                    <label for="numberOfPreBars" class="form-label">Bars</label>
                    <input type="number" class="form-control" min="1" id="numberOfPreBars" v-model="settings.numberOfPreBars" />
                  </div>
                </div>
              </li>
              <li class="list-group-item" v-for="(section, index) in sections" :key="index">
                <div class="row align-items-end">
                  <div class="col-auto" style="max-width: 160px">
                    <label :for="index + 'section'" class="form-label">Section</label>
                    <select class="form-select" v-model="section.type" :id="index + 'section'">
                      <option v-for="type in cueTypes" :key="type">{{ type }}</option>
                    </select>
                  </div>
                  <div class="col-auto" style="max-width: 80px">
                    <label :for="index + 'numberOfBars'" class="form-label">Bars</label>
                    <input type="number" class="form-control" min="1" :id="index + 'numberOfBars'" v-model="section.numberOfBars" />
                  </div>
                  <div class="col-auto">
                    <button type="button" class="btn btn-outline-secondary d-none d-sm-block" v-on:click="duplicateSection(section)">
                      <i class="bi bi-clipboard-plus"></i>
                      Duplicate
                    </button>
                    <div class="d-sm-none mb-1">
                      <button type="button" class="btn btn-outline-secondary me-2" v-on:click="duplicateSection(section)">
                        <i class="bi bi-clipboard-plus"></i>
                      </button>
                      <button
                        v-if="sections.indexOf(section) > 0"
                        type="button"
                        class="btn btn-outline-secondary"
                        v-on:click="moveSectionUp(section)"
                      >
                        <i class="bi bi-chevron-up"></i>
                      </button>
                    </div>
                    <div class="d-sm-none">
                      <button type="button" class="btn btn-outline-danger me-2" v-on:click="deleteSection(section)">
                        <i class="bi bi-trash"></i>
                      </button>
                      <button
                        v-if="sections.indexOf(section) < sections.length - 1"
                        type="button"
                        class="btn btn-outline-secondary"
                        v-on:click="moveSectionDown(section)"
                      >
                        <i class="bi bi-chevron-down"></i>
                      </button>
                    </div>
                  </div>
                  <div class="col-auto d-none d-sm-block">
                    <button type="button" class="btn btn-outline-danger" v-on:click="deleteSection(section)">
                      <i class="bi bi-trash"></i>
                      Delete
                    </button>
                  </div>
                  <div class="col-auto d-none d-sm-block">
                    <div class="mb-1">
                      <button
                        v-if="sections.indexOf(section) > 0"
                        type="button"
                        class="btn btn-outline-secondary"
                        v-on:click="moveSectionUp(section)"
                      >
                        <i class="bi bi-chevron-up"></i>
                      </button>
                    </div>
                    <div>
                      <button
                        v-if="sections.indexOf(section) < sections.length - 1"
                        type="button"
                        class="btn btn-outline-secondary"
                        v-on:click="moveSectionDown(section)"
                      >
                        <i class="bi bi-chevron-down"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div v-if="sections.length === 0" class="alert alert-secondary mb-2" role="alert">No Section defined.</div>
        <div class="mb-2">
          <button type="button" class="btn btn-secondary" v-on:click="addSection()">
            <i class="bi bi-plus-lg"></i>
            Add Section
          </button>
        </div>
      </div>
      <div class="mb-3">
        <button type="submit" class="btn btn-primary" :disabled="isLoading || !inputCorrect()">
          <i class="bi bi-play-circle"></i>
          Generate
        </button>
        <button type="button" class="ms-2 me-2 btn btn-outline-secondary" v-on:click="cueToUrl()">
          <i class="bi bi-clipboard"></i> Copy Cue URL
        </button>
      </div>
      <div v-if="isLoading">
        <div class="spinner-border text-primary">
          <span class="visually-hidden">Loading...</span>
        </div>
        <small class="text-primary">This migth take up to a minute..</small>
      </div>
      <div v-if="cueTrack !== '' && !isLoading" class="row align-items-center">
        <div class="col-auto">
          <audio controls :src="cueTrack"></audio>
        </div>

        <div class="col-auto">
          <a type="button" class="btn btn-secondary" :href="cueTrack" download="band cues"><i class="bi bi-download"></i></a>
        </div>
        <div class="w-100"></div>
        <div class="col-auto">
          <small> Cues🎧 from <a href="https://worshiptutorials.com/product/clicks-and-cues/">WorshipTutorials</a> </small>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import * as Tone from 'tone'
import { bufferToWave, wave2mp3 } from './utils'

export default {
  name: 'App',
  components: {},
  data() {
    return {
      cueTypes: [
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
        'Verse',
      ],
      oscTypes: ['sine', 'sawtooth', 'square', 'triangle'],
      fileFormats: ['mp3', 'wav'],
      cueTrack: '',
      isLoading: false,
      settings: {
        fileFormat: 'wav',
        oscFrequency: 1318,
        firstOscFrequency: 1760,
        bpm: 120,
        beatsPerBar: 4,
        numberOfPreBars: 2,
        doubleTime: false,
        highlightMiddle: false,
      },
      sections: [{ type: 'Intro', numberOfBars: 4 }],
    }
  },
  methods: {
    cueToUrl() {
      var url = window.location.origin + window.location.pathname + '?'
      url = url + new URLSearchParams(this.settings).toString()
      var sectionURL = ''
      for (const section of this.sections) {
        sectionURL =
          sectionURL + '&sections=' + encodeURIComponent('{"type":"' + section.type + '","numberOfBars":' + section.numberOfBars + '}')
      }
      url = url + sectionURL
      if (window.isSecureContext) {
        navigator.clipboard.writeText(url).then(
          function () {
            console.log('success')
          },
          function (err) {
            console.log(err)
          },
        )
      }
    },
    urlToCue() {
      const urlParams = new URLSearchParams(window.location.search)
      const sections = []
      for (const section of urlParams.getAll('sections')) {
        sections.push(JSON.parse(section))
      }
      if (sections.length > 0) {
        this.sections = sections
      }
      const settings = Object.keys(this.settings)
      for (const setting of settings) {
        const value = urlParams.get(setting)
        if (value !== null) {
          if (!isNaN(value)) {
            this.settings[setting] = +value
          } else if (value === 'true') {
            this.settings[setting] = true
          } else if (value === 'false') {
            this.settings[setting] = false
          } else {
            this.settings[setting] = value
          }
        }
      }
    },
    moveSectionDown(section) {
      const index = this.sections.indexOf(section)
      if (index !== -1 && index < this.sections.length - 1) {
        var temp = this.sections[index]
        this.sections[index] = this.sections[index + 1]
        this.sections[index + 1] = temp
      }
    },
    moveSectionUp(section) {
      const index = this.sections.indexOf(section)
      if (index > 0) {
        var temp = this.sections[index]
        this.sections[index] = this.sections[index - 1]
        this.sections[index - 1] = temp
      }
    },
    addSection() {
      this.sections.push({ type: 'Intro', numberOfBars: 4 })
    },
    duplicateSection(section) {
      const newSection = {}
      Object.assign(newSection, section)
      const index = this.sections.indexOf(section)
      if (index !== -1) {
        this.sections.splice(index, 0, newSection)
      }
    },
    deleteSection(section) {
      const index = this.sections.indexOf(section)
      if (index !== -1) {
        this.sections.splice(index, 1)
      }
    },
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
    },
    inputCorrect() {
      return this.settings.beatsPerBar <= 8 && this.settings.beatsPerBar >= 2 && this.sections.length > 0
    },
    async generate() {
      const startTime = Date.now() // Startzeit wird für Logging-Zwecke gespeichert
      if (!this.inputCorrect()) return '' // Abbruch, wenn die Eingabe ungültig ist
      this.isLoading = true // Zeigt an, dass der Generierungsprozess gestartet hat

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
        this.cueTrack = URL.createObjectURL(new Blob([wave], { type: 'audio/wav' }))
      } else if (this.settings.fileFormat === 'mp3') {
        this.cueTrack = URL.createObjectURL(new Blob(wave2mp3(wave), { type: 'audio/mp3' }))
      }

      this.isLoading = false // Markiert, dass die Generierung abgeschlossen ist
      console.log(Date.now() - startTime) // Protokolliert die verstrichene Zeit
      clearInterval(this.progressIntervall) // Löscht jegliche laufende Fortschritts-Intervalle
    },
  },
  beforeMount() {
    this.urlToCue()
  },
}
</script>

<style></style>

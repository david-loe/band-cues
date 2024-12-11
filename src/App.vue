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
        <div class="col-auto">
          <label for="numberOfChannels" class="form-label">Number of Channels</label>
          <select class="form-select" v-model="settings.numberOfChannels" id="numberOfChannels">
            <option v-for="numbers in channelNumbers" :key="numbers" :value="numbers">{{ numbers }}</option>
          </select>
        </div>
        <div class="col-auto">
          <label for="sampleRate" class="form-label">Sample Rate</label>
          <select class="form-select" v-model="settings.sampleRate" id="sampleRate">
            <option v-for="sampleRate in sampleRates" :key="sampleRate" :value="sampleRate">{{ sampleRate }}</option>
          </select>
        </div>
        <div class="col-auto">
          <table class="table">
            <thead>
              <tr>
                <th scope="col"></th>
                <th scope="col">Click</th>
                <th scope="col">Cue</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row"></th>
                <td>
                  <input type="checkbox" class="btn-check" id="muteClick" v-model="settings.muteClick" />
                  <label class="btn btn-outline-danger btn-sm" for="muteClick">Mute</label>
                </td>
                <td>
                  <input type="checkbox" class="btn-check" id="muteCue" v-model="settings.muteCue" />
                  <label class="btn btn-outline-danger btn-sm" for="muteCue">Mute</label>
                </td>
              </tr>
              <tr v-if="settings.numberOfChannels > 1">
                <th scope="row">Pan</th>
                <td style="max-width: 80px">
                  <input type="range" class="form-range" min="-1" max="1" id="panClick" v-model="settings.panClick" />
                </td>
                <td style="max-width: 80px">
                  <input type="range" class="form-range" min="-1" max="1" id="panCue" v-model="settings.panCue" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="col-auto" style="max-width: 100px"></div>

        <!-- <small v-if="settings.fileFormat === 'mp3'">ℹ Converting to MP3 takes signifigantly longer than WAV</small> -->
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
                    <select class="form-select" v-model="section.orderCue" :id="index + 'section'">
                      <option v-for="type in orderCueTypes" :key="type">{{ type }}</option>
                    </select>
                  </div>
                  <div class="col-auto" style="max-width: 160px">
                    <label :for="index + 'section'" class="form-label">Modal Cue</label>
                    <select class="form-select" v-model="section.modalCue" :id="index + 'section'">
                      <option :value="null">None</option>
                      <option v-for="type in modalCueTypes" :key="type">{{ type }}</option>
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
                        v-on:click="moveSectionUp(section)">
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
                        v-on:click="moveSectionDown(section)">
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
                        v-on:click="moveSectionUp(section)">
                        <i class="bi bi-chevron-up"></i>
                      </button>
                    </div>
                    <div>
                      <button
                        v-if="sections.indexOf(section) < sections.length - 1"
                        type="button"
                        class="btn btn-outline-secondary"
                        v-on:click="moveSectionDown(section)">
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

<script lang="ts">
import MD from './tone.js'
import {
  ChannelNumber,
  Pan,
  SampleRate,
  Section,
  Settings,
  channelNumbers,
  cueTypes,
  fileFormats,
  modalCueTypes,
  orderCueTypes,
  pans,
  sampleRates
} from './types.js'

export default {
  name: 'App',
  components: {},
  data() {
    return {
      cueTypes,
      fileFormats,
      channelNumbers,
      modalCueTypes,
      orderCueTypes,
      sampleRates,
      cueTrack: '',
      isLoading: false,
      settings: {
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
      } as Settings,
      sections: [{ orderCue: 'Intro', numberOfBars: 4 }] as Section[]
    }
  },
  methods: {
    cueToUrl() {
      var url = window.location.origin + window.location.pathname + '?'
      const stringParams: Record<string, string> = Object.entries(this.settings).reduce((acc, [key, value]) => {
        acc[key] = String(value)
        return acc
      }, {} as Record<string, string>)
      url = url + new URLSearchParams(stringParams).toString()
      var sectionURL = ''
      for (const section of this.sections) {
        sectionURL = sectionURL + '&sections=' + encodeURIComponent(JSON.stringify(section, (key, val) => (val === null ? undefined : val)))
      }
      url = url + sectionURL
      if (window.isSecureContext) {
        navigator.clipboard.writeText(url).then(
          function () {
            console.log('success')
          },
          function (err) {
            console.log(err)
          }
        )
      }
    },
    urlToCue() {
      const urlParams = new URLSearchParams(window.location.search)

      // Sections parsen
      const sections = []
      for (const sectionParam of urlParams.getAll('sections')) {
        // JSON.parse gibt 'any' zurück, wir casten auf Section
        const parsed = JSON.parse(sectionParam) as Section
        sections.push(parsed)
      }
      if (sections.length > 0) {
        this.sections = sections
      }

      // Settings parsen
      const settingsKeys = Object.keys(this.settings) as (keyof Settings)[]
      for (const setting of settingsKeys) {
        const value = urlParams.get(setting)
        if (value !== null) {
          // Hier differenziert auf Typ prüfen
          switch (setting) {
            case 'fileFormat':
              if (value === 'wav') {
                // || value === 'mp3'
                this.settings[setting] = value
              }
              break

            case 'oscFrequency':
            case 'firstOscFrequency':
            case 'bpm':
            case 'beatsPerBar':
            case 'numberOfPreBars': {
              const num = parseInt(value, 10)
              if (!isNaN(num)) {
                this.settings[setting] = num // TypeScript weiß, dass der erwartete Typ number ist
              }
              break
            }

            case 'doubleTime':
            case 'highlightMiddle':
            case 'muteClick':
            case 'muteCue':
              // Boolean-Werte konvertieren
              if (value === 'true') {
                this.settings[setting] = true
              } else if (value === 'false') {
                this.settings[setting] = false
              }
              break

            case 'panClick':
            case 'panCue': {
              const panVal = parseInt(value, 10)
              if (pans.includes(panVal as Pan)) {
                this.settings[setting] = panVal as Pan
              }
              break
            }

            case 'numberOfChannels': {
              const num = parseInt(value, 10)
              if (channelNumbers.includes(num as ChannelNumber)) {
                this.settings[setting] = num as ChannelNumber
              }
              break
            }
            case 'sampleRate': {
              const num = parseInt(value, 10)
              if (sampleRates.includes(num as SampleRate)) {
                this.settings[setting] = num as SampleRate
              }
              break
            }
          }
        }
      }
    },
    moveSectionDown(section: Section) {
      const index = this.sections.indexOf(section)
      if (index !== -1 && index < this.sections.length - 1) {
        var temp = this.sections[index]
        this.sections[index] = this.sections[index + 1]
        this.sections[index + 1] = temp
      }
    },
    moveSectionUp(section: Section) {
      const index = this.sections.indexOf(section)
      if (index > 0) {
        var temp = this.sections[index]
        this.sections[index] = this.sections[index - 1]
        this.sections[index - 1] = temp
      }
    },
    addSection() {
      this.sections.push({ orderCue: 'Intro', numberOfBars: 4, modalCue: null })
    },
    duplicateSection(section: Section) {
      const newSection = {} as Section
      Object.assign(newSection, section)
      const index = this.sections.indexOf(section)
      if (index !== -1) {
        this.sections.splice(index, 0, newSection)
      }
    },
    deleteSection(section: Section) {
      const index = this.sections.indexOf(section)
      if (index !== -1) {
        this.sections.splice(index, 1)
      }
    },
    inputCorrect() {
      return this.settings.beatsPerBar <= 8 && this.settings.beatsPerBar >= 2 && this.sections.length > 0
    },
    async generate() {
      if (!this.inputCorrect()) return ''
      this.isLoading = true
      const md = new MD(this.settings, this.sections)
      const result = await md.generateCues()
      this.isLoading = false
      this.cueTrack = result
    }
  },
  beforeMount() {
    this.urlToCue()
  }
}
</script>

<style></style>

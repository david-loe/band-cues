<template>
  <div class="container">
    <h1>Band Cues🎧</h1>
    <form @submit.prevent="generate()">

    <div class="row mb-5">
      <div class="col-auto">
        <label for="bpm" class="form-label">BPM <i class="bi bi-speedometer"></i>
</label>
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
      <small v-if="settings.beatsPerBar === 6">ℹ Consider Double Time Click and 3 Beats per Bar</small>
    </div>
    <div class="mb-4">
    <div class="row mb-2">
    <div class="col-auto" style="min-width: 390px">
      <ul class="list-group">
      <li class="list-group-item">
      <div class="row align-items-end">
            <div class="col-auto"  style="max-width: 160px">
            <label for="preBarsSection" class="form-label">Section</label>
            <input type="text" class="form-control" value="Prebars" id="preBarsSection" readonly/>
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
            <button v-if="sections.indexOf(section) > 0" type="button" class="btn btn-outline-secondary" v-on:click="moveSectionUp(section)"><i class="bi bi-chevron-up"></i></button>
            </div>
            <div class="d-sm-none">
            <button type="button" class="btn btn-outline-danger me-2" v-on:click="deleteSection(section)"><i class="bi bi-trash"></i></button>
            <button v-if="sections.indexOf(section) < sections.length - 1" type="button" class="btn btn-outline-secondary" v-on:click="moveSectionDown(section)"><i class="bi bi-chevron-down"></i></button>
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
            <button v-if="sections.indexOf(section) > 0" type="button" class="btn btn-outline-secondary" v-on:click="moveSectionUp(section)"><i class="bi bi-chevron-up"></i></button>
            </div>
            <div>
            <button v-if="sections.indexOf(section) < sections.length - 1" type="button" class="btn btn-outline-secondary" v-on:click="moveSectionDown(section)"><i class="bi bi-chevron-down"></i></button>
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
        Generate</button>
      <button type="button" class="ms-2 me-2 btn btn-outline-secondary" v-on:click="cueToUrl()"><i class="bi bi-clipboard"></i> Copy Cue URL</button>
      <span v-if="clipboardState === 1"><i class="bi bi-hourglass-split"></i></span>
      <span v-else-if="clipboardState === 2"><i class="bi bi-check"></i></span>
      <span v-else-if="clipboardState === -1"><i class="bi bi-x"></i></span>
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
import lamejs from 'lamejs'

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
      clipboardState: 0,
      settings: {
        fileFormat: 'wav',
        oscFrequency: 440,
        firstOscFrequency: 600,
        bpm: 120,
        beatsPerBar: 4,
        numberOfPreBars: 4,
        doubleTime: false,
      },
      sections: [{ type: 'Intro', numberOfBars: 4 }],
    }
  },
  methods: {
    cueToUrl(){
      this.clipboardState = 1
      console.log(window.location)
      var url = window.location.origin + "/?"
      url = url + new URLSearchParams(this.settings).toString()
      var sectionURL = ""
      for (const section of this.sections) {
        sectionURL = sectionURL + "&sections=" + encodeURIComponent('{"type":"' + section.type + '","numberOfBars":' + section.numberOfBars + '}')
      }
      url = url + sectionURL
      console.log(url)
      if(window.isSecureContext){
        navigator.clipboard.writeText(url).then(function() {
        this.clipboardState = 2
      }, function(err) {
        this.clipboardState = -1
        console.log(err)
      });
      }else{
        this.clipboardState = -1
      }
    },
    urlToCue(){
      const urlParams = new URLSearchParams(window.location.search)
      const sections = []
      for(const section of urlParams.getAll("sections")){
        sections.push(JSON.parse(section))
      }
      if(sections.length > 0){
        this.sections = sections
      }
      const settings = Object.keys(this.settings)
      for (const setting of settings){
        const value = urlParams.get(setting)
        if(value !== null){
          if(!isNaN(value)){
            this.settings[setting] = +value
          }else if(value === "true"){
            this.settings[setting] = true
          }else if(value === "false"){
            this.settings[setting] = false
          }else{
            this.settings[setting] = value
          }
        }
      }
    },
    moveSectionDown(section){
      const index = this.sections.indexOf(section)
      if (index !== -1 && index < this.sections.length - 1){
        var temp = this.sections[index]
        this.sections[index] = this.sections[index + 1]
        this.sections[index + 1] = temp
      }
    },
    moveSectionUp(section){
      const index = this.sections.indexOf(section)
      if (index > 0){
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
      console.log(this.sections)
      console.log(this.settings)
      if (!this.inputCorrect()) return ''
      this.isLoading = true
      var totalNumberOfBars = this.settings.numberOfPreBars
      for (const section of this.sections) {
        totalNumberOfBars += section.numberOfBars
      }
      const cueDuration = Math.ceil((60 / this.settings.bpm) * this.settings.beatsPerBar * totalNumberOfBars)

      const buffer = await Tone.Offline(
        async ({ transport }) => {
          const osc = new Tone.Oscillator(this.settings.oscFrequency, this.oscTypes[0]).toDestination()
          const firstOsc = new Tone.Oscillator(this.settings.firstOscFrequency, this.oscTypes[0]).toDestination()
          const offlineDestination = Tone.getDestination()
          const player = {}
          for (var i = 0; i < this.sections.length; i++) {
            player[this.sections[i].type] = new Tone.Player().connect(offlineDestination)
            await player[this.sections[i].type].load(require('./assets/cues/' + this.sections[i].type + '.wav'))
          }
          for (i = 2; i <= this.settings.beatsPerBar; i++) {
            player[i.toString()] = new Tone.Player().connect(offlineDestination)
            await player[i.toString()].load(require('./assets/cues/' + i.toString() + '.wav'))
          }

          transport.bpm.value = this.settings.bpm

          var countBeats = 0
          var cueCounting = false
          transport.scheduleRepeat((time) => {
            if (++countBeats > totalNumberOfBars * this.settings.beatsPerBar) {
              transport.stop()
            } else {
              if (countBeats % this.settings.beatsPerBar === 1) {
                cueCounting = false
                firstOsc.start(time).stop(time + 0.05)
                var recalcedCountBeats = countBeats - ((this.settings.numberOfPreBars - 1) * this.settings.beatsPerBar)
                if(recalcedCountBeats >= 0){
                  const getSection = this.getSection(recalcedCountBeats)
                if (getSection.isFirstBeatOfSection) {
                  player[getSection.section.type].start(time)
                  cueCounting = true
                }
                }
                
              } else {
                osc.start(time).stop(time + 0.05)
                if (cueCounting) {
                  player[(((countBeats - 1) % this.settings.beatsPerBar) + 1).toString()].start(time)
                }
              }
            }
          }, '4n')
          if (this.settings.doubleTime) {
            transport.scheduleRepeat(
              (time) => {
                osc.start(time).stop(time + 0.05)
              },
              '4n',
              '8n',
            )
          }

          transport.start()
        },
        cueDuration,
        1,
      )
      if (this.settings.fileFormat === 'wav') {
        this.cueTrack = URL.createObjectURL(new Blob([this.bufferToWave(buffer.get())], { type: 'audio/wav' }))
      } else if (this.settings.fileFormat === 'mp3') {
        this.cueTrack = URL.createObjectURL(new Blob(this.wave2mp3(this.bufferToWave(buffer.get())), { type: 'audio/mp3' }))
      }
      this.isLoading = false
      clearInterval(this.progressIntervall)
    },
    // Source: https://www.russellgood.com/how-to-convert-audiobuffer-to-audio-file/
    /**Convert an AudioBuffer to a Blob using WAVE representation
     *
     * @param {AudioBuffer} abuffer
     */
    bufferToWave(abuffer) {
      var numOfChan = abuffer.numberOfChannels,
        length = abuffer.length * numOfChan * 2 + 44,
        buffer = new ArrayBuffer(length),
        view = new DataView(buffer),
        channels = [],
        i,
        sample,
        offset = 0,
        pos = 0

      // write WAVE header
      setUint32(0x46464952) // "RIFF"
      setUint32(length - 8) // file length - 8
      setUint32(0x45564157) // "WAVE"

      setUint32(0x20746d66) // "fmt " chunk
      setUint32(16) // length = 16
      setUint16(1) // PCM (uncompressed)
      setUint16(numOfChan)
      setUint32(abuffer.sampleRate)
      setUint32(abuffer.sampleRate * 2 * numOfChan) // avg. bytes/sec
      setUint16(numOfChan * 2) // block-align
      setUint16(16) // 16-bit (hardcoded in this demo)

      setUint32(0x61746164) // "data" - chunk
      setUint32(length - pos - 4) // chunk length

      // write interleaved data
      for (i = 0; i < abuffer.numberOfChannels; i++) channels.push(abuffer.getChannelData(i))

      while (pos < length) {
        for (i = 0; i < numOfChan; i++) {
          // interleave channels
          sample = Math.max(-1, Math.min(1, channels[i][offset])) // clamp
          sample = (0.5 + sample < 0 ? sample * 32768 : sample * 32767) | 0 // scale to 16-bit signed int
          view.setInt16(pos, sample, true) // write 16-bit sample
          pos += 2
        }
        offset++ // next source sample
      }

      // create Blob
      return buffer

      function setUint16(data) {
        view.setUint16(pos, data, true)
        pos += 2
      }

      function setUint32(data) {
        view.setUint32(pos, data, true)
        pos += 4
      }
    },
    wave2mp3(waveBuffer) {
      const kbps = 128 //encode 128kbps mp3
      const sampleBlockSize = 1152 //can be anything but make it a multiple of 576 to make encoders life easier
      const waveHeader = lamejs.WavHeader.readHeader(new DataView(waveBuffer))
      const samples = new Int16Array(waveBuffer, waveHeader.dataOffset, waveHeader.dataLen / 2)
      const mp3encoder = new lamejs.Mp3Encoder(waveHeader.channels, waveHeader.sampleRate, kbps)
      var mp3Data = []

      for (var i = 0; i < samples.length; i += sampleBlockSize) {
        var sampleChunk = samples.subarray(i, i + sampleBlockSize)
        var mp3buf = mp3encoder.encodeBuffer(sampleChunk)
        if (mp3buf.length > 0) {
          mp3Data.push(mp3buf)
        }
      }
      mp3buf = mp3encoder.flush() //finish writing mp3

      if (mp3buf.length > 0) {
        mp3Data.push(new Int8Array(mp3buf))
      }
      return mp3Data
    },
  },
  beforeMount() {
    this.urlToCue()
  },
}
</script>

<style>
</style>

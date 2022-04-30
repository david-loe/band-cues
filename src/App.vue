<template>
  <div class="container">
    <h1>Band Cues🎧</h1>

    <div class="row mb-5">
      <div class="col-auto">
        <label for="bpm" class="form-label">BPM <i class="bi bi-speedometer"></i>
</label>
        <input type="number" class="form-control" id="bpm" min="1" v-model="bpm" />
        <div class="form-check form-switch">
          <input class="form-check-input" type="checkbox" id="doubleTime" v-model="doubleTime" />
          <label class="form-check-label" for="doubleTime">Double Time Click</label>
        </div>
      </div>

      <div class="col-auto">
        <label for="beatsPerBar" class="form-label">Beats per Bar</label>
        <input type="number" class="form-control" id="beatsPerBar" min="2" max="8" v-model="beatsPerBar" />
      </div>
      <div class="col-auto">
        <label for="firstOscFrequency" class="form-label">First Click Tone [hz]</label>
        <input type="number" class="form-control" id="firstOscFrequency" min="20" max="20000" v-model="firstOscFrequency" />
      </div>
      <div class="col-auto">
        <label for="oscFrequency" class="form-label">Click Tone [hz]</label>
        <input type="number" class="form-control" id="oscFrequency" min="20" max="20000" v-model="oscFrequency" />
      </div>
      <div class="col-auto">
        <label for="fileFormat" class="form-label">File Format</label>
        <select class="form-select" v-model="fileFormat" :id="fileFormat">
          <option v-for="format in fileFormats" :key="format">{{ format }}</option>
        </select>
      </div>
      <small v-if="fileFormat === 'mp3'">ℹ Converting to MP3 takes signifigantly longer than WAV</small>
      <small v-if="beatsPerBar === 6">ℹ Consider Double Time Click and 3 Beats per Bar</small>
    </div>
    <div class="mb-4 row">
      <ul class="col-auto list-group mb-2">
        <li class="list-group-item" v-for="(section, index) in sections" :key="index">
          <div class="row align-items-end">
            <div class="col-auto">
              <label :for="index + 'section'" class="form-label">Section</label>
              <select class="form-select" v-model="section.type" :id="index + 'section'">
                <option v-for="type in cueTypes" :key="type">{{ type }}</option>
              </select>
            </div>
            <div class="col-auto" style="max-width: 100px">
              <label :for="index + 'numberOFBars'" class="form-label">Bars</label>
              <input type="number" class="form-control" min="1" :id="index + 'numberOFBars'" v-model="section.numberOfBars" />
            </div>
            <div class="col-auto">
              <button type="button" class="btn btn-secondary d-none d-sm-block" v-on:click="duplicateSection(section)">
                <i class="bi bi-clipboard-plus"></i>
                Duplicate
                </button>
              <button type="button" class="btn btn-secondary d-sm-none" v-on:click="duplicateSection(section)">
                <i class="bi bi-clipboard-plus"></i>
                </button>
                <div>
                <button type="button" class="btn btn-danger d-sm-none" v-on:click="deleteSection(section)"><i class="bi bi-trash"></i></button>

                </div>
            </div>
            <div class="col-auto">
              <button type="button" class="btn btn-danger d-none d-sm-block" v-on:click="deleteSection(section)">
                <i class="bi bi-trash"></i>
                Delete
              </button>
              
            </div>
          </div>
        </li>
      </ul>
      <div v-if="sections.length === 0" class="alert alert-secondary mb-2" role="alert">No Section defined.</div>
      <div class="mb-2">
        <button type="button" class="btn btn-outline-secondary" v-on:click="addSection()">
          <i class="bi bi-plus-lg"></i>
          Add Section
          </button>
      </div>
    </div>
    <div class="mb-3">
      <button type="button" class="btn btn-primary" v-on:click="generate()" :disabled="isLoading || !inputCorrect()">
        <i class="bi bi-play-circle"></i>
        Generate</button>
    </div>
    <div v-if="isLoading">
      <div class="spinner-border text-primary">
        <span class="visually-hidden">Loading...</span>
      </div>
      <small class="text-primary">This migth take up to a minute..</small>
    </div>
    <div v-if="cueTrack !== '' && !isLoading">
      <audio controls :src="cueTrack"></audio>
      <br />
      <small> Cues🎧 from <a href="https://worshiptutorials.com/product/clicks-and-cues/">WorshipTutorials</a> </small>
    </div>
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
      fileFormat: 'wav',
      oscFrequency: 440,
      firstOscFrequency: 600,
      bpm: 120,
      beatsPerBar: 4,
      numberOfBars: 10,
      cueDuration: 5,
      cueTrack: '',
      isLoading: false,
      sections: [{ type: 'Intro', numberOfBars: 4 }],
      doubleTime: false,
    }
  },
  methods: {
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
        countBeats += this.beatsPerBar * this.sections[i].numberOfBars
        if (beat <= countBeats) {
          return { section: this.sections[i], isFirstBeatOfSection: isFirstBeatOfSection }
        }
      }
      return { section: null, isFirstBeatOfSection: false }
    },
    inputCorrect() {
      return this.beatsPerBar <= 8 && this.beatsPerBar >= 2 && this.sections.length > 0
    },
    async generate() {
      if (!this.inputCorrect()) return ''
      this.isLoading = true
      var totalNumberOfBars = 0
      for (const section of this.sections) {
        totalNumberOfBars += section.numberOfBars
      }
      this.cueDuration = Math.ceil((60 / this.bpm) * this.beatsPerBar * totalNumberOfBars)

      const buffer = await Tone.Offline(
        async ({ transport }) => {
          const osc = new Tone.Oscillator(this.oscFrequency, this.oscTypes[0]).toDestination()
          const firstOsc = new Tone.Oscillator(this.firstOscFrequency, this.oscTypes[0]).toDestination()
          const offlineDestination = Tone.getDestination()
          const player = {}
          for (var i = 0; i < this.sections.length; i++) {
            player[this.sections[i].type] = new Tone.Player().connect(offlineDestination)
            await player[this.sections[i].type].load(require('./assets/cues/' + this.sections[i].type + '.wav'))
          }
          for (i = 2; i <= this.beatsPerBar; i++) {
            player[i.toString()] = new Tone.Player().connect(offlineDestination)
            await player[i.toString()].load(require('./assets/cues/' + i.toString() + '.wav'))
          }

          transport.bpm.value = this.bpm

          var countBeats = 0
          var cueCounting = false
          transport.scheduleRepeat((time) => {
            if (++countBeats > totalNumberOfBars * this.beatsPerBar) {
              transport.stop()
            } else {
              if (countBeats % this.beatsPerBar === 1) {
                cueCounting = false
                firstOsc.start(time).stop(time + 0.05)
                const getSection = this.getSection(countBeats)
                if (getSection.isFirstBeatOfSection) {
                  player[getSection.section.type].start(time)
                  cueCounting = true
                }
              } else {
                osc.start(time).stop(time + 0.05)
                if (cueCounting) {
                  player[(((countBeats - 1) % this.beatsPerBar) + 1).toString()].start(time)
                }
              }
            }
          }, '4n')
          if (this.doubleTime) {
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
        this.cueDuration,
        1,
      )
      if (this.fileFormat === 'wav') {
        this.cueTrack = URL.createObjectURL(new Blob([this.bufferToWave(buffer.get())], { type: 'audio/wav' }))
      } else if (this.fileFormat === 'mp3') {
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
}
</script>

<style>
</style>

<template>
  <div class="container">
    <h1>Band Cues🎧</h1>

    <div class="row mb-3">
      <div class="col-auto">
        <label for="bpm" class="form-label">BPM</label>
        <input type="number" class="form-control" id="bpm" v-model="bpm" />
      </div>
      <div class="col-auto">
        <label for="beatsPerBar" class="form-label">Beats per Bar</label>
        <input type="number" class="form-control" id="beatsPerBar" v-model="beatsPerBar" />
      </div>
      <div class="col-auto">
        <label for="numberOFBars" class="form-label">Number of Bars</label>
        <input type="number" class="form-control" id="numberOFBars" v-model="numberOfBars" />
      </div>
    </div>
    <div class="mb-3">
      <button type="button" class="btn btn-primary" v-on:click="generate()">Generate</button>
    </div>
    <audio controls :src="cueTrack"></audio>
  </div>
</template>

<script>
import * as Tone from 'tone'
export default {
  name: 'App',
  components: {},
  data() {
    return {
      bpm: 120,
      beatsPerBar: 4,
      numberOfBars: 10,
      cueDuration: 5,
      cueTrack: '',
    }
  },
  methods: {
    async generate() {
      this.cueDuration = Math.ceil((60 / this.bpm) * this.beatsPerBar * this.numberOfBars)
      var countBeats = 0

      const buffer = await Tone.Offline(({ transport }) => {
        const osc = new Tone.Oscillator().toDestination()
        transport.bpm.value = this.bpm
        transport.scheduleRepeat((time) => {
          if (++countBeats > this.numberOfBars * this.beatsPerBar) {
            transport.stop()
          } else {
            osc.start(time).stop(time + 0.05)
          }
        }, '4n')
        transport.start()
      }, this.cueDuration)

      this.cueTrack = URL.createObjectURL(this.bufferToWave(buffer.get()))
      console.log(this.cueTrack)
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
      return new Blob([buffer], { type: 'audio/wav' })

      function setUint16(data) {
        view.setUint16(pos, data, true)
        pos += 2
      }

      function setUint32(data) {
        view.setUint32(pos, data, true)
        pos += 4
      }
    },
  },
}
</script>

<style>
</style>

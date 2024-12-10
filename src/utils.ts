import lamejs from 'lamejs'
// Source: https://www.russellgood.com/how-to-convert-audiobuffer-to-audio-file/
/**Convert an AudioBuffer to a Blob using WAVE representation
 *
 * @param {AudioBuffer} abuffer
 */
export function bufferToWave(abuffer: AudioBuffer) {
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

  function setUint16(data: number) {
    view.setUint16(pos, data, true)
    pos += 2
  }

  function setUint32(data: number) {
    view.setUint32(pos, data, true)
    pos += 4
  }
}

export function wave2mp3(waveBuffer: ArrayBuffer) {
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
}

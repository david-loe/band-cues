declare module 'lamejs' {
  export class Mp3Encoder {
    constructor(channels: number, samplerate: number, kbps: number)
    encodeBuffer(left: Int16Array, right?: Int16Array): Int8Array
    flush(): Int8Array
  }

  export class WavHeader {
    dataOffset: number
    dataLen: number
    channels: number
    sampleRate: number

    static readHeader(dataView: DataView): WavHeader | undefined
  }

  export function fourccToInt(fourcc: string): number
}

declare module 'really-relaxed-json' {
  export function toRJson(json: string): string
  export function toJson(rjson: string): string
}

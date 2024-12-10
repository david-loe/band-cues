export default {
  publicPath: process.env.NODE_ENV === 'production' ? '/band-cues/' : '/',
  devServer: {
    allowedHosts: 'all',
    client: {
      webSocketURL: 'auto://0.0.0.0:0/ws'
    }
  }
}

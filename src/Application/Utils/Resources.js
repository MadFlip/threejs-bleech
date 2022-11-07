import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import EventEmitter from "./EventEmitter"

export default class Resources extends EventEmitter {
  constructor (sources) {
    super()

    // Options
    this.sources = sources

    // Setup
    this.items = {}
    this.toLoad = this.sources.length
    this.loaded = 0

    this.setLoader()
    this.startLoading()
  }

  setLoader () {
    this.loaders = {}
    this.loaders.fontLoader = new FontLoader()
  }

  startLoading () {
    for (const source of this.sources) {
      if (source.type === 'font') {
        this.loaders.fontLoader.load(
          source.path,
          (font) => {
            this.sourceLoaded(source, font)
          },
          undefined,
          (error) => {
            console.error(error)
          }
        )
      }
    }
  }

  sourceLoaded (source, font) {
    this.items[source.name] = font
    this.loaded++

    if (this.loaded === this.toLoad) {
      this.trigger('ready')
    }
  }
}

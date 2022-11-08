import * as THREE from "three"
import Application from "./Application"

export default class Renderer {
  constructor() {
    this.application = new Application()
    this.canvas = this.application.canvas
    this.sizes = this.application.sizes
    this.scene = this.application.scene
    this.camera = this.application.camera

    if (this.isMobile()) {
      this.width = this.sizes.width - 20,
      this.height = this.sizes.height - 20
    } else {
      this.width = this.sizes.width - 40,
      this.height = this.sizes.height - 40
    }
    
    this.setInstance()
  }

  setInstance() {
    this.instance = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true
    })
    this.instance.outputEncoding = THREE.sRGBEncoding
    this.instance.shadowMap.enabled = true
    this.instance.shadowMap.type = THREE.PCFSoftShadowMap
    this.instance.setSize(this.width, this.height)
    this.instance.setPixelRatio(this.sizes.pixelRatio)
  }

  resize() {
    if (this.isMobile()) {
      this.width = this.sizes.width - 20,
      this.height = this.sizes.height - 20
    } else {
      this.width = this.sizes.width - 40,
      this.height = this.sizes.height - 40
    }

    this.instance.setSize(this.width, this.height)
    this.instance.setPixelRatio(this.sizes.pixelRatio)
  }

  update() {
    this.instance.render(this.scene, this.camera.instance)
  }

  isMobile () {
    return window.matchMedia('(max-width: 767px)').matches
  }
}

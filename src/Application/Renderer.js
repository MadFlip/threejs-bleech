import * as THREE from "three"
import Application from "./Application";

export default class Renderer {
  constructor() {
    this.application = new Application()
    this.canvas = this.application.canvas
    this.sizes = this.application.sizes
    this.scene = this.application.scene
    this.camera = this.application.camera
    
    this.setInstance()
  }

  setInstance() {
    this.instance = new THREE.WebGLRenderer({
      canvas: this.canvas,
      alpha: true,
      antialias: true
    })
    this.instance.outputEncoding = THREE.sRGBEncoding
    this.instance.shadowMap.enabled = true
    this.instance.shadowMap.type = THREE.PCFSoftShadowMap
    this.instance.setSize(this.sizes.width - 40, this.sizes.height - 40)
    this.instance.setPixelRatio(this.sizes.pixelRatio)
  }

  resize() {
    this.instance.setSize(this.sizes.width - 40, this.sizes.height - 40)
    this.instance.setPixelRatio(this.sizes.pixelRatio)
  }

  update() {
    this.instance.render(this.scene, this.camera.instance)
  }
}

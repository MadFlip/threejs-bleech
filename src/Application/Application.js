import * as THREE from "three"
// import CannonDebugger from 'cannon-es-debugger'
import Debug from "./Utils/Debug"
import Sizes from "./Utils/Sizes"
import Time from "./Utils/Time"
import Camera from "./Camera"
import Renderer from "./Renderer"
import Material from "./Material"
import World from "./World/World"
import Physics from "./World/Physics"
import Resources from "./Utils/Resources"
import Sound from "./World/Sound"
import sources from "./sources"

let instance = null

export default class Application {
  constructor (canvas) {

    if (instance) {
      return instance
    }

    instance = this

    // Global access
    window.Application = this
    this.canvas = canvas
    this.objectsToUpdate = []

    // Setup
    this.debug = new Debug()
    this.sizes = new Sizes()
    this.time = new Time()
    this.material = new Material()
    this.scene = new THREE.Scene()
    this.resources = new Resources(sources)
    this.physics = new Physics()
    this.camera = new Camera()
    this.renderer = new Renderer()
    this.sound = new Sound()
    this.world = new World()

    // Resize event
    this.sizes.on('resize', this.resize.bind(this))

    // Time tick event
    this.time.on('tick', this.update.bind(this))
    // this.cannonDebugger = new CannonDebugger(this.scene, this.physics.world)
  }

  resize () {
    this.camera.resize()
    this.renderer.resize()
  }

  update () {
    this.camera.update()
    this.world.update()
    this.physics.update()
    this.renderer.update()
    // this.cannonDebugger.update()
  }

  destroy () {
    this.sizes.off('resize')
    this.time.off('tick')

    // Traverse the whole scene
    this.scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.geometry.dispose()

        for (const key in child.material) {
          const value = child.material[key]

          if (value && typeof value.dispose === 'function') {
            value.dispose()
          }
        }
      }
    })

    this.camera.controls.dispose()
    this.renderer.instance.dispose()

    if (this.debug.active) {
      this.debug.gui.destroy()
    }
  }
}

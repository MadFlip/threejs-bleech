import * as THREE from "three"
import Application from "./Application"

export default class Material {
  constructor() {
    this.applications = new Application()
    this.debug = this.applications.debug

    // Pyramid material
    this.pyramid = new THREE.MeshLambertMaterial({
      color: new THREE.Color('#011c89'),
      emissive: new THREE.Color('#000724'),
      side: THREE.DoubleSide
    })

    if (this.debug.active) {
      this.debug.gui.addColor(this.pyramid, 'color').name('Pyramid Color')
      this.debug.gui.addColor(this.pyramid, 'emissive').name('Pyramid Emissive')
    }

    // Sphere material
    this.sphere = new THREE.MeshLambertMaterial({
      color: new THREE.Color('#00ffd5'),
      emissive: new THREE.Color('#002e26')
    })

    if (this.debug.active) {
      this.debug.gui.addColor(this.sphere, 'color').name('Sphere Color')
      this.debug.gui.addColor(this.sphere, 'emissive').name('Sphere Emissive')
    }

    // Cube material
    this.cube = new THREE.MeshLambertMaterial({
      color: new THREE.Color("#ffffff"),
      emissive: new THREE.Color('#353a4b')
    })

    if (this.debug.active) {
      this.debug.gui.addColor(this.cube, 'color').name('Cube Color')
      this.debug.gui.addColor(this.cube, 'emissive').name('Cube Emissive')
    }

    // Cannonball material
    this.cannonball = new THREE.MeshLambertMaterial({
      color: new THREE.Color('#ff2e93'),
      emissive: new THREE.Color('#393a03')
    })

    if (this.debug.active) {
      this.debug.gui.addColor(this.cannonball, 'color').name('Cannonball Color')
      this.debug.gui.addColor(this.cannonball, 'emissive').name('Cannonball Emissive')
    }

    // Floor material
    this.floor = this.material = new THREE.MeshLambertMaterial({
      color: new THREE.Color('#001c5c'),
      emissive: new THREE.Color('#163b98')
    })

    if (this.debug.active) {
      this.debug.gui.addColor(this.floor, 'color').name('Floor Color')
      this.debug.gui.addColor(this.floor, 'emissive').name('Floor Emissive')
    }

    // Text material
    this.text = new THREE.MeshLambertMaterial({
      color: new THREE.Color('#0021a3'),
      emissive: new THREE.Color('#02104b'),
      side: THREE.DoubleSide
    })

    if (this.debug.active) {
      this.debug.gui.addColor(this.text, 'color').name('Text Color')
      this.debug.gui.addColor(this.text, 'emissive').name('Text Emissive')
    }
  }
}

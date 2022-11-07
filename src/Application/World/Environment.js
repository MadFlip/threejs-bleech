import * as THREE from "three"
import Application from "../Application"

export default class Environment {
  constructor() {
    this.application = new Application()
    this.scene = this.application.scene
    this.debug = this.application.debug

    // if (this.debug) {
    //   this.debugFolder = this.debug.gui.addFolder('Environment')
    // }
    
    this.setFog()
    this.setAmbientLight()
    this.setSunLight()
  }

  setAmbientLight() {
    this.ambientLight = new THREE.AmbientLight(0xffffff, 0.7)
    this.scene.add(this.ambientLight)
  }

  setSunLight() {
    this.directionalLight = new THREE.DirectionalLight('#ffffff', 0.2)
    this.directionalLight.castShadow = true
    this.directionalLight.shadow.mapSize.set(1024, 1024)
    this.directionalLight.shadow.camera.far = 15
    this.directionalLight.shadow.camera.left = - 7
    this.directionalLight.shadow.camera.right = 7
    this.directionalLight.shadow.camera.top = 7
    this.directionalLight.shadow.camera.bottom = - 7
    this.directionalLight.shadow.normalBias = 0.05
    this.directionalLight.position.set(5, 5, 5)
    this.scene.add(this.directionalLight)

    // Debug
    // if (this.debug) {
    //   this.debugFolder.add(this.directionalLight, 'intensity').min(0).max(10).step(0.001).name('Light Intensity')
    //   this.debugFolder.add(this.directionalLight.position, 'x').min(- 5).max(5).step(0.001).name('Light X')
    //   this.debugFolder.add(this.directionalLight.position, 'y').min(- 5).max(5).step(0.001).name('Light Y')
    //   this.debugFolder.add(this.directionalLight.position, 'z').min(- 5).max(5).step(0.001).name('Light Z')
    // }
  }

  setFog() {
    this.scene.fog = new THREE.Fog('#4792ff', 0.5, 14)
  }
}

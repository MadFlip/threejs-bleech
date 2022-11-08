import * as THREE from "three"
import Application from "../Application"

export default class Environment {
  constructor() {
    this.application = new Application()
    this.scene = this.application.scene
    
    this.setBackgroundColor('#4f97f6')
    this.setFog('#4f97f6')
    this.setAmbientLight('0xffffff')
    this.setSunLight('0xffffff')
  }

  setAmbientLight(color) {
    this.ambientLight = new THREE.AmbientLight(color, 0.7)
    this.scene.add(this.ambientLight)
  }

  setSunLight(color) {
    this.directionalLight = new THREE.DirectionalLight(color, 0.2)
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
  }

  setFog(color) {
    this.scene.fog = new THREE.Fog(color, 0.5, 14)
  }

  setBackgroundColor(color) {
    this.scene.background = new THREE.Color(color)
  }
}

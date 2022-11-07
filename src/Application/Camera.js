import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import Application from "./Application";

export default class Camera {
  constructor () {
    this.application = new Application()
    this.sizes = this.application.sizes
    this.scene = this.application.scene
    this.canvas = this.application.canvas

    this.setInstance()
    this.setOrbitControls()
  }

  setInstance () {
    this.instance = new THREE.PerspectiveCamera(55, this.sizes.width / this.sizes.height, 0.1, 100)
    this.instance.position.set(2, 1, 4)
    this.instance.lookAt(new THREE.Vector3(0, 0, 0))
    this.scene.add(this.instance)
  }

  setOrbitControls () {
    this.controls = new OrbitControls(this.instance, this.canvas)
    this.controls.enableDamping = true
    this.controls.enablePan = false

    // limits the camera to not go below the floor
    this.controls.maxPolarAngle = Math.PI / 2 - 0.2
    // limit zoom
    this.controls.minDistance = 3
    this.controls.maxDistance = 8

    this.controls.autoRotate = false
    this.controls.autoRotateSpeed = 2

    // make auto rotate half circle
    this.controls.minAzimuthAngle = -Math.PI / 2 + 0.2
    this.controls.maxAzimuthAngle = Math.PI / 2 - 0.2
  }

  resize () {
    this.instance.aspect = this.sizes.width / this.sizes.height
    this.instance.updateProjectionMatrix()
  }

  update () {
    this.controls.update()

    if (this.controls.getAzimuthalAngle() === -Math.PI / 2 + 0.2) {
      this.controls.autoRotateSpeed *= -1
    } else if (this.controls.getAzimuthalAngle() === Math.PI / 2 - 0.2) {
      this.controls.autoRotateSpeed = 2
    }
  }
}

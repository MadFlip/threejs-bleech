import * as THREE from "three"
import * as CANNON from 'cannon-es'
import Application from "../Application"
import Sphere from "./Sphere"

export default class Gun {
  constructor() {
    this.application = new Application()
    this.physics = this.application.physics
    this.scene = this.application.scene
    this.sound = this.application.sound
    this.objectsToUpdate = this.application.objectsToUpdate

    this.setRaycaster()
  }

  setRaycaster() {
    // watch raycaster mouse as target
    this.raycaster = new THREE.Raycaster()
    this.mouse = new THREE.Vector2()
    this.mouse.x = 0
    this.mouse.y = 0
    this.raycaster.setFromCamera(this.mouse, this.application.camera.instance)
    // change cursor to dot
    document.body.style.cursor = 'crosshair'
  }

  creatCannonBall() {
    const {x, y, z} = this.application.camera.instance.position
    this.cannonball = new Sphere(
      .1,
      {
        x: x,
        y: y - 0.3,
        z: z
      },
      this.application.material.cannonball
    )
  }

  shoot(e) {
    this.mouse.x = (e.clientX / window.innerWidth) * 2 - 1
    this.mouse.y = -(e.clientY / window.innerHeight) * 2 + 1
    this.raycaster.setFromCamera(this.mouse, this.application.camera.instance)
    const intersects = this.raycaster.intersectObjects(this.scene.children)

    if (intersects.length > 0) {
      this.creatCannonBall()
      const direction = new CANNON.Vec3()
      direction.copy(intersects[0].point)
      direction.vsub(this.cannonball.body.position, direction)
      direction.normalize()
      direction.scale(5, direction)
      this.cannonball.body.applyImpulse(direction, this.cannonball.body.position)
      this.sound.playBoomSound()
    }
  }
}

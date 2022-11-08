import * as THREE from "three"
import * as CANNON from 'cannon-es'
import Application from "../Application"

export default class Cube {
  constructor(width, height, depth, position) {
    this.application = new Application()
    this.physics = this.application.physics
    this.scene = this.application.scene
    this.sound = this.application.sound
    this.objectsToUpdate = this.application.objectsToUpdate

    const randomSize = Math.random() + 0.1
    this.defaultSettings = [
      randomSize,
      randomSize,
      randomSize,
      {
        x: (Math.random() - 0.5) * 3,
        y: 3,
        z: (Math.random() - 0.5) * 3
      }
    ]

    this.material = this.application.material.cube
    this.setGeometry()
    this.createCube(width, height, depth, position)
  }

  setGeometry() {
    this.geometry = new THREE.BoxGeometry(1, 1, 1)
  }

  setMesh(width, height, depth, position) {
    this.mesh = new THREE.Mesh(this.geometry, this.material)
    this.mesh.scale.set(width, height, depth)
    this.mesh.castShadow = true
    this.mesh.position.copy(position)
    this.scene.add(this.mesh)
  }

  setPhysicBody(width, height, depth, position) {
    this.shape = new CANNON.Box(new CANNON.Vec3(width / 2, height / 2, depth / 2))
    this.body = new CANNON.Body({
      mass: 1,
      shape: this.shape,
      position: new CANNON.Vec3(0, 0, 0),
      material: this.physics.defaultMaterial
    })
    this.body.position.copy(position)
    this.physics.world.addBody(this.body)
    this.body.addEventListener('collide', (e) => {
      this.sound.playHitSound(e)
    })
  }

  createCube(width = this.defaultSettings[0], height = this.defaultSettings[1], depth = this.defaultSettings[2], position = this.defaultSettings[3]) {
    this.setMesh(width, height, depth, position)
    this.setPhysicBody(width, height, depth, position)
    const mesh = this.mesh,
          body = this.body
    this.objectsToUpdate.push({mesh, body})
  }
}

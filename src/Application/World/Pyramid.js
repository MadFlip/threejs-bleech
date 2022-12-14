import * as THREE from "three"
import * as CANNON from 'cannon-es'
import Application from "../Application"

export default class Pyramid {
  constructor(radius, position) {
    this.application = new Application()
    this.physics = this.application.physics
    this.scene = this.application.scene
    this.objectsToUpdate = this.application.objectsToUpdate
    this.sound = this.application.sound
    this.segments = 3
    this.defaultSettings = [
      Math.random() / 2 + 0.2,
      {
        x: (Math.random() - 0.5) * 3,
        y: 3,
        z: (Math.random() - 0.5) * 3
      }
    ]

    this.material = this.application.material.pyramid
    this.setGeometry()
    this.createPyramid(radius, position)
  }

  setGeometry() {
    this.geometry = new THREE.CylinderGeometry(0.005, 1, 1, this.segments)
  }

  setMesh(radius, position) {
    this.mesh = new THREE.Mesh(this.geometry, this.material)
    this.mesh.scale.set(radius, radius, radius)
    this.mesh.castShadow = true
    this.mesh.position.copy(position)
    this.scene.add(this.mesh)
  }

  setPhysicBody(radius, position) {
    this.shape = new CANNON.Cylinder(0.005, radius, radius, this.segments)
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

  createPyramid(radius = this.defaultSettings[0], position = this.defaultSettings[1]) {
    this.setMesh(radius, position)
    this.setPhysicBody(radius, position)
    const mesh = this.mesh,
          body = this.body
    this.objectsToUpdate.push({mesh, body})
  }
}

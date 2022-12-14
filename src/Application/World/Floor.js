import * as THREE from "three"
import * as CANNON from 'cannon-es'
import Application from "../Application"

export default class Floor {
  constructor() {
    this.application = new Application()
    this.scene = this.application.scene
    this.physics = this.application.physics

    this.material = this.application.material.floor
    this.setGeometry()
    this.createFloor()
  }

  setGeometry() {
    this.geometry = new THREE.PlaneGeometry(15, 15)
  }

  setMesh() {
    this.mesh = new THREE.Mesh(this.geometry, this.material)
    this.mesh.rotation.x = - Math.PI * 0.5
    this.mesh.receiveShadow = true
    this.scene.add(this.mesh)
  }

  setPhysicBody() {
    this.shape = new CANNON.Plane()
    this.body = new CANNON.Body()
    this.body.mass = 0
    this.body.addShape(this.shape)
    // Rotate plane in cannon.js uses quaternion
    this.body.quaternion.setFromAxisAngle(new CANNON.Vec3(-1, 0, 0), Math.PI * 0.5)
    this.physics.world.addBody(this.body)
  }

  createFloor() {
    this.setMesh()
    this.setPhysicBody()
  }
}

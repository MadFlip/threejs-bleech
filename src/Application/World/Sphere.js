import * as THREE from "three"
import * as CANNON from 'cannon-es'
import Application from "../Application"

export default class Sphere {
  constructor(radius, position) {
    this.application = new Application()
    this.physics = this.application.physics
    this.scene = this.application.scene
    this.objectsToUpdate = this.application.objectsToUpdate

    this.setGeometry()
    this.setMaterial()
    this.createSphere(radius, position)
  }

  setGeometry() {
    this.geometry = new THREE.SphereGeometry(1, 20, 20)
  }

  setMaterial() {
    this.material = new THREE.MeshLambertMaterial({
      color: new THREE.Color('#2effdc'),
      emissive: new THREE.Color('#04342c')
    })
  }

  setMesh(radius, position) {
    this.mesh = new THREE.Mesh(this.geometry, this.material)
    this.mesh.scale.set(radius, radius, radius)
    this.mesh.castShadow = true
    this.mesh.position.copy(position)
    this.scene.add(this.mesh)
  }

  setPhysicBody(radius, position) {
    this.shape = new CANNON.Sphere(radius)
    this.body = new CANNON.Body({
      mass: 1,
      shape: this.shape,
      position: new CANNON.Vec3(0, 0, 0),
      material: this.physics.defaultMaterial
    })
    this.body.position.copy(position)
    this.physics.world.addBody(this.body)
  }

  createSphere(radius, position) {
    this.setMesh(radius, position)
    this.setPhysicBody(radius, position)
    const mesh = this.mesh,
          body = this.body
    this.objectsToUpdate.push({mesh, body})
  }
}

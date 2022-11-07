import * as THREE from "three"
import * as CANNON from 'cannon-es'
import Application from "../Application"

export default class Cube {
  constructor(width, height, depth, position) {
    this.application = new Application()
    this.physics = this.application.physics
    this.scene = this.application.scene
    this.objectsToUpdate = this.application.objectsToUpdate

    this.setGeometry()
    this.setMaterial()
    this.createCube(width, height, depth, position)
  }

  setGeometry() {
    this.geometry = new THREE.BoxGeometry(1, 1, 1)
  }

  setMaterial() {
    this.material = new THREE.MeshLambertMaterial({
      color: new THREE.Color("#ffffff"),
      emissive: new THREE.Color('#353a4b')
    })
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
  }

  createCube(width, height, depth, position) {
    this.setMesh(width, height, depth, position)
    this.setPhysicBody(width, height, depth, position)
    const mesh = this.mesh,
          body = this.body
    this.objectsToUpdate.push({mesh, body})
  }
}

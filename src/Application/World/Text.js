import * as THREE from "three"
import * as CANNON from 'cannon-es'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'
import Application from "../Application"

export default class Text {
  constructor() {
    this.application = new Application()
    this.physics = this.application.physics
    this.scene = this.application.scene
    this.resources = this.application.resources
    this.textString = 'Bleech'
    this.letterObjects = []

    this.textOptions = (font, letter) => {
        return {
            name: letter,
            font: font,
            size: 0.5,
            height: 0.2,
            curveSegments: 16,
            bevelEnabled: true,
            bevelThickness: 0.03,
            bevelSize: 0.02,
            bevelOffset: 0,
            bevelSegments: 8,
        }
    }
   
    this.objectsToUpdate = this.application.objectsToUpdate

    // Wait for resources to load
    this.resources.on('ready', () => {
      this.createText()
    })
  }

  setGeometry(letter) {
    this.geometry = new TextGeometry(letter, this.textOptions(this.resources.items.titilliumFont, letter))
    this.geometry.center()
  }

  setMaterial() {
    this.material = new THREE.MeshLambertMaterial({
      color: new THREE.Color('#0856af'),
      emissive: new THREE.Color('#12205e'),
      side: THREE.DoubleSide
    })
  }

  setMesh() {
    this.mesh = new THREE.Mesh(this.geometry, this.material)
    this.mesh.castShadow = true
    this.scene.add(this.mesh)
  }

  setPhysicBody() {
    this.box = new THREE.Box3().setFromObject(this.mesh)
    const {x: width, y: height, z: depth} = this.box.getSize(new THREE.Vector3())
    const {x: x, y: y, z: z} = this.box.getCenter(new THREE.Vector3())

    this.shape = new CANNON.Box(new CANNON.Vec3(width / 2, height / 2, depth / 2))
    this.body = new CANNON.Body({
      mass: 1,
      shape: this.shape,
      position: new CANNON.Vec3(x, y, z),
      material: this.physics.defaultMaterial
    })
   
    this.body.position.copy(this.mesh.position)
    this.physics.world.addBody(this.body)
  }

  createText() {
    this.setMaterial()
    let x = 0
    let measure = new THREE.Vector3()
    let prevWidth = 0
    let prevX = 0

    for (let i = 0; i < this.textString.length; i++) {
      this.setGeometry(this.textString[i])
      this.setMesh()

      x = this.mesh.geometry.boundingBox.max.x + prevWidth + prevX + 0.05
      this.mesh.position.x = x
      this.mesh.position.y = 0.5
      this.mesh.geometry.computeBoundingBox()
      prevX = this.mesh.position.x
      prevWidth = this.mesh.geometry.boundingBox.max.x
      this.setPhysicBody()
      const mesh = this.mesh,
            body = this.body
      this.objectsToUpdate.push({mesh, body})
    }
  }
}

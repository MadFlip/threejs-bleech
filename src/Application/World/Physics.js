import * as CANNON from 'cannon-es'
import Application from "../Application"

export default class Physics {
  constructor() {
    this.application = new Application()
    this.deltaTime = this.application.time.delta

    this.setPhysicsWorld()
    this.setPhyscicsMaterial()
  }

  setPhysicsWorld() {
    this.world = new CANNON.World()
    this.world.gravity.set(0, -9.82, 0)
    this.world.broadphase = new CANNON.SAPBroadphase(this.world)
    this.world.allowSleep = true
  }

  setPhyscicsMaterial() {
    this.defaultMaterial = new CANNON.Material('default')
    this.defaultContactMaterial = new CANNON.ContactMaterial(
      this.defaultMaterial,
      this.defaultMaterial,
      {
        friction: 0.1,
        restitution: 0.7
      }
    )
    this.world.addContactMaterial(this.defaultContactMaterial)
    this.world.defaultContactMaterial = this.defaultContactMaterial
  }


  update() {
    this.world.step(1 / 60, this.deltaTime, 3)
  }
}

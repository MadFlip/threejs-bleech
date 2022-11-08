import Application from "../Application"
import Environment from "./Environment"
import Cube from "./Cube"
import Sphere from "./Sphere"
import Pyramid from './Pyramid'
import Floor from "./Floor"
import Text from './Text'
import Gun from "./Gun"

export default class World {
  constructor() {
    this.application = new Application()
    this.environment = new Environment()
    this.scene = this.application.scene
    this.world = this.application.physics.world
    this.objectsToUpdate = this.application.objectsToUpdate
    this.resources = this.application.resources
    this.sound = this.application.sound
    this.floor = new Floor()
    this.text = new Text()
    this.gun = new Gun()

    // DOM elements
    this.buttonAddSphere = document.querySelector('[data-add-spere]')
    this.buttonAddBox = document.querySelector('[data-add-box]')
    this.buttonAddPyramid = document.querySelector('[data-add-pyramid]')
    this.buttonReset = document.querySelector('[data-clear-scene]')
    this.buttonSound = document.querySelector('[data-toggle-sound]')

    this.buttonAddSphere.addEventListener('click', (e) => {
      e.stopPropagation()
      this.sphere = new Sphere()
    })

    this.buttonAddBox.addEventListener('click', (e) => {
      e.stopPropagation()
      this.cube = new Cube()
    })

    this.buttonAddPyramid.addEventListener('click', (e) => {
      e.stopPropagation()
      this.pyramid = new Pyramid()
    })

    this.buttonReset.addEventListener('click', (e) => {
      e.stopPropagation()
      this.clearScene()
    })

    document.addEventListener('click', (e) => {
      this.gun.shoot(e)
    })

    this.buttonSound.addEventListener('click', (e) => {
      e.stopPropagation()
      if (e.currentTarget.dataset.toggleSound === 'on') {
        e.currentTarget.dataset.toggleSound = 'off'
        this.sound.muteBackground()
      } else {
        e.currentTarget.dataset.toggleSound = 'on'
        this.sound.unmuteBackground()
      }
    })
  }

  update() {
    for (const item of this.objectsToUpdate) {
      item.mesh.position.copy(item.body.position)
      item.mesh.quaternion.copy(item.body.quaternion)
    }
  }

  clearScene() {
    for (const obj of this.objectsToUpdate) {
      obj.body.removeEventListener('collide', (e) => {
        this.sound.playHitSound(e)
      })
      this.world.removeBody(obj.body)
      this.scene.remove(obj.mesh)
    }
    this.text.createText()
  }
}

import * as THREE from "three"
import * as CANNON from 'cannon-es'
import Application from "../Application"
import Environment from "./Environment"
import Cube from "./Cube"
import Sphere from "./Sphere"
import Pyramid from './Pyramid'
import Floor from "./Floor"
import Text from './Text'

export default class World {
  constructor() {
    this.application = new Application()
    this.environment = new Environment()
    this.scene = this.application.scene
    this.world = this.application.physics.world
    this.objectsToUpdate = this.application.objectsToUpdate
    this.floor = new Floor()
    this.text = new Text()

    const buttonAddSphere = document.querySelector('[data-add-spere]')
    const buttonAddBox = document.querySelector('[data-add-box]')
    const buttonAddPyramid = document.querySelector('[data-add-pyramid]')
    const buttonReset = document.querySelector('[data-clear-scene]')

    buttonAddSphere.addEventListener('click', (e) => {
      e.stopPropagation()
      this.sphere = new Sphere(
        Math.random() / 2 + 0.2, 
        {
          x: (Math.random() - 0.5) * 3,
          y: 3,
          z: (Math.random() - 0.5) * 3
        }
      )
    })

    buttonAddBox.addEventListener('click', (e) => {
      e.stopPropagation()
      const randomSize = Math.random() + 0.1
      this.cube = new Cube(
        randomSize,
        randomSize,
        randomSize,
        {
          x: (Math.random() - 0.5) * 3,
          y: 3,
          z: (Math.random() - 0.5) * 3
        }
      )
    })

    buttonAddPyramid.addEventListener('click', (e) => {
      e.stopPropagation()
      this.pyramid = new Pyramid(
        Math.random() / 2 + 0.2,
        {
          x: (Math.random() - 0.5) * 3,
          y: 3,
          z: (Math.random() - 0.5) * 3
        }
      )
    })

    buttonReset.addEventListener('click', (e) => {
      e.stopPropagation()
      this.clearScene()
    })

    // watch raycaster mouse as target
    this.raycaster = new THREE.Raycaster()
    this.mouse = new THREE.Vector2()
    this.mouse.x = 0
    this.mouse.y = 0
    this.raycaster.setFromCamera(this.mouse, this.application.camera.instance)

    // shoot a ball on click
    document.addEventListener('click', (e) => {
      this.mouse.x = (e.clientX / window.innerWidth) * 2 - 1
      this.mouse.y = -(e.clientY / window.innerHeight) * 2 + 1
      this.raycaster.setFromCamera(this.mouse, this.application.camera.instance)
      const intersects = this.raycaster.intersectObjects(this.scene.children)
      const {x, y, z} = this.application.camera.instance.position
      if (intersects.length > 0) {
        this.cannonball = new Sphere(
          .15,
          {
            x: x,
            y: y - 0.3,
            z: z
          }
        )

        const direction = new CANNON.Vec3()
        direction.copy(intersects[0].point)
        direction.vsub(this.cannonball.body.position, direction)
        direction.normalize()
        direction.scale(5, direction)
        this.cannonball.body.applyImpulse(direction, this.cannonball.body.position)

        // if cannonball hits cube, remove cube and create 10 smaller cubes
        this.cannonball.body.addEventListener('collide', (e) => {
          console.log(e)
          if (e.body === this.cube.body) {
            this.scene.remove(this.cube.mesh)
            this.world.removeBody(this.cube.body)
            // remove cannonball
            this.scene.remove(this.cannonball.mesh)
            this.world.removeBody(this.cannonball.body)
            this.objectsToUpdate.splice(this.objectsToUpdate.indexOf(this.cube), 1)
            
            const {x, y, z} = this.cube.body.position

            for (let i = 0; i < 15; i++) {
              const randomSize = Math.random() / 4 + 0.05
              this.cube = new Cube(
                randomSize,
                randomSize,
                randomSize,
                {
                  x: x + (Math.random() - 0.5) * 0.5,
                  y: y + Math.random() * 0.5,
                  z: z + (Math.random() - 0.5) * 0.5
                }
              )
            }
          }
        })
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
      // obj.body.removeEventListener('collide', playHitSound)
      this.world.removeBody(obj.body)
      this.scene.remove(obj.mesh)
    }
    this.text.createText()
  }
}

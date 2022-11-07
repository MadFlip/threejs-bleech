import * as THREE from 'three'
import EventEmitter from "./EventEmitter"

export default class Time extends EventEmitter {
  constructor () {
    super()

    // Setup
    this.clock = new THREE.Clock()
    this.oldElapsed = 0

    // Tick
    window.requestAnimationFrame(this.tick.bind(this))
  }

  tick () {
    this.elapsed = this.clock.getElapsedTime()
    this.delta = this.elapsed - this.oldElapsed
    this.oldElapsed = this.elapsed

    this.trigger('tick')
    window.requestAnimationFrame(this.tick.bind(this))
  }
}

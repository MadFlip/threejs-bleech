import * as THREE from "three"
import Application from "../Application"

export default class Sound {
  constructor() {
    this.application = new Application()
    this.scene = this.application.scene
    this.resources = this.application.resources
    this.buttonSound = document.querySelector('[data-toggle-sound]')
    
    this.resources.on('ready', () => {
      this.setAudioListener()
      this.playBackgroundSound()
    })
  }

  setAudioListener() {
    this.listener = new THREE.AudioListener()
    this.application.camera.instance.add(this.listener)
    this.soundBoom = new THREE.Audio(this.listener)
    this.soundHit = new THREE.Audio(this.listener)
    this.soundBackground = new THREE.Audio(this.listener)
    this.scene.add(this.soundBoom, this.soundHit, this.soundBackground)
  }

  playHitSound(collision) {
    const impactStrength = collision.contact.getImpactVelocityAlongNormal()
    if (impactStrength > 1.1) {
      if (this.soundHit.isPlaying) {
        this.soundHit.stop()
      }
      this.soundHit.setBuffer(this.resources.items.hitSound)
      this.soundHit.setLoop(false)
      this.soundHit.setVolume(Math.random())
      this.soundHit.play()
    }
  }

  playBackgroundSound() {
    this.soundBackground.setBuffer(this.resources.items.backgroundSound)
    this.soundBackground.setLoop(true)
    this.soundBackground.setVolume(0.05)
    this.soundBackground.play()
    
    if (this.soundBackground.isPlaying) {
      this.buttonSound.dataset.toggleSound = 'on'
    }
  }

  playBoomSound() {
    if (this.soundBoom.isPlaying) {
      this.soundBoom.stop()
    }
    this.soundBoom.setBuffer(this.resources.items.boomSound)
    this.soundBoom.setLoop(false)
    this.soundBoom.setVolume(0.5)
    this.soundBoom.play()
  }

  muteBackground() {
    this.soundBackground.setVolume(0)
  }

  unmuteBackground() {
    this.soundBackground.setVolume(0.05)
  }
}

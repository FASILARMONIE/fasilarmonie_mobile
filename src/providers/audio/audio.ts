import { Injectable } from '@angular/core';


declare var AudioContext
declare var webkitAudioContext
declare var GainNode
declare var OscillatorNode
declare var Float32Array

@Injectable()
export class AudioProvider {

  private audioContext: AudioContext
  public volume: GainNode
  public oscillators: OscillatorNode[] = []

  constructor() {
    console.log('Hello AudioProvider Provider');
    this.audioContext = new (AudioContext || webkitAudioContext)
    this.volume = this.audioContext.createGain()
    this.volume.connect(this.audioContext.destination)
    this.volume.gain.setTargetAtTime(0.05, this.audioContext.currentTime, 0.01)
  }

prepareFrequence(hz: number = 440.0){
  let oscillator = this.audioContext.createOscillator()
    oscillator.type = 'sine'
    oscillator.frequency.setTargetAtTime(hz, this.audioContext.currentTime, 0.01)
    this.oscillators.push(oscillator)
    return oscillator
}

  playFrequence(hz: number = 440.0) {
    let oscillator = this.audioContext.createOscillator()
    oscillator.type = 'sine'
    oscillator.frequency.setTargetAtTime(hz, this.audioContext.currentTime, 0.01)
    oscillator.connect(this.volume)
    oscillator.start(this.audioContext.currentTime)
    this.oscillators.push(oscillator)
    return oscillator
  }

  stop() {
    this.oscillators.map(oscillator => {
      oscillator.stop(this.audioContext.currentTime)
      oscillator.disconnect()
      oscillator = null
    })
  }


}

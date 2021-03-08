import { EventEmitter } from 'events'

class TouchHandler {
  constructor (touchZone) {
    this.touchZone = document.querySelector(touchZone)
    this.touchStartX = 0
    this.touchStartY = 0
    this.touchEndX = 0
    this.touchEndY = 0
    this.eventEmitter = new EventEmitter()
  }

  startHandler = (event) => {
    // console.log('start')
    this.touchStartX = event.changedTouches[0].clientX
    this.touchStartY = event.changedTouches[0].clientY
  }

  endHandler = (event) => {
    // console.log('end')
    this.touchEndX = event.changedTouches[0].clientX
    this.touchEndY = event.changedTouches[0].clientY
    this.gestureHandler()
  }

  registerTouchListener () {
    // console.log('Register')
    this.touchZone.addEventListener('touchstart', this.startHandler)
    this.touchZone.addEventListener('touchend', this.endHandler)
  }

  unregisterTouchListener () {
    // console.log('Unregister')
    this.touchZone.removeEventListener('touchstart', this.startHandler)
    this.touchZone.removeEventListener('touchstart', this.endHandler)
  }

  onSwipe (direction, callback) {
    this.eventEmitter.on('swipe', callback)
  }

  gestureHandler () {
    const xDiff = this.touchEndX - this.touchStartX
    const yDiff = this.touchEndY - this.touchStartY

    if (Math.abs(xDiff) > Math.abs(yDiff)) {
      if (xDiff > 0) {
        this.eventEmitter.emit('swipe', 'right')
      } else {
        this.eventEmitter.emit('swipe', 'left')
      }
    } else {
      if (yDiff > 0) {
      } else {
      }
    }
  }
}

export default TouchHandler

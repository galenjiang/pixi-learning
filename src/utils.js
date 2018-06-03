export default class KeyBoardEvent {
    constructor(keyCode) {
        this.keyCode = keyCode
        this.isDown = false
        this.isUp = true
        this.press = undefined
        this.release = undefined
        this.keyDownHandler = []
        this.keyUpHandler = []
    }
    on(type, handler) {
        // TODO: release event emmiter
        if (type === 'down') {

            const downHandler = (e) => {
                if (e.keyCode === this.keyCode && this.isUp) {
                    handler()
                    this.isDown = true
                    this.isUp = false
                }
                e.preventDefault(downHandler)
            }
            this.keyDownHandler.push(downHandler)
            window.addEventListener('keydown', downHandler)
        } else if (type === 'up') {
            const upHandler = (e) => {
                if (e.keyCode === this.keyCode && this.isDown) {
                    handler()
                    this.isDown = false
                    this.isUp = true
                    
                }
                e.preventDefault()
            }
            window.addEventListener('keydown', upHandler)
        }

    }

    destroy() {
        this.keyDownHandler.forEach((handler) => {
            window.removeEventListener('keydown', handler)
        })
        this.keyUpHandler.forEach((handler) => {
            window.removeEventListener('keyup', handler)
        })
    }
}
class KeyBoard {
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
                if ((e.keyCode === this.keyCode) && this.isUp) {
                    handler()
                    this.isDown = true
                    this.isUp = false
                }
                e.preventDefault()
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
            window.addEventListener('keyup', upHandler)
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

function testCollision(r1, r2) {
    //Define the variables we'll need to calculate
    let hit, combinedHalfWidths, combinedHalfHeights, vx, vy;

    //hit will determine whether there's a collision
    hit = false;

    //Find the center points of each sprite
    r1.centerX = r1.x + r1.width / 2;
    r1.centerY = r1.y + r1.height / 2;
    r2.centerX = r2.x + r2.width / 2;
    r2.centerY = r2.y + r2.height / 2;

    //Find the half-widths and half-heights of each sprite
    r1.halfWidth = r1.width / 2;
    r1.halfHeight = r1.height / 2;
    r2.halfWidth = r2.width / 2;
    r2.halfHeight = r2.height / 2;

    //Calculate the distance vector between the sprites
    vx = r1.centerX - r2.centerX;
    vy = r1.centerY - r2.centerY;

    //Figure out the combined half-widths and half-heights
    combinedHalfWidths = r1.halfWidth + r2.halfWidth;
    combinedHalfHeights = r1.halfHeight + r2.halfHeight;

    //Check for a collision on the x axis
    if (Math.abs(vx) < combinedHalfWidths) {

        //A collision might be occuring. Check for a collision on the y axis
        if (Math.abs(vy) < combinedHalfHeights) {

            //There's definitely a collision happening
            hit = true;
        } else {

            //There's no collision on the y axis
            hit = false;
        }
    } else {

        //There's no collision on the x axis
        hit = false;
    }

    //`hit` will be either `true` or `false`
    return hit;
}

export {
    KeyBoard,
    testCollision
}
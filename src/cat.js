import '../node_modules/pixi.js/dist/pixi.min.js'

import { testCollision, KeyBoard } from './utils.js'
const { utils, Application, Sprite, loader, Container, Graphics } = PIXI

export default () => {
    const app = new Application({
        width: 512,
        height: 512,
    })

    document.body.appendChild(app.view)

    loader.add([
        './src/img/cat.png',
        './src/img/animals.json'
    ]).load(init)

    function init() {

        
        
        const cat = new Sprite(loader.resources['./src/img/cat.png'].texture)
        cat.vx = 0
        cat.vy = 0
        cat.position.set(256, 256)
        app.stage.addChild(cat)

        const rect = new Graphics()

        rect.beginFill(0xffffff)

        rect.drawRect(0, 0, 100, 100)

        rect.endFill()
        rect.x = 50
        rect.y = 50

        app.stage.addChild(rect)


        // const id = loader.resources['./src/img/animals.json'].textures

        // const container = new Container()

        // const cat = new Sprite(id['cat.png'])
        // cat.position.set(16, 16)
        // // app.stage.addChild(cat)

        // const hedgehog = new Sprite(id['hedgehog.png'])
        // hedgehog.position.set(32, 32)
        // // app.stage.addChild(hedgehog)

        // const tiger = new Sprite(id['tiger.png'])
        // tiger.position.set(64, 64)
        // // app.stage.addChild(tiger)
        // container.addChild(cat)
        // container.addChild(hedgehog)
        // container.addChild(tiger)

        // app.stage.addChild(container)

        // container.width = 56


        const down = new KeyBoard(40)
        down.on('down', () => {
            cat.vy = 3
        })
        down.on('up', () => {
            // cat.vy = 0
            if (!up.isDown && cat.vx === 0) {
                cat.vy = 0;
              }
        })

        const up = new KeyBoard(38)
        up.on('down', () => {
            cat.vy = -3
        })
        up.on('up', () => {
            cat.vy = 0
        })

        const left = new KeyBoard(37)
        left.on('down', () => {
            cat.vx = -3
        })
        left.on('up', () => {
            cat.vx = 0
        })

        const right = new KeyBoard(39)
        right.on('down', () => {
            cat.vx = 3
        })
        right.on('up', () => {
            cat.vx = 0
        })

        app.ticker.add(delta => gameLoop(delta))

        let state = play

        function gameLoop(delta) {
            state(delta)
        }

        function play(delta) {
            cat.x += cat.vx
            cat.y += cat.vy
            if (testCollision(rect, cat)) {
                rect.tint = 0x00ff00  //0xff3300
                state = end
            } else {
                rect.tint = 0xff0000
            }

        }

        function end(delta) {

        }

    }
}
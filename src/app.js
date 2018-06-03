import '../node_modules/pixi.js/dist/pixi.min.js'
import KeyBoardEvent from './utils.js'

const { utils, Application, Sprite, loader } = PIXI

export default () => {
    const app = new Application({
        width: 512,
        height: 512,
    })
    
    document.body.appendChild(app.view)
    
    loader.add([
        // './img/cat.png',
        '/src/img/dungeon.png',
        '/src/img/treasureHunter.json'
    ])
        .load(init)
    
    function init() {
        // const cat1 = new Sprite(loader.resources['./img/cat.png'].texture)
        // const cat2 = new Sprite(loader.resources['./img/cat.png'].texture)
        // // const avatar = new Sprite(utils.TextureCache['./img/avatar.jpg'])

        // // cat1.position.set(96, 96)
        // cat1.scale.set(1, 1)
        // cat1.anchor.set(0.5, 0.5)
        // // cat1.rotation = Math.PI / 2

        // // cat2.position.set(96, 96)
        // cat2.scale.set(1, 1)
        // cat2.pivot.set(32, 32)
        // cat2.rotation = Math.PI / 2

        // app.stage.addChild(cat1)
        // app.stage.addChild(cat2)

        let dungeon, explorer, treasure, id, door;

        id = loader.resources['/src/img/treasureHunter.json'].textures

        
        dungeon = new Sprite(loader.resources['/src/img/dungeon.png'].texture)

        app.stage.addChild(dungeon)


                
        explorer = new Sprite(id['explorer.png'])
        explorer.position.set(68, app.stage.height / 2 - explorer.height / 2)
        explorer.vx = 0
        explorer.vy = 0


        app.stage.addChild(explorer)



                
        treasure  = new Sprite(id['treasure.png'])
        treasure.position.set(app.stage.width - treasure.width - 48, app.stage.height / 2 - treasure.height / 2)

        
        app.stage.addChild(treasure)

        door = new Sprite(id['door.png'])
        door.position.set(32, 0)
        app.stage.addChild(door)

        let numberOfBlobs = 6,
            spacing = 48,
            xOffset = 150


        function randomInt(min, max) {
            return Math.floor(Math.random() * (max - min)) + 1 + min
        }

        for (let i = 0; i < numberOfBlobs; i++) {
            let blob = new Sprite(id['blob.png'])
            blob.position.set(150 + i * spacing, randomInt(0, app.stage.height - blob.height))
            app.stage.addChild(blob)
        }


        const down = new KeyBoardEvent(40)
        down.on('down', () => {
            explorer.vy = 1
        })
        down.on('up', () => {
            // explorer.vy = 0
            if (!up.isDown && explorer.vx === 0) {
                explorer.vy = 0;
              }
        })

        const up = new KeyBoardEvent(38)
        up.on('down', () => {
            explorer.vy = -1
        })
        up.on('up', () => {
            explorer.vy = 0
        })

        const left = new KeyBoardEvent(37)
        left.on('down', () => {
            explorer.vx = -1
        })
        left.on('up', () => {
            explorer.vx = 0
        })

        const right = new KeyBoardEvent(39)
        right.on('down', () => {
            explorer.vx = 1
        })
        right.on('up', () => {
            explorer.vx = 0
        })


        
        app.ticker.add(delta => gameLoop(delta))
        
        function gameLoop(delta) {
            updateExplorer(delta)
        }

        function updateExplorer(delta) {
            explorer.x += explorer.vx
            explorer.y += explorer.vy
        }
    }
}
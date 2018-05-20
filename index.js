import './node_modules/pixi.js/dist/pixi.min.js'

const { utils, Application, Sprite, loader } = PIXI

const app = new Application({
    width: 512,
    height: 512,
})

document.body.appendChild(app.view)

loader.add([
    './img/avatar.jpg'
])
    .load(init)

function init() {
    // const avatar = new Sprite(loader.resources['./img/avatar.jpg'].texture)
    const avatar = new Sprite(utils.TextureCache['./img/avatar.jpg'])
    avatar.x = 256
    avatar.y = 256
    avatar.anchor.x = 0.5
    avatar.anchor.y = 0.5

    console.log(avatar)

    app.stage.addChild(avatar)
}
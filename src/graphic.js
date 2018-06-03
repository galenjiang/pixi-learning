import '../node_modules/pixi.js/dist/pixi.min.js'

const { utils, Application, Sprite, loader, Container, Graphics, Text } = PIXI

export default () => {
    const app = new Application({
        width: 512,
        height: 512,
    })

    document.body.appendChild(app.view)

    loader.add([
    ]).load(init)

    function init() {
        const rect = new Graphics()
        rect.beginFill(0x0000ff)
        // rect.lineStyle(4, 0xff0000, 0.5)
        rect.drawRect(0, 0, 100, 100)
        rect.endFill()
        rect.x = 50
        rect.y = 50


        app.stage.addChild(rect)

        // rect.tint = 0xff3300

        const text = new Text('hello PIXI!', {
            // fontFamily: "Arial",
            // fontSize: 36,
            fill: "white",
            // stroke: '#ff3300',
            // strokeThickness: 4,
        })
        text.position.set(256, 256)
        console.log(text)

        app.stage.addChild(text)

    }
}
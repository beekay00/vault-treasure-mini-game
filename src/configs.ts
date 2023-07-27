import * as PIXI from 'pixi.js'

export const getHandleSprite = (centerX: number, centerY: number): PIXI.Sprite => {
    const handleTexture = PIXI.Texture.from('public/assets/handle.png')
    const handleSprite = new PIXI.Sprite(handleTexture)
    handleSprite.width = 165
    handleSprite.height = 170
    handleSprite.x = centerX - handleSprite.width / 2 + 72
    handleSprite.y = centerY - handleSprite.height / 2 + 72

    return handleSprite
}

export const getHandleShadowSprite = (centerX: number, centerY: number): PIXI.Sprite => {
    const handleShadowTexture = PIXI.Texture.from('public/assets/handleShadow.png')
    const handleShadowSprite = new PIXI.Sprite(handleShadowTexture)
    handleShadowSprite.width = 156
    handleShadowSprite.height = 167
    handleShadowSprite.x = centerX - handleShadowSprite.width / 2 + 70
    handleShadowSprite.y = centerY - handleShadowSprite.height / 2 + 80

    return handleShadowSprite
}

export const getOpenDoorShadowSprite = (centerX: number, centerY: number): PIXI.Sprite => {
    const openedDoorShadowTexture = PIXI.Texture.from('public/assets/doorOpenShadow.png');
    const openedDoorShadowSprite = new PIXI.Sprite(openedDoorShadowTexture);
    openedDoorShadowSprite.anchor.set(0.5);
    openedDoorShadowSprite.position.set(200, 200);
    openedDoorShadowSprite.width = 320;
    openedDoorShadowSprite.height = 430;
    openedDoorShadowSprite.x = centerX - openedDoorShadowSprite.width / 2 + 505;
    openedDoorShadowSprite.y = centerY - openedDoorShadowSprite.height / 2 + 220;

    return openedDoorShadowSprite
}

export const getOpenDoorSprite = (centerX: number, centerY: number): PIXI.Sprite => {
    const openedDoorTexture = PIXI.Texture.from('public/assets/doorOpen.png')
    const openedDoorSprite = new PIXI.Sprite(openedDoorTexture)
    openedDoorSprite.anchor.set(0.5)
    openedDoorSprite.position.set(200, 200)
    openedDoorSprite.width = 300
    openedDoorSprite.height = 430
    openedDoorSprite.x = centerX - openedDoorSprite.width / 2 + 480
    openedDoorSprite.y = centerY - openedDoorSprite.height / 2 + 205

    return openedDoorSprite
}

export const getDoorSprite = (centerX: number, centerY: number): PIXI.Sprite => {
    const doorTexture = PIXI.Texture.from('public/assets/door.png')
    const doorSprite = new PIXI.Sprite(doorTexture)
    doorSprite.width = 450
    doorSprite.height = 430
    doorSprite.x = centerX - doorSprite.width / 2 + 12
    doorSprite.y = centerY - doorSprite.height / 2 - 10

    return doorSprite
}

export type SpriteCoordinates = { x: number; y: number; width?: number; height?: number }

export const getBlinkSprite = (coordinates: SpriteCoordinates): PIXI.Sprite => {
    const blinkTexture = PIXI.Texture.from('public/assets/blink.png')
    const blinkSprite = new PIXI.Sprite(blinkTexture)
    blinkSprite.width = 100
    blinkSprite.height = 100
    blinkSprite.x = coordinates.x
    blinkSprite.y = coordinates.y

    return blinkSprite
}

export const getBackgroundSprite = (width: number, height: number): PIXI.Sprite => {
    const backgroundTexture = PIXI.Texture.from('public/assets/bg.png')
    const backgroundSprite = new PIXI.Sprite(backgroundTexture)

    backgroundSprite.width = width
    backgroundSprite.height = height

    return backgroundSprite
}
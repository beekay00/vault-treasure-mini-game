import * as PIXI from 'pixi.js'
import { gsap } from 'gsap'
import { Direction } from './types'

export function rotateSprite(sprite: PIXI.Sprite, rotationDirection: gsap.TweenValue | undefined, rotationDuration: gsap.TweenValue | undefined = 1) {
    gsap.to(sprite, {
        duration: rotationDuration,
        rotation: rotationDirection,
    })
}

export function rotateBlink(delta: number, blink: PIXI.Sprite[]) {
    for (const b of blink) {
        b.rotation += 0.02 * delta
    }
}

export function moveSprite(sprite: PIXI.Sprite, rotationDuration: gsap.TweenValue | undefined = 1) {
    gsap.to(sprite, {
        duration: rotationDuration,
    })
}

export const handleSpriteRotation = (sprite: PIXI.Sprite, direction: Direction) => {
    const rotationDegree = direction === Direction.LEFT ? -60 : 60
    const rotationDirection = sprite.rotation + PIXI.DEG_TO_RAD * rotationDegree
    rotateSprite(sprite, rotationDirection)
    rotateSprite(sprite, rotationDirection)
}

export const handleWrongCodeRotation = (sprite: PIXI.Sprite, direction: Direction) => {
    const rotationDegree = direction === Direction.LEFT ? -480 : 480
    const rotationDirection = sprite.rotation + PIXI.DEG_TO_RAD * rotationDegree
    rotateSprite(sprite, rotationDirection, 0.1)
    rotateSprite(sprite, rotationDirection, 0.1)
}
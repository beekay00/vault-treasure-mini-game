export type SpriteCoordinates = { x: number; y: number; width?: number; height?: number }

export type CombinationObjectArray = Array<{combinationNumber: number, combinationDirection: string}>


export enum Direction {
    LEFT,
    RIGHT,
}
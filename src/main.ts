import * as PIXI from 'pixi.js'

import { getUnlockCombination, combinationNumber } from './utils/utils'
import { handleSpriteRotation, handleWrongCodeRotation, moveSprite, rotateBlink} from './animations'
import { SpriteCoordinates, getBackgroundSprite, getBlinkSprite, getDoorSprite, getHandleShadowSprite, getHandleSprite, getOpenDoorShadowSprite, getOpenDoorSprite } from './configs'
import { Direction } from './consts'

const app = new PIXI.Application({
    backgroundColor: 0x1099bb,
    width: 1350,
    height: 700,
})
document.body.appendChild(app.view as any)


const container = new PIXI.Container()
app.stage.addChild(container)

const backgroundSprite = getBackgroundSprite(app.view.width, app.view.height)
container.addChild(backgroundSprite)

const firstBlinkSpriteCoordinates: SpriteCoordinates = { x: 560, y: 335 }
const firstBlinkSprite = getBlinkSprite(firstBlinkSpriteCoordinates)
const secondBlinkSpriteCoordinates: SpriteCoordinates = { x: 655, y: 340 }
const secondBlinkSprite = getBlinkSprite(secondBlinkSpriteCoordinates)
const thirdBlinkSpriteCoordinates: SpriteCoordinates = { x: 710, y: 425 }
const thirdBlinkSprite = getBlinkSprite(thirdBlinkSpriteCoordinates)
container.addChild(firstBlinkSprite, secondBlinkSprite, thirdBlinkSprite)

const centerX = app.view.width / 2
const centerY = app.view.height / 2

const doorSprite = getDoorSprite(centerX, centerY)
container.addChild(doorSprite)

const openedDoorShadowSprite = getOpenDoorShadowSprite(centerX, centerY)
openedDoorShadowSprite.visible = false;
container.addChild(openedDoorShadowSprite)
moveSprite(openedDoorShadowSprite, Direction.LEFT);

const openedDoorSprite = getOpenDoorSprite(centerX, centerY)
openedDoorSprite.visible = false;
container.addChild(openedDoorSprite)
moveSprite(openedDoorSprite, Direction.LEFT)

const handleShadowSprite = getHandleShadowSprite(centerX, centerY)
container.addChild(handleShadowSprite)

const handleSprite = getHandleSprite(centerX, centerY)
container.addChild(handleSprite)

container.x = app.view.width / 2
container.y = app.view.height / 2

container.pivot.x = container.width / 2
container.pivot.y = container.height / 2

firstBlinkSprite.anchor.set(0.5)
secondBlinkSprite.anchor.set(0.5)
thirdBlinkSprite.anchor.set(0.5)

app.ticker.add((delta: any) => {
    rotateBlink(delta, [firstBlinkSprite, secondBlinkSprite, thirdBlinkSprite])
})

handleSprite.anchor.set(0.5)
handleShadowSprite.anchor.set(0.5)

handleSprite.interactive = true

app.render()

getUnlockCombination()

let firstCombinationUnlock = {
    count: 0,
    isPassed: false,
}

let secondCombinationUnlock = {
    count: 0,
    isPassed: false,
}

let thirdCombinationUnlock = {
    count: 0,
    isPassed: false,
}

const resetToDefault = () => {
    firstCombinationUnlock = { count: 0, isPassed: false }
    secondCombinationUnlock = { count: 0, isPassed: false }
    thirdCombinationUnlock = { count: 0, isPassed: false }
}

let currentCodeStage = 1

const verifyCounterClockwiseRotation = (firstCombinationPair: any, thirdCombinationPair: any) => {
    const isFirstCombinationPassed = firstCombinationUnlock.isPassed

    if (!isFirstCombinationPassed) {
        increaseCounterAndVerify(firstCombinationUnlock, firstCombinationPair.combinationNumber)
    } else {
        if (currentCodeStage !== 3) {
            resetToDefault()
            handleWrongCodeRotation(handleSprite, Direction.RIGHT)
            return
        }
        increaseCounterAndVerify(thirdCombinationUnlock, thirdCombinationPair.combinationNumber)
    }
}

const verifyClockwiseRotation = (secondCombinationPair: any) => {
    increaseCounterAndVerify(secondCombinationUnlock, secondCombinationPair.combinationNumber)
}

const increaseCounterAndVerify = (combinationObject: any, requiredCombinationNumber: number) => {
    combinationObject.count += 1
    if (combinationObject.count === requiredCombinationNumber) {
        combinationObject.isPassed = true
        currentCodeStage += 1
    }

    if (combinationObject.count > requiredCombinationNumber) {
        resetToDefault()
        handleWrongCodeRotation(handleSprite, Direction.LEFT)
        handleWrongCodeRotation(handleShadowSprite, Direction.LEFT)
    }
}

const verifyRotation = (direction: Direction) => {
    const [firstCombinationPair, secondCombinationPair, thirdCombinationPair] = [
        { combinationNumber: combinationNumber, combinationDirection: 'counterclockwise' },
        { combinationNumber: combinationNumber, combinationDirection: 'clockwise' },
        { combinationNumber: combinationNumber, combinationDirection: 'counterclockwise' },
    ] 
    
    
    
    if (direction === Direction.LEFT) verifyCounterClockwiseRotation(firstCombinationPair, thirdCombinationPair)
    else verifyClockwiseRotation(secondCombinationPair)
}

function handleHandleClick(event: MouseEvent) {
    const x = event.clientX
    if (x < 967) {
        handleSpriteRotation(handleSprite, Direction.LEFT)
        handleSpriteRotation(handleShadowSprite, Direction.LEFT)
        verifyRotation(Direction.LEFT)
    } else if (x > 967) {
        handleSpriteRotation(handleSprite, Direction.RIGHT)
        handleSpriteRotation(handleShadowSprite, Direction.RIGHT)
        verifyRotation(Direction.RIGHT)
    } else {
        console.log('Clicked exactly on the center of the door.')
    }

    function openDoor() {
        setTimeout(() => {
            openedDoorSprite.visible = true;
            openedDoorShadowSprite.visible = true;
            doorSprite.visible = false;
            handleSprite.visible = false;
            handleShadowSprite.visible = false;
          }, 850);
    }  

      app.render();

    const isUnlocked = firstCombinationUnlock.isPassed && secondCombinationUnlock.isPassed && thirdCombinationUnlock.isPassed

    if (isUnlocked) {
        openDoor();
        setTimeout(() => {
            openedDoorSprite.visible = false;
            openedDoorShadowSprite.visible = false;
            doorSprite.visible = true;
            handleSprite.visible = true;
            handleShadowSprite.visible = true;
            resetToDefault()
            handleWrongCodeRotation(handleSprite, Direction.RIGHT)
            handleWrongCodeRotation(handleShadowSprite, Direction.RIGHT)
        }, 5000);
        getUnlockCombination();
    }
}

handleSprite.interactive = true 
handleSprite.on('click', handleHandleClick)

//const handleResize = () => {
//    const canvasWidth = app.view.width;
//    const canvasHeight = app.view.height;
//    const newWidth = window.innerWidth;
//    const newHeight = window.innerHeight;
//  
//    // Calculate the scale factor for resizing
//    const scaleX = newWidth / canvasWidth;
//    const scaleY = newHeight / canvasHeight;
//    const scale = Math.min(scaleX, scaleY);
//  
//    app.renderer.resize(newWidth, newHeight);
//  
//    backgroundSprite.width = newWidth;
//    backgroundSprite.height = newHeight;
//  
//    const doorWidth = 450 * scale; 
//    const doorHeight = 430 * scale; 
//    doorSprite.width = doorWidth;
//    doorSprite.height = doorHeight;
//    doorSprite.x = newWidth / 2 
//    doorSprite.y = newHeight / 2 
//  
//    const handleWidth = 36 * scale; 
//    const handleHeight = 75 * scale; 
//    handleSprite.width = handleWidth;
//    handleSprite.height = handleHeight;
//    handleSprite.x = newWidth / 2 - handleWidth / 2  * scale; 
//    handleSprite.y = newHeight / 2 - handleHeight / 2  * scale; 
//  
//    const handleShadowWidth = 36 * scale;
//    const handleShadowHeight = 75 * scale;
//    handleShadowSprite.width = handleShadowWidth;
//    handleShadowSprite.height = handleShadowHeight;
//    handleShadowSprite.x = newWidth / 2 - handleShadowWidth / 2  * scale;
//    handleShadowSprite.y = newHeight / 2 - handleShadowHeight / 2  * scale;
//  
//    const firstBlinkSpriteWidth = 50 * scale; 
//    const firstBlinkSpriteHeight = 50 * scale; 
//    firstBlinkSprite.width = firstBlinkSpriteWidth;
//    firstBlinkSprite.height = firstBlinkSpriteHeight;
//    firstBlinkSprite.x = newWidth / 2 - firstBlinkSpriteWidth / 2  * scale; 
//    firstBlinkSprite.y = newHeight / 2 - firstBlinkSpriteHeight / 2  * scale; 
//  
//    app.render();
//  };
//  window.addEventListener('resize', handleResize);



import * as PIXI from 'pixi.js'
import { gsap } from 'gsap'
import { getUnlockCombination } from './utils/utils'
import { handleSpriteRotation, handleWrongCodeRotation, moveSprite, rotateBlink } from './animations'
import { getBackgroundSprite, getBlinkSprite, getDoorSprite, getHandleShadowSprite, getHandleSprite, getOpenDoorShadowSprite, getOpenDoorSprite } from './configs'
import { Direction, SpriteCoordinates } from './types'

const app = new PIXI.Application({
    backgroundColor: 0x1099bb,
    width: 1350,
    height: 700,
});

//const renderer = PIXI.autoDetectRenderer({
//    view: app.view, 
//    width: window.innerWidth,
//    height: window.innerHeight,
//});
//
//window.addEventListener('resize', () => {
//    const newWidth = window.innerWidth;
//    const newHeight = window.innerHeight;
//
//    renderer.resize(newWidth, newHeight);
//
//    const scaleX = newWidth / 1350; 
//    const scaleY = newHeight / 700; 
//    const scale = Math.min(scaleX, scaleY);
//
//    
//    handleShadowSprite.width = 156 * scale
//    handleShadowSprite.height = 167 * scale; 
//    handleShadowSprite.x = 667 * scale; 
//    handleShadowSprite.y = 346 * scale; 
//});

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
openedDoorShadowSprite.visible = false
container.addChild(openedDoorShadowSprite)
moveSprite(openedDoorShadowSprite, Direction.LEFT)

const openedDoorSprite = getOpenDoorSprite(centerX, centerY)
openedDoorSprite.visible = false
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

const [firstCombinationPair, secondCombinationPair, thirdCombinationPair] = getUnlockCombination()

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
    if (direction === Direction.LEFT) verifyCounterClockwiseRotation(firstCombinationPair, thirdCombinationPair)
    else verifyClockwiseRotation(secondCombinationPair)
}

//function openDoor() {
//    setTimeout(() => {
//        openedDoorSprite.visible = true;
//        openedDoorShadowSprite.visible = true;
//        doorSprite.visible = false;
//        handleSprite.visible = false;
//        handleShadowSprite.visible = false;
//      }, 850);
//}
//function openDoorAnimation() {
//
//    const animationDuration = 2;
//
//    gsap.to(doorSprite.scale, {
//        x: 0,
//        duration: animationDuration,
//        ease: 'power1.inOut',
//    });
//    setTimeout(() => {
//        openedDoorSprite.visible = true;
//    }, 2000)
//
//}

function fadeInAndFadeOutAnimation() {
    const animationDuration = 2

    openedDoorSprite.alpha = 0
    openedDoorSprite.visible = true

    openedDoorShadowSprite.alpha = 0
    openedDoorShadowSprite.visible = true

    gsap.to(doorSprite, {
        alpha: 0,
        duration: animationDuration,
        ease: 'power2.inOut',
    })

    gsap.to(handleSprite, {
        alpha: 0,
        duration: animationDuration,
        ease: 'power2.inOut',
    })

    gsap.to(handleShadowSprite, {
        alpha: 0,
        duration: animationDuration,
        ease: 'power2.inOut',
    })

    gsap.to(doorSprite, {
        alpha: 0,
        duration: animationDuration,
        ease: 'power2.inOut',
    })

    gsap.to(openedDoorSprite, {
        alpha: 1,
        duration: animationDuration,
        ease: 'power2.inOut',
    })

    gsap.to(openedDoorShadowSprite, {
        alpha: 1,
        duration: animationDuration,
        ease: 'power2.inOut',
        onComplete: () => {
            setTimeout(() => {
                closingDoorAnimation()
            }, 5000)
        },
    })
}

function closingDoorAnimation() {
    const animationDuration = 2
    doorSprite.alpha = 0
    doorSprite.visible = true
    doorSprite.alpha = 0
    doorSprite.visible = true
    handleSprite.alpha = 0
    handleSprite.visible = true
    handleShadowSprite.alpha = 0
    handleShadowSprite.visible = true
    gsap.to(doorSprite, {
        alpha: 1,
        duration: animationDuration,
        ease: 'power2.inOut',
    })
    gsap.to(handleSprite, {
        alpha: 1,
        duration: animationDuration,
        ease: 'power2.inOut',
    })
    gsap.to(handleShadowSprite, {
        alpha: 1,
        duration: animationDuration,
        ease: 'power2.inOut',
    })
    gsap.to(openedDoorSprite, {
        alpha: 0,
        duration: animationDuration,
        ease: 'power2.inOut',
    })
    gsap.to(openedDoorShadowSprite, {
        alpha: 0,
        duration: animationDuration,
        ease: 'power2.inOut',
        onComplete: () => {
            resetToDefault()
            handleWrongCodeRotation(handleSprite, Direction.RIGHT)
            handleWrongCodeRotation(handleShadowSprite, Direction.RIGHT)
            getUnlockCombination()
        },
    })
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
    }
    app.render()

    const isUnlocked = firstCombinationUnlock.isPassed && secondCombinationUnlock.isPassed && thirdCombinationUnlock.isPassed

    if (isUnlocked) {
        fadeInAndFadeOutAnimation()
    }
}

handleSprite.interactive = true
handleSprite.on('click', handleHandleClick)

//Responsive TODO

//const handleResize = () => {
//    const canvasWidth = app.view.width;
//    const canvasHeight = app.view.height;
//    const newWidth = window.innerWidth;
//    const newHeight = window.innerHeight;
//
//
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

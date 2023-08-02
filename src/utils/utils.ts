import { SECRET_COMBINATION_PAIRS_COUNT } from "../consts"
import { CombinationObjectArray } from "../types";

const generateRandomNumberInRange = (min: number, max: number): number => Math.floor(Math.random() * ( Math.floor(max) - Math.ceil(min) + 1)) + Math.ceil(min);

export const getUnlockCombination = (): CombinationObjectArray => {
    const combinationArray = []
    for (let i = 0; i < SECRET_COMBINATION_PAIRS_COUNT; i++) {
      const combinationNumber = generateRandomNumberInRange(1, 9)
      const combinationDirection = i % 2 === 0 ? `counterclockwise` : `clockwise`
  
      const directionObject = { combinationNumber, combinationDirection}
      combinationArray.push(directionObject)
    }
  
    console.log(combinationArray);
    
    return combinationArray
  }
import { textCases } from "./text"
import { numberCases } from "./numbers"
import { imageCases } from "./images"

export function getRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)]()
}

export function generateAll() {
  return {
    text: getRandom(textCases),
    number: getRandom(numberCases),
    image: getRandom(imageCases)
  }
}

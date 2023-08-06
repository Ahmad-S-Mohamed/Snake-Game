import { randomGridPosition } from "./random.js";
import { expandSnake, onSnake } from "./snake.js";

let food = getRandomPosition();
const EXPANTION_RATE = 1;
// ######### Update Snake ######
export function update() {
  if (onSnake(food)) {
    expandSnake(EXPANTION_RATE);
    food = getRandomPosition();
  }
}
// ######## draw snak ##########
export function draw(gameBoard) {
  const foodElement = document.createElement("div");
  foodElement.style.gridColumnStart = food.x;
  foodElement.style.gridRowStart = food.y;
  foodElement.classList.add("food");
  gameBoard.appendChild(foodElement);
}

function getRandomPosition() {
  let newFoodPosition;
  while (newFoodPosition == null || onSnake(newFoodPosition)) {
    newFoodPosition = randomGridPosition();
  }

  return newFoodPosition;
}

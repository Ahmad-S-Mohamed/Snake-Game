import { getInputDirection } from "./input.js";

export const SNAKE_SPEED = 5;

const snake_body = [{ x: 11, y: 11 }];
let newSegments = 0;

// ######### Update Snake ######
export function update() {
  addSegment();
  let inputDirection = getInputDirection();
  for (let i = snake_body.length - 2; i >= 0; i--) {
    snake_body[i + 1] = { ...snake_body[i] };
  }
  snake_body[0].x += inputDirection.x;
  snake_body[0].y += inputDirection.y;
}
// ######## draw snak ##########
export function draw(gameBoard) {
  snake_body.forEach((segment) => {
    const snakeElement = document.createElement("div");
    snakeElement.style.gridColumnStart = segment.x; // first point for  snake body in grid Coulmn
    snakeElement.style.gridRowStart = segment.y; // first point for  snake body in grid Row
    snakeElement.classList.add("snake"); // snake style from class css
    gameBoard.appendChild(snakeElement);
  });
}

export function onSnake(position, { ignoreHead = false } = {}) {
  return snake_body.some((segment, index) => {
    if (ignoreHead && index === 0) return false;
    return equalPosition(segment, position);
  });
}

export function getSnakeHead() {
  return snake_body[0];
}

export function snakeIntersection() {
  return onSnake(snake_body[0], { ignoreHead: true });
}

export function expandSnake(amount) {
  newSegments += amount;
}

function equalPosition(pos1, pos2) {
  return pos1.x === pos2.x && pos1.y === pos2.y;
}

function addSegment() {
  for (let i = 0; i < newSegments; i++) {
    snake_body.push({ ...snake_body[snake_body.length - 1] });
  }
  newSegments = 0;
}

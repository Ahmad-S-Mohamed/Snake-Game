import {
  SNAKE_SPEED,
  update as update_snake,
  draw as draw_snake,
  snakeIntersection,
  getSnakeHead,
} from "./snake.js";
import { update as update_food, draw as draw_food } from "./food.js";
import { outsidGrid } from "./random.js";

// ! Game Loop
let lastRenderTime = 0;
let gameOver = false;

const gameBoard = document.getElementById("game-board");

function main(currentTime) {
  if (gameOver) {
    if (confirm("you lost. press OK to restart ")) {
      window.location = "/Snake%20Game/index.html";
    }
    return;
  }
  window.requestAnimationFrame(main);
  const secoundsSinceLastRender = (currentTime - lastRenderTime) / 1000;
  if (secoundsSinceLastRender < 1 / SNAKE_SPEED) return;
  // console.log("render");
  lastRenderTime = currentTime;

  update();
  draw();
}
window.requestAnimationFrame(main);

function update() {
  update_snake();
  update_food();
  checkDeath();
}
function draw() {
  gameBoard.innerHTML = "";
  draw_snake(gameBoard);
  draw_food(gameBoard);
}

function checkDeath() {
  gameOver = outsidGrid(getSnakeHead()) || snakeIntersection();
}

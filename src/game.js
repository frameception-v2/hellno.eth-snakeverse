class GameState {
  constructor() {
    this.snake = [[7,7], [8,7], [9,7]]; // Initial snake position
    this.food = this.generateFood();
    this.direction = 'right';
    this.score = 0;
    this.status = 'playing'; // 'won'/'lost'
  }
  
  generateFood() {
    // Generate food until we find position not occupied by snake
    let food;
    do {
      food = [
        Math.floor(Math.random() * 20),
        Math.floor(Math.random() * 20)
      ];
    } while (this.snake.some(segment => 
      segment[0] === food[0] && segment[1] === food[1]
    ));
    return food;
  }
}

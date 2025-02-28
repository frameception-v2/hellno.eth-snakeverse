- [x] Task 1: Create base HTML frame with SVG grid
  File: public/index.html
  Action: Create
  Description: Create 300x340px SVG viewBox with 20x20 grid (1px lines every 15px). Include score text element at top.
  Code:
  ```html
  <svg viewBox="0 0 300 340" style="width: 100%; max-width: 600px">
    <text id="score" x="150" y="30" text-anchor="middle">0</text>
    <!-- Grid lines will be added via JS -->
  </svg>
  ```

- [x] Task 2: Implement core game state structure
  File: src/game.js
  Action: Create
  Description: Initialize GameState class with snake, food, direction, score, status
  Code:
  ```javascript
  class GameState {
    constructor() {
      this.snake = [[7,7], [8,7], [9,7]];
      this.food = this.generateFood();
      this.direction = 'right';
      this.score = 0;
      this.status = 'playing'; // 'won'/'lost'
    }
    
    generateFood() { /* Random position not in snake */ }
  }
  ```

- [ ] Task 3: Create POST endpoint for direction input
  File: server.js
  Action: Add
  Description: Handle direction changes via POST /move
  Code:
  ```javascript
  app.post('/move', (req, res) => {
    const { direction, state } = req.body;
    const gameState = decodeState(state);
    if (isValidDirection(gameState.direction, direction)) {
      gameState.direction = direction;
    }
    res.send(generateFrame(gameState));
  });
  ```

- [ ] Task 4: Implement snake movement logic
  File: src/game.js
  Action: Add method to GameState
  Description: Move snake head and update body
  Code:
  ```javascript
  move() {
    const head = [...this.snake[0]];
    switch(this.direction) {
      case 'right': head[0]++; break;
      case 'left': head[0]--; break;
      case 'up': head[1]--; break;
      case 'down': head[1]++; break;
    }
    this.snake.unshift(head);
    if (head[0] === this.food[0] && head[1] === this.food[1]) {
      this.score++;
      this.food = this.generateFood();
    } else {
      this.snake.pop();
    }
  }
  ```

- [x] Task 5: Create collision detection system
  File: src/game.js
  Action: Add methods to GameState
  Description: Check wall/body collisions and win condition
  Code:
  ```javascript
  checkCollisions() {
    const head = this.snake[0];
    // Wall collision
    if (head[0] < 0 || head[0] >= 20 || head[1] < 0 || head[1] >= 20) {
      this.status = 'lost';
    }
    // Self collision
    for (let i = 1; i < this.snake.length; i++) {
      if (head[0] === this.snake[i][0] && head[1] === this.snake[i][1]) {
        this.status = 'lost';
      }
    }
    // Win condition
    if (this.snake.length >= 10) this.status = 'won';
  }
  ```

- [ ] Task 6: Implement state serialization
  File: src/state.js
  Action: Create
  Description: Base64URL encode/decode game state
  Code:
  ```javascript
  const encodeState = (state) => {
    const str = JSON.stringify(state);
    return Buffer.from(str).toString('base64url');
  };

  const decodeState = (encoded) => {
    try {
      return JSON.parse(Buffer.from(encoded, 'base64url').toString());
    } catch {
      return new GameState();
    }
  };
  ```

- [ ] Task 7: Add signature validation middleware
  File: server.js
  Action: Add
  Description: Verify Farcaster message signature
  Code:
  ```javascript
  app.use('/move', async (req, res, next) => {
    const signature = req.headers['fc:frame:message:signature'];
    const isValid = await verifyMessage(req.body, signature);
    if (!isValid) return res.status(401).send('Invalid signature');
    next();
  });
  ```

- [x] Task 8: Implement retro styling
  File: public/style.css
  Action: Create
  Description: Apply Press Start 2P font and color scheme
  Code:
  ```css
  body {
    font-family: 'Press Start 2P', cursive;
    background: #000;
  }
  .grid-line {
    stroke: #333;
    stroke-width: 1px;
  }
  .snake { fill: #00ff00 }
  .food { fill: #ff0000 }
  ```

- [ ] Task 9: Create game overlay component
  File: src/render.js
  Action: Create
  Description: Show win/lose status over grid
  Code:
  ```javascript
  function renderOverlay(state) {
    if (state.status === 'playing') return '';
    return `<rect width="300" height="340" fill="#00000080"/>
            <text x="150" y="170" fill="white" text-anchor="middle">
              ${state.status === 'won' ? 'VICTORY!' : 'GAME OVER'}
            </text>`;
  }
  ```

- [ ] Task 10: Implement input validation
  File: src/game.js
  Action: Add
  Description: Prevent 180° turns and invalid food spawns
  Code:
  ```javascript
  isValidDirection(current, newDir) {
    const opposites = {up:'down', down:'up', left:'right', right:'left'};
    return newDir !== opposites[current];
  }

  generateFood() {
    let food;
    do {
      food = [Math.floor(Math.random()*20), Math.floor(Math.random()*20)];
    } while (this.snake.some(seg => seg[0] === food[0] && seg[1] === food[1]));
    return food;
  }
  ```

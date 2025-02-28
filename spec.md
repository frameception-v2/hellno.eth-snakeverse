### 1. Core Functionality
**Main User Flow**:  
1. User opens frame → sees retro-styled game board  
2. Presses directional buttons to control snake  
3. Game updates after each move (score increases when eating food)  
4. Win at length 10 → celebration screen / Lose on collision → game over screen

**Required API Endpoints**:  
- `POST /snake-frame`  
  Handles:  
  - Initial game state setup  
  - Direction input processing  
  - Game state updates  
  - Win/lose condition checks

**Key Data Structures**:  
```typescript
type GameState = {
  snake: Array<[number, number]> // grid coordinates
  direction: 'up'|'down'|'left'|'right'
  food: [number, number]
  score: number
  status: 'playing'|'won'|'lost'
}
```

### 2. Implementation Approach
**Frame Structure**:  
![Screen Flow](https://i.imgur.com/VGFcG1c.png)  
- **Game Screen**:  
  - SVG-based grid (20x20 cells)  
  - Green snake segments (#00ff00)  
  - Red food dot (#ff0000)  
  - Retro LCD-style score display  
  - Subtitle: "Use buttons to move • First to 10 wins"

**API Integration**:  
- Single endpoint handles all game logic  
- Request payload includes serialized game state

**State Management**:  
- Encode game state → Base64URL string in frame state param  
- Each interaction:  
  `Current State → Decode → Update → Encode → New State`

### 3. Technical Considerations
**API Authentication**:  
- Validate Farcaster message signature  
- Reject requests without valid `fc:frame:message:signature`

**Critical Error Scenarios**:  
1. Invalid/missing state → Reset game  
2. Impossible direction change (180° turn) → Ignore invalid input  
3. Mobile viewport issues → Use SVG viewBox (0 0 300 300) with 15px grid cells

**Retro Style Implementation**:  
```svg
<svg viewBox="0 0 300 300" style="background: #000">
  <!-- Grid lines -->
  <path d="M0 0H300V300H0" fill="none" stroke="#1a1a1a" stroke-width="2"/>
  
  <!-- Snake -->
  {snakeSegments.map(([x,y]) => 
    <rect x={x*15} y={y*15} width="14" height="14" fill="#00ff00"/>
  )}
  
  <!-- Score -->
  <text x="50%" y="20" fill="#0f0" 
        text-anchor="middle" font-family="'Press Start 2P'" font-size="16">
    SCORE: {score}
  </text>
</svg>
```
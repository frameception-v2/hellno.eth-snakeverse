### Step 1: Basic Game Frame Setup
```text
- Build: Static frame showing initial game state with snake, food, and score
- Outcome: User sees 20x20 grid with:
  ▫ 3-segment snake at center (7,7)-(9,7)
  ▫ Food at random position (not on snake)
  ▫ Score "0" in retro font
  ▫ No movement functionality yet
```

### Step 2: Direction Input Handling
```text
- Build: POST endpoint accepting direction inputs via button clicks
- Outcome: Console logs show correct direction changes when:
  ▫ Clicking left/right arrows changes direction
  ▫ Invalid 180° turns are ignored
  ▫ State persists between requests
```

### Step 3: Snake Movement Implementation
```text
- Build: Basic movement system without collision checks
- Outcome: Snake moves continuously in current direction:
  ▫ Head advances 1 cell per move
  ▫ Body follows head's path
  ▫ Food respawns when eaten (score increases)
  ▫ Game over on wall collisions
```

### Step 4: Collision Detection
```text
- Build: Self-collision and win condition checks
- Outcome: Proper status changes when:
  ▫ Snake head touches body → 'lost'
  ▫ Snake length reaches 10 → 'won'
  ▫ Status displays in frame (text overlay)
  ▫ Buttons disabled after win/lose
```

### Step 5: State Serialization
```text
- Build: Base64URL encoding/decoding for game state
- Outcome: Complete state preservation between frames:
  ▫ Encode GameState to URL-safe string
  ▫ Decode state from POST requests
  ▫ Handle corrupted state by resetting game
```

### Step 6: Signature Validation
```text
- Build: Farcaster message signature verification
- Outcome: API rejects requests without valid:
  ▫ fc:frame:message:signature header
  ▫ Proper error handling for invalid signatures
```

### Step 7: Retro Styling Implementation
```text
- Build: Complete visual styling per specs
- Outcome: Frame matches retro design with:
  ▫ 1px grid lines every 15px
  ▫ Press Start 2P font for text
  ▫ Proper color codes (#00ff00, #ff0000)
  ▫ Mobile-responsive SVG viewBox
```

### Step 8: Edge Case Handling
```text
- Build: Input validation and error recovery
- Outcome: Graceful handling of:
  ▫ Invalid direction sequences
  ▫ Empty/malformed state params
  ▫ Food spawning inside snake
  ▫ Mobile viewport rendering issues
```
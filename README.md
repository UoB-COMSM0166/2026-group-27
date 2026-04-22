# 2026-group-27


<p align="center">
<img src= "https://github.com/UoB-COMSM0166/2026-group-27/blob/03d6826ad7f8d7e7f84cc896539c44efde7da56c/readme%20docs/1.%20banner.gif" width= "150%">
</p>

game set up instructions and link to play game. [Here is our game](https://uob-comsm0166.github.io/2026-group-27/)

# Video Demonstration

# Table of Contents 

1. [Our Group](https://github.com/UoB-COMSM0166/2026-group-27/blob/main/README.md#1-our-group)
2. [Introduction](https://github.com/UoB-COMSM0166/2026-group-27/blob/main/README.md#2-introduction)
3. [Requirements](https://github.com/UoB-COMSM0166/2026-group-27/blob/main/README.md#3-requirements)
4. [Design](https://github.com/UoB-COMSM0166/2026-group-27/blob/main/README.md#4-design)
5. [Implementation](https://github.com/UoB-COMSM0166/2026-group-27/blob/main/README.md#5-implementation)
6. [Evaluation](https://github.com/UoB-COMSM0166/2026-group-27/blob/main/README.md#6-evaluation)
7. [Process](https://github.com/UoB-COMSM0166/2026-group-27/blob/main/README.md#7-process)
8. [Sustainability, Ethics, and Accessability](https://github.com/UoB-COMSM0166/2026-group-27/blob/main/README.md#8-sustainability-ethics-and-accessability)
9. [Conclusion](https://github.com/UoB-COMSM0166/2026-group-27/blob/main/README.md#9-conclusion)
10. [Contribution Statement](https://github.com/UoB-COMSM0166/2026-group-27/blob/main/README.md#10-contribution-statement)
11. [AI Statement](https://github.com/UoB-COMSM0166/2026-group-27/blob/main/README.md#11-ai-statement)
12. [References](https://github.com/UoB-COMSM0166/2026-group-27/blob/main/README.md#12-references)

# 1. Our Group

<p align="center">
  <b>Figure 1: </b>
  <i>Group Photo!</i> <br>
  
<img src="https://github.com/UoB-COMSM0166/2026-group-27/blob/ffbe86f53cd08808ffe139176c6d5e68248c4792/IMG_2312.jpeg" width="75%">
</p>

<p align="center">
<b>Table 1: </b>
  <i>Group members from left to right of Figure 1.</i> <br>
  <p align="center">
  
<table align="center" width="100%">
  <tr>
    <th> Name</th>
    <th>Email</th>
    <th>GitHub Username</th>
  </tr>

  <tr>
    <td>Suki Dai</td>
    <td>daisy20010313@gmail.com</td>
    <td>@username</td>
  </tr>

  <tr>
    <td>Thanusha Gorva</td>
    <td>jx25475@bristol.ac.uk</td>
    <td>@thanusha170</td>
  </tr>

   <tr>
    <td>Liz Chen</td>
    <td>ji25241@bristol.ac.uk</td>
    <td>@username</td>
  </tr>

  <tr>
    <td>Yizhou Pan</td>
    <td>izapan610@gmail.com</td>
    <td>@username</td>
  </tr>

  <tr>
    <td>Keyu Zhou</td>
    <td>email</td>
    <td>@username</td>
  </tr>

   <tr>
    <td>Maniza Singh</td>
    <td>jq25952@bristol.ac.uk</td>
    <td>@ManizaS17</td>
  </tr>
  
</table>

# 2. Introduction

Lost in Bristol is an immersive, third-person maze-puzzle game that challenges players to navigate a stylized, labyrinthine recreation of Bristol’s iconic urban landscape. Developed as a tribute to the city’s unique cultural identity, the game tasks players with escaping a series of increasingly complex districts within a strict time limit. The project’s core objective was to blend traditional maze-solving mechanics with high-stakes survival elements and environmental storytelling.

## The "Twist": Survival and Strategy

What makes Lost in Bristol novel is its departure from passive exploration. While most maze games focus solely on pathfinding, our implementation introduces three "Twists" that heighten the difficulty:

* Hostile Environment: The city is not empty; players must dodge active "enemies" that deplete their health upon contact. This transforms the maze from a spatial puzzle into a tactical survival challenge where health management is as critical as navigation.

* Teleportation: To counter the maze’s complexity, we implemented transportation through portals scattered around the map. These allow for rapid repositioning, adding a layer of strategic "risk vs. reward" as players can decide whether to go through a portal or stick to their current path.

* Dynamic Visibility: In specialised "Dark Maps," the gameplay shifts entirely. Players must find and manage a torch and physical map pick-ups to see, forcing them to rely on memory and limited visual cues rather than simple trial and error.

<h2>Game Objects</h2>

<table border="1" cellspacing="0" cellpadding="10">
  <thead>
    <tr>
      <th>Category</th>
      <th>Image</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Portal</td>
      <td> <img width="32" height="32" alt="portal" src="https://github.com/user-attachments/assets/db1fd37f-90f4-474f-9620-929f83d76f55" width= "100%"/>
</td>
      <td>Act as portals to Teleport to safer spaces.</td>
    </tr>
    <tr>
      <td>Guns</td>
      <td> <img width="77" height="74" alt="Screenshot 2026-04-21 at 01 58 36" src="https://github.com/user-attachments/assets/5ad002e0-31a1-4d8f-bb69-68dc8a98b87a" width="50"></td>
      <td>To shoot enemies.</td>
    </tr>
    <tr>
      <td>Gulls</td>
      <td> <img width="45" height="45" alt="seagull" src="https://github.com/user-attachments/assets/9558e8cf-eea2-4f0f-97ec-d86c77909644" width="80"> </td>
      <td>Mini cursed hurdles to distract and steal lives until the curse is lifted.</td>
    </tr>
    <tr>
      <td> The Boss </td>
      <td> <img width="54" height="64" alt="boss-3" src="https://github.com/user-attachments/assets/85e52399-c6be-4009-8328-f3b349153988" />
</td>
      <td> A powerful monster that attacks and is the final barrier to victory.</td>
    </tr>
  </tbody>
</table> 

## Meet our Characters:


<table align="center">
  <tr>
    <th>Avatar</th>
    <th>Name</th>
    <th>Special Ability</th>
  </tr>

  <tr>
    <td> <img src="https://github.com/user-attachments/assets/cfd07d29-5951-449d-acb2-edc0f07ade99" width= "50%"> </td>
    <td>Lando Norris (F1 World Champion 2025)</td>
    <td>Speed</td>
  </tr>

  
 <tr>
   <td> <img src="https://github.com/UoB-COMSM0166/2026-group-27/blob/766d8e707f5d440de77d4fab74e682d93f8d769e/pixel%20art%20characters/Banksy%20Character%20for%20repo.png" width="50%"> </td>
    <td>Banksy: Girl with Balloon</td>
    <td>Invisibility</td>
  </tr>


 <tr>
   <td> <img src="https://github.com/UoB-COMSM0166/2026-group-27/blob/74cb50b56a60ad1eda158a457542ae2ea4fafddb/pixel%20art%20characters/fox%20bigger%20for%20repo.png" width= "50%"> </td>
    <td>Vixen</td>
    <td>Sly & Quick</td>
  </tr>

  </table>




# 3. Requirements

thanusha
- 15% ~750 words
- Early stages design. Ideation process. How did you decide as a team what to develop?
- ✅ Stakeholders
- ✅ User stories and epics 
- Case diagrams

## 3.1 Ideation Process 

<p align="center">
<b>Table ?: </b>
  <i>Game ideas....</i> <br>
  <p align="center">

<table align="center" width="100%">
  <tr>
    <th>Game Idea</th>
    <th>Inspiration</th>
    <th>Description</th>
    <th>Possible Challenges</th>
  </tr>

  <tr>
    <td>Lost In Bristol</td>
    <td>
      Pac-Man (1980)<br><br>
      The Legend of Zelda (1986)
    </td>
    <td>
      Maze-exploration game incorporating landmarks, culture, and people from Bristol.<br><br>
      Players fight enemies, collect weapons, and discover Bristol landmarks while navigating a maze.
      This combines Pac-Man-style maze navigation with Zelda-style combat, equipment, and exploration mechanics.
    </td>
    <td>
      - Balancing maze complexity and visibility<br>
      - Designing engaging enemy AI<br>
      - Integrating combat and exploration smoothly<br>
      - Ensuring performance in large maze environments
    </td>
  </tr>

<tr>
  <td> Court Clash</td>
  <td> Stick Tennis Gameplay</td>
  <td>A fast-paced tennis-style game where players control a tennis bat to keep the ball in play. Difficulty increases over time with faster speeds, power-ups and dynamic elements to create an addictive, replayable experience.</td>
  <td>
      -Balancing game speed and difficulty progression
      -integrating power-ups smoothly
      -ensuring performance at high speeds
      -making experience challenging and enjoyable 
  </td>
</tr>
  <tr>
    <td>Game Idea 3</td>
    <td></td>
    <td></td>
    <td></td>
  </tr>

</table> 

Maniza
### - [Kanban Board](https://github.com/orgs/UoB-COMSM0166/projects/172)

### - Prototypes:

**1. Lost in Bristol: Paper Prototype** 

<p align="center">
  <b>Figure ?: </b>
  <i>Paper Prototype for Lost in Bristol developed during Workshop 3 </i> <br>
  </p>

<p align="center">
<img src= "https://github.com/UoB-COMSM0166/2026-group-27/blob/98d07e99f1b2d6d9eb1fe36669cb4fe53ca8d869/readme%20docs/3.%20paper%20protoype%20lost%20in%20bristol.gif" width= "25%">
</p>



**2. Second Game: Powerpoint Prototype**
 








### - Final Idea: 

We have chosen to work on Lost in Bristol because... 


## 3.2 Identifying Stakeholders

Stakeholders for Lost in Bristol were identified using the Onion Model to ensure all relevant groups were considered (Alexander & Robertson, 2004). This helped us define our target audience and understand how different users would interact with the game.

From this, we focused on key stakeholders such as players, developers, and testers, which influenced our decisions throughout development and ensured the game remained aligned with user needs (Pirozzi, 2019). 

<p align="center">
   <b>Figure ?: </b>
  <i>Onion Model for Lost in Bristol (adapted from: Alexander & Robertson, 2004).</i> <br>
<img src= "https://github.com/UoB-COMSM0166/2026-group-27/blob/b0b48e33ac387bd2e73276ba06acaeb4621912e3/readme%20docs/3.%20onion%20model.jpg" 
 width="100%">
</p>

**The Product:** Lost in Bristol video game.

**The System:** Stakeholders involved in developing the game, including developers, designers, and project managers.

**The Containing System:** The main users of the game, such as players, who interact with and experience the gameplay.

**The Wider Environment:** External stakeholders such as assessors, testers, and Computer Science students, who evaluate or learn from the product, and influence its development. 


## 3.3 Epics & User Stories

To define the core features of our game, epics and user stories were created. 

Epics were used to represent core gameplay features, such as navigation, item collection, and combat, which were then made into user stories using Cohn’s format: “As a [user], I want [goal] so that [reason]” (Cohn, 2004). This helped us develop features step by step while keeping the focus on user needs, rather than creating goals that may not benefit the game.

Acceptance criteria were included to determine when a feature has been successfully implemented in the game using the Given-When-Then format. “Given” describes the starting state, “When” the action, and “Then” the expected result (de Biase et al., 2024).


<p align="center">
<b>Table ?: </b>
  <i>Epics, User stories and Acceptance Criteria.</i> <br>
</p>

  
<table width = "100%" align="center">
  <tr>
    <th width = "20%"> Epic</th>
    <th width = "40"> User Story</th>
    <th width = "40%"> Acceptance criteria</th>
  </tr>

  <tr>
    <td>Exploration & Immersion</td>
    <td>"As a player, I want to explore an immersive maze, so that I feel engaged while navigating the environment.”</td>
    <td>
- Given the player is exploring <br>
      <br>
- When they move through the maze <br>
      <br>
- Then movement is restricted by walls <br>
      <br>
- And the environment reflect Bristol (e.g. graffiti, brick textures) <br>
</td>
  </tr>

  <tr>
    <td>Difficulty & Survival System</td>
    <td>"As a player, I want the game to become more challenging across levels, so that I feel on edge and a sense of achievement as I progress." </td>
    <td>
- Given the player progresses <br>
      <br>
- When a new level begins <br>
      <br>
- Then the difficulty increases (e.g. reduced visibility, more obstacles) <br>
      <br>
- And the game become more challenging <br>
</td>
  </tr>

  <tr>
    <td>Character Abilities</td>
    <td>"As a player, I want to use characters with different abilities, so that I can experience different approaches to playing the game." 
    </td>
    <td>
- Given a character is selected <br>
      <br>
- When the game begins <br>
      <br>
- Then the character has a unique ability <br>
      <br>
- And the ability affects gameplay strategy and movement  <br>
</td> 
  </tr>

  <tr>
    <td>Progression & Rewards System</td>
    <td>"As a player, I want to earn rewards and buy upgrades, so that I feel my abilities improve as I progress."
 </td>
    <td>
- Given the player completes a level <br>
      <br>
- When the level ends <br>
      <br>
- Then the player is awarded in-game coins <br>
      <br>
- And the coins are added to their total balance <br>
      <br>
       <br>
- Given the player enters the shop <br>
      <br>
- When they purchase an upgrade <br>
      <br>
- Then the coins are deducted correctly <br>
      <br>
- And the upgrade changes gameplay <br>
</td>
  </tr>

</table>

## 3.4 Use-case Specification

# 4. Design

- 15% ~750 words 
- System architecture. Class diagrams, behavioural diagrams

### - Class Diagram

### - Sequence Diagram

# 5. Implementation

- 15% ~750 words

- Describe implementation of your game, in particular highlighting the TWO areas of *technical challenge* in developing your game.

# 5. Implementation

## 5.0 System Architecture and Frame-Rate Independence

### 5.0.1 Objectives and Motivations

Before any of the gameplay-specific systems described in the sections below could be built, the game needed a predictable execution loop. Two concerns drove the top-level architecture: first, that the same source code must serve radically different screens—a main menu, three distinct levels, a shop, a pause overlay, a victory screen, and a game-over screen—without those subsystems interfering with each other; and second, that the game must behave consistently across hardware, so that a player on a 144 Hz gaming laptop and a player on a 30 Hz budget browser see the same character speed and the same enemy behaviour. Both concerns are invisible when they work and catastrophic when they don't, so getting them right early was a prerequisite for every mechanic built later.

### 5.0.2 State-Flag Dispatch and Delta-Time Scaling

Scene control is implemented through a small set of global boolean flags—`start`, `pause`, `gameover`, `end`, together with per-level overlay flags such as `showInstructions` and `showMiniMap`—that gate which subsystems run each frame. The `draw()` function itself is deliberately minimal:

```js
function draw() {
    let dt = deltaTime / 1000;
    if (dt > 1) dt = 0;
    act(dt);
    drawGame();
}
```

All game logic lives in `act(dt)` and short-circuits immediately when `pause` is true, while `drawGame()` dispatches to the appropriate UI routine based on the flag combination (e.g., `if (pause) { if (start) drawStart(); else if (end) drawEnd(); ... }`). This separation prevents enemy updates from bleeding into pause screens—a class of bug that dogged our earliest prototypes—and makes adding new scenes a matter of extending the flag vocabulary rather than rewriting the loop. Because `drawFog()`, `drawMiniMap()`, `drawHud()`, and so on are simple functions guarded by their own flags, every level file reuses the same skeleton while defining its own subsystems.

Delta-time decoupling sits on top of this skeleton. p5.js exposes `deltaTime` in milliseconds; we convert to seconds (`dt = deltaTime / 1000`) so that every downstream calculation is expressed in intuitive units—player speed is `120 px/s`, boss speed is `36 px/s`, shoot cooldown is `1.6 s`—rather than frame-count magic numbers. All movement then multiplies by `dt` (`player.top -= 120 * deltaTime`), as do all countdown timers (`shootTimer -= dt`, `playerInvulnTimer -= dt`, etc.), guaranteeing frame-rate independence. A one-line guard, `if (dt > 1) dt = 0`, handles the edge case of the browser tab losing focus: on return the accumulated delta can exceed one second, which without the clamp would teleport the player clear across the maze in a single "catch-up" frame.

Collision response rides on the same pattern. Movement is applied per axis, and after each axis move the player's hitbox is tested against every wall; on intersection, the relevant edge is snapped to the wall (`player.right = w.left`, `player.top = w.bottom`, etc.) using `Rect` setters that propagate to the opposite edge automatically. Because the axes are handled independently, the sliding behaviour along wall corners emerges for free rather than requiring special-case diagonal logic.

### 5.0.3 Role as a Foundation for the Rest of This Chapter

Every system described in the following sections assumes this foundation. The fog buffer in §5.1 is redrawn fresh every frame inside `drawGame()` because `drawFog()` is a flag-gated call like any other UI routine. The spawn loops in §5.2 can afford their 300–400 retry iterations because they run once during `setup()`, not per-frame. The boss AI in §5.3 scales its chasing velocity by `dt` and its shoot timer by `dt` using exactly the same pattern as the player—meaning the boss is guaranteed to behave the same way on every machine, and its tuning constants are real-world seconds rather than opaque magic numbers.

## 5.1 Atmospheric Vision Masking and Combat Synchronisation

### 5.1.1 Objectives and Motivations

A defining feature of our Dark Maps mode is fog-of-war: the player sees only a small radius around the character and must locate a torch to extend visibility. This mechanic had to feel atmospheric and performant, but it also had to remain *fair*—the combat system must not allow the player to interact with entities hidden inside the fog, and enemies must not aggro through walls of darkness they appear to lie beyond. Synchronising what is rendered with what is mechanically valid was therefore a correctness requirement, not merely a visual concern.

### 5.1.2 Off-Screen Buffer Rendering and Distance-Capped Targeting

Fog-of-war is rendered using a secondary off-screen `p5.Graphics` buffer, initialised once at setup as `fogLayer = createGraphics(width, height)` and reused every frame. The `drawFog()` routine first fills the buffer with a semi-opaque navy (`fill(10, 12, 18, 185)`) to establish the dark layer, then—if `hasLight` is true—punches a transparent "hole" around the player by calling `fogLayer.erase()` before drawing a circle of diameter `fogRadiusWithLight * 2` (with `fogRadiusWithLight = 165` px) centred on the player's screen coordinates. The buffer is finally composited over the main canvas in a single `image(fogLayer, 0, 0)` call. Because the buffer is cleared and fully redrawn each frame rather than mutated in place, performance remains stable even when additional light sources are introduced, and we avoid per-pixel operations on the primary rendering surface entirely.

The more subtle challenge was not drawing the fog but *honouring* it mechanically. The omnidirectional shooting system includes auto-lock targeting via `findAutoTarget(px, py, range)`, which iterates over `enemies[]` and returns the nearest live enemy within `range`. A naïve implementation would use an unlimited range, allowing the crossbow to lock onto enemies the player could not possibly see—trivialising hidden encounters and breaking the atmosphere we had just spent effort rendering. To close this exploit, we cap the targeting range to closely match the fog's visibility radius of 165 px: 210 px in Level 2 (crossbow) and 220 px in Level 3 (gun, whose lamp grants marginally larger situational awareness). In both cases the small surplus over 165 accounts for the feathered edge of the halo and feels intuitive to players. Enemies outside this radius are excluded from the candidate list even though they exist in the world state. Crucially, a Euclidean distance test (`d = sqrt(dx*dx + dy*dy)`) is used rather than a bounding-box check, so the "lock zone" is genuinely circular and cannot be gamed by off-axis corner exploits.

### 5.1.3 Reflections and Extensibility

Aligning the rendering layer and the game-logic layer through a shared notion of visibility proved the cleanest way to keep both systems honest. The single `createGraphics` buffer pattern is also cheap enough that it could be extended with additional transparent holes per active torch or lamp without architectural change—each extra light source is a one-line `fogLayer.circle()` call inside the erase block. Future work could generalise this into directional cones (flashlights), fog-piercing consumables sold in the shop, or stealth mechanics that only register the player once the player enters an enemy's visibility window. Exposing the visibility radius as a named constant rather than a magic number has already made it trivial to tune playtest balance without grep-hunting through subsystems.

## 5.2 Procedural Constraint-Based Spawning

### 5.2.1 Objectives and Motivations

To keep each playthrough feeling fresh and to prevent memorisation from trivialising later attempts, all pickups (chest, lamp, ring, crossbow), enemies, and portal endpoints are spawned procedurally within each level. Randomness alone, however, produces unacceptable outcomes: an item placed inside a wall is uncollectable, an enemy overlapping the player spawn is an instant death, and a pickup placed behind an already-placed item creates a visually ambiguous pile. Balancing procedural variety with absolute solvability was the central challenge of this subsystem.

### 5.2.2 Grid Snapping and Bounded Resampling with Exclusion Lists

In Level 2 and Level 3 all candidate positions are first passed through `snapToGrid(value)` (defined as `floor(value / blockSize) * blockSize`), which aligns them to the 32-pixel grid and eliminates a whole class of near-miss sub-pixel overlaps that plagued our earliest prototypes. Level 1 achieves the same alignment through an explicit modulo check inside its spawn loop (`while (boxX % blockSize !== 0 || ...)`), producing the same guarantee without a dedicated helper. On top of this, a generic sampling routine—`createItemInStartView(avoidList)` for opening-area spawns and `createItemInMidArea(avoidList)` for mid-map spawns—iterates up to 300–400 times, each iteration drawing fresh random coordinates within a region-appropriate bounding box and rejecting any candidate that (a) overlaps a wall tile (`intersectsWall(item)`), (b) intersects the player's hitbox, or (c) intersects any object in the supplied `avoidList`. Placement order threads the exclusion list forward: in Level 2, `createBox([])`, then `createLight([box])`, then `createRing([box, lightItem])`—so each new item automatically avoids every prior one without the caller having to manage state. If the loop exhausts its retry budget—rare, but possible in dense mazes—the routine returns a hard-coded safe fallback (`new Rect(128, 128, blockSize, blockSize, true)`) so the game never fails to start.

Enemy placement uses a similar but stricter loop: each candidate must avoid walls, the player, *and* every previously-placed pickup and the exit door. Because enemies are placed only after all pickups are finalised, a simple `while` loop that re-samples on any collision is sufficient, and the exclusion list is effectively the entire set of critical game objects. Portal placement in Level 3 uses a two-stage strategy: first 100 attempts jittered around four hand-picked target coordinates (so the portal network roughly preserves its intended topology), then—if any of those four fail—a fallback 200-attempt pass across the full map, constrained to lie outside the player's starting view (`isInStartView(px, py)`) to avoid a portal appearing inches from the spawn.

### 5.2.3 Reflections and Extensibility

Decoupling level *content* from level *layout* via this constraint-based spawner means that new item types or enemy archetypes can be added by plugging into the existing `createItemIn*` helpers and extending the `avoidList` threading—no hand-placement required. The bounded-retry pattern is also self-documenting about its own failure modes: the fallback position and the iteration cap make the worst-case behaviour explicit, which made debugging "impossible seed" edge cases straightforward during playtest. Future work could extend this into semantic constraints (e.g., guaranteeing at least one torch lies within a Manhattan-distance of 8 tiles from the start in Dark Maps, or weighting enemy density by district theme) without touching the core sampling loop, since those would simply be additional predicates evaluated inside the candidate-rejection step.

## 5.3 Boss AI: State-Aware Pursuit and Fan-Shot Attack

### 5.3.1 Objectives and Motivations

The final boss encounter in Level 3 had to feel qualitatively different from the wandering mob enemies the player had dispatched up to that point. Random movement and single-shot projectiles—adequate for ambient threat—would have produced an anticlimactic finale. The brief was instead to design an AI that actively chased the player, pressured positional play, and punished standing still, while integrating cleanly with the existing projectile physics system written for regular enemies.

### 5.3.2 Distance-Gated Chasing and Three-Shot Fan Spread

The `Boss` class maintains two pieces of state: health (`bossMaxHp = 180`) and a countdown timer (`shootTimer`, reset to `bossShootCooldown = 1.6` seconds after each volley). Every `update(dt)` tick computes the vector from the boss to the player and its Euclidean distance, then branches on two distance thresholds that together define the boss's behavioural envelope:

- **Chase phase** (`dist > 130`): the boss normalises the player-vector and moves along it at `bossSpeed = 36` px/s scaled by `dt`. A simple write-and-revert collision check attempts the move, then reverts `left`/`top` to their pre-move values if any wall intersection is detected. This keeps the boss physically bounded by the same tile grid the player uses, without any separate pathfinding subsystem.

- **Attack phase** (`dist < 340`): the shoot timer ticks down; when it expires, the boss fires `fireFanShot(px, py)` and resets the timer. The fan shot computes `baseAngle = atan2(dy, dx)` toward the player and emits three `HostileProjectile` instances at `baseAngle - 18°`, `baseAngle`, and `baseAngle + 18°`—a total spread of 36 degrees. Each projectile uses precomputed velocity (`vx = cos(a) * 105`, `vy = sin(a) * 105`) rather than axis-aligned movement, enabling diagonal trajectories that the existing `HostileProjectile` update step handles uniformly with all other enemy shots.

The two phases overlap: within 130–340 px, the boss both chases and fires, which is where the fight is most pressured. Beyond 340 px the boss chases in silence; inside 130 px it stops chasing but keeps firing, meaning a player who tries to juke-and-melee encounters a wall of projectiles at point-blank range. Contact damage (`bossContactDamage = 16`) on intersection with the player's hitbox closes the final loophole and rewards distance management.

### 5.3.3 Reflections and Extensibility

What made this implementation tractable was that no new subsystems were needed: movement reused the existing axis-based collision pattern; projectiles reused `HostileProjectile`, already written for mob enemies; targeting reused the `atan2`-based angle computation already used by the player's omnidirectional crossbow. The boss is therefore roughly 90 lines of new code rather than a parallel engine, and its distance thresholds are tuned as named constants (`bossSpeed`, `bossShootCooldown`, etc.) at the top of the file, making balance passes quick. The same skeleton would naturally support phase-two behaviours (swap fan-shot for a circular burst below 50% HP), teleport abilities (lean on the portal-search helper from Section 5.2), or multi-target spread angles (change the `[−spread, 0, +spread]` list to five or seven entries)—all as incremental extensions rather than rewrites.

# 6. Evaluation

The game was evaluated during its prototype stage, enabling us to identify and fix usability issues, navigation problems, and technical bugs during development. Since the game did not yet include the final Bristol-themed visuals, this allowed us to focus on evaluating the core gameplay mechanics without the influence of visual or narrative elements. 

We used a mixed-methods approach, combining quantitative data from the System Usability Scale (SUS) with qualitative feedback from Think Aloud sessions. This helped us understand how well users could complete tasks and their overall experience during gameplay.


## 6.1 Qualitative Evaluation: Think Aloud

To explore how players understood the game and identify misunderstandings or unclear game concepts, we conducted Think Aloud (TA) sessions (Pellicone et al., 2022). Ten participants were recruited using convenience sampling from our weekly workshops, allowing us to receive quick feedback during development without requiring a controlled experiment. We asked participants to verbalise their thoughts and decision-making process while navigating the maze and completing tasks such as finding items and reaching the exit.

The main issues were related to map design, controls, and game mechanics.

* **Map Design:**

  Most users liked the maze's layout and its "spacious route", suggesting that the navigation structure was clear and easy to understand.         However, many noted that the environment felt empty and repetitive, resulting in reduced user engagement. This supported our planned use of     Bristol-themed visual elements, including landmarks and graffiti-style textures, to help players recognise different areas of the map.
 
* **Controls:**

  A key issue was identified with input handling. The Enter key, used to start the game, only worked when the mouse cursor was positioned over    the game window. This made the controls unreliable and harder to use.

  This was fixed by ensuring the game window automatically captures keyboard input, meaning that the keyboard controls remain active during       gameplay.

* **Game Mechanics:**

  Participants suggested several improvements to the game mechanics, some of which matched features we already planned to implement, such as      adding item descriptions to improve understanding and engagement.

  Participants struggled to know when they were running out of time and needed assistance when they were under pressure, meaning the clock at     the top of the screen alone was not sufficient. Hence, we decided to add a hint system to help locate the exit when time is running low, as     well as a warning sign when 10–20 seconds remain. 


## 6.2 Quantitative Analysis: System Usability Scale (SUS)

To ensure the game was engaging, it was important that usability did not negatively affect player experience. If a game is too easy or unnecessarily difficult, it can reduce replayability by causing players to lose interest or become frustrated (Sweetser & Wyeth, 2005; Lazzaro, 2004). Therefore, we evaluated whether the game was easy to use while being appropriately challenging. 

We used SUS to measure how easily the participants could learn and interact with the game. Ten participants (P1-P10), recruited using convenience sampling, completed gameplay tasks such as collecting items and finding the exit before filling out the SUS questionnaire. 


<p align="center">
  <b>Figure ?: </b>
  <i>Bar graph displaying the System Usability Scale (SUS) results </i> <br>

<img src= "https://github.com/UoB-COMSM0166/2026-group-27/blob/b2d580e4e40cc95ca773bf0637cdd362cdd939ca/readme%20docs/6.%20SUS%20graph.png" width = "100%">

</p>

The average SUS score was 90.75/100, indicating a high level of usability.

  * Positive usability statements scored highly, such as “Learn quickly” (Q7 = 4.8/5) and “Well integrated” (Q5 = 4.7/5), suggesting that the     game was intuitive. 
 
  * Negative usability statements, such as “Too complex” (Q2 = 1.4) and “Need technical support” (Q4 = 1.2), received low scores, indicating        that users did not find the game too difficult or confusing.

  * The lowest positive score was for “Felt confident” (Q9 = 4.3/5). While still high, this indicates that some players may require clearer
    in-game feedback to feel fully confident in their gameplay decisions. 

Overall, these results suggest that usability is unlikely to negatively impact the gameplay experience. 

## 6.3 Code Testing

To ensure the prototype remained stable during user evaluations, we performed several rounds of technical testing to verify the game logic before participants accessed the build.

* Input Handling Tests: We performed unit tests on the keyboard event listeners to ensure consistent response times. This led to the identification of the focus-handling bug regarding the "Enter" key. We subsequently modified the code to ensure the game canvas automatically captures input focus upon loading.

* Mapping and Coordinate Logic: We verified the mathematical scaling of the small map by comparing the player’s (x,y) world coordinates against the UI markers. This was done to ensure the "green points" appeared in their correct relative positions on the map without any lag or offset issues.

* Collision Detection: We conducted boundary testing by attempting to move the character through all environment assets and map borders. This ensured that players could not clip through walls or unintentionally exit the "spacious route" and fall outside of the world geometry.

* Visual Stability: We tested a "Windows pointer" implementation to address camera jitter. By running the game at various frame rates, we confirmed that camera movement remained stable across different hardware performance levels

* Integration Testing: Following the addition of "bounce pads" and the rewarding system, we re-tested the level flow to ensure these new mechanics did not interfere with existing game-state variables or exit gate triggers.

* Input and Combat Logic: We conducted extensive testing on the player’s combat mechanics. Originally, the system was restricted so the character could only shoot in the direction they were moving; however, we refactored the aiming logic to allow for omnidirectional shooting, enabling the player to defend themselves regardless of their movement vector.


# 7. Process 

- 15% ~750 words

- Teamwork. How did you work together? What tools and methods did you use? Did you define team roles? Reflection on how you worked together. Be honest, we want to hear about what didn't work as well as what did work, and importantly, how your team adapted throughout the project.


# 8. NEW: Sustainability, ethics and accessibility (10% 750 words)
- Evidence of the impact of your game across the environment and two other areas: environmental + 2 of the following: Social, Economical, Technical, Individual

When we were developing Lost in Bristol, we didn't just want to focus on the "fun" factor but also wanted to think about the footprint a game like this leaves behind. Balancing the intensity of our "Twists" with the responsibility of creating a modern project meant looking at how we impact the environment, the individual players and the technical landscape.

## Environmental Impact: Digital Efficiency
As student developers, we realised that even if our game is digital, there are actual environmental costs associated with it, mostly due to player device usage and energy consumption during production.

-Optimisation as Sustainability: To make sure the game doesn't require expensive, power-hungry GPUs to run, we gave priority to asset optimisation and efficient programming. We have decreased the wattage needed for a typical play session by lowering the computational load required to render our "Dark Maps" and urban districts.

-Cloud & Storage: We also maintained small file sizes. A tiny but significant step toward lowering the carbon footprint of digital distribution, smaller builds result in less energy being consumed during downloads and less server space being needed on hosting platforms.

## Individual Impact: Cognitive Load & Accessibility
We also focused on the player's mental and physical experience, especially given our high-stress mechanics like the Hostile Environment and Dynamic Visibility.

-Accessibility in Navigation: We realized that "Dark Maps" could be frustrating or even for players with visual impairments or high anxiety. To mitigate this, we implemented adjustable "Flashlight" intensity and high-contrast map pick-ups.

-The Stress Balance: While the game is designed to be high-stakes, we wanted the Individual experience to be one of tactics and growth, not genuine distress. We included clear safe zones portals to give players a mental breather, ensuring that the difficulty feels like a fair challenge rather than an overwhelming burden on their well-being and they actually enjoy.


## technical 
## social

# 9. Conclusion

- 10% ~500 words

- Reflect on the project as a whole. Lessons learnt. Reflect on challenges. Future work, describe both immediate next steps for your current game and also what you would potentially do if you had chance to develop a sequel.

# 10. Contribution Statement



<table align="center" width="100%">
  <tr>
    <th>Contributor</th>
    <th>Contribution</th>
  </tr>

  <tr>
    <td>Suki Dai</td>
    <td>1.0</td>
  </tr>

  <tr>
    <td>Thanusha Gorva</td>
    <td>1.0</td>
  </tr>

  <tr>
  <td>Liz Chen</td>
  <td>1.0</td>
  </tr>

  <tr>
  <td>Yizhou Pan</td>
  <td>1.0</td>
  </tr>

  <tr>
  <td>Keyu Zhou</td>
  <td>1.0</td>
  </tr>

  <tr>
  <td>Maniza Singh</td>
  <td>1.0</td>
  </tr>

  </table>

  

- Provide a table of everyone's contribution, which *may* be used to weight individual grades. We expect that the contribution will be split evenly across team-members in most cases. Please let us know as soon as possible if there are any issues with teamwork as soon as they are apparent and we will do our best to help your team work harmoniously together.

# 11. NEW: AI statement (250 words)

- summarise your team's use of AI ao we know where to give you credit for work done
- PLEASE WRITE THE REPO YOURSELF - NO AI USE FOR WRITING THE REPO 



# 12. References
apa 7 referencing style

### Additional Marks

You can delete this section in your own repo, it's just here for information. in addition to the marks above, we will be marking you on the following two points:

- **Quality** of report writing, presentation, use of figures and visual material (5% of report grade) 
  - Please write in a clear concise manner suitable for an interested layperson. Write as if this repo was publicly available.
- **Documentation** of code (5% of report grade)
  - Organise your code so that it could easily be picked up by another team in the future and developed further.
  - Is your repo clearly organised? Is code well commented throughout?

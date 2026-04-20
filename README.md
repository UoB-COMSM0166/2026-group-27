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

-Lost in Bristol is an immersive, third-person maze-puzzle game that challenges players to navigate a stylized, labyrinthine recreation of Bristol’s iconic urban landscape. Developed as a tribute to the city’s unique cultural identity, the game tasks players with escaping a series of increasingly complex districts within a strict time limit. The project’s core objective was to blend traditional maze-solving mechanics with high-stakes survival elements and environmental storytelling.

-The "Twist": Survival and Strategy

What makes Lost in Bristol novel is its departure from passive exploration. While most maze games focus solely on pathfinding, our implementation introduces three "Twists" that heighten the difficulty:

* Hostile Environment: The city is not empty; players must dodge active "enemies" that deplete their health upon contact. This transforms the maze from a spatial puzzle into a tactical survival challenge where health management is as critical as navigation.

* Teleportation: To counter the maze’s complexity, we implemented transportation through portals scattered around the map. These allow for rapid repositioning, adding a layer of strategic "risk vs. reward" as players can decide whether to go through a portal or stick to their current path.

* Dynamic Visibility: In specialised "Dark Maps," the gameplay shifts entirely. Players must find and manage a torch and physical map pick-ups to see, forcing them to rely on memory and limited visual cues rather than simple trial and error.



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
  <td>A fast-paced tennis-style game where players control a paddle to keep the ball in play. Difficulty increases over time with faster speeds, power-ups, and dynamic elements to create an addictive, replayable experience.</td>
  <td>
      -Balancing game speed and difficulty progression
      -designing engaging AI
      -integrating power-ups smoothly
      -ensuring performance at high speeds
  </td>
</tr>
  <tr>
    <td>Game Idea 3</td>
    <td></td>
    <td></td>
    <td></td>
  </tr>

</table>

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

From this, we focused on key stakeholders such as players, developers, and testers, which influenced our design decisions throughout development and ensured the game remained aligned with user needs (Pirozzi, 2019). 

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


## 5.1 System Architecture:

The flow between the menu, active gameplay and game-over screens is controlled by the state-driven structure used in the game's construction. We used a Delta-Time technique to make sure the game runs at the same speed on all computers. This determines how much time has passed between frames and scales movement appropriately. Without it, the game would run too quickly on powerful computers and too slowly on slower laptops; our technique guarantees that every player has an equal and constant experience.

## 5.2 Challenge 1: Atmospheric Vision Masking & Combat Syncing

-A major goal was to create an "Atmospheric" feel where the player’s vision is restricted by fog. The technical challenge was creating this visual effect without slowing down the game’s performance.

- The Solution: Overlay Masking
  Instead of calculating light for every single tile in the maze (which is very tough on a browser), we used a        "top-  down overlay" method. We created a dark layer that covers the entire screen except the circle around the     player.
  
  Impact: Because the computer only needs to render one image instead of hundreds of separate light sources, this     method is extremely efficient. Even in a challenging maze, it enabled us to keep up a fluid 60 frames per second.

- The Solution: Distance-Based Targeting
  We also had to ensure the combat mechanics felt fair. If the player's gun could auto-target enemies hidden deep     in the fog, the "scary" atmosphere would be ruined. We restricted the combat engine so it only detects enemies      once they enter the player's lit area. This kept the gameplay balanced and logically consistent with what the       player can actually see.


## 5.3 Challenge 2: Fair Spawning in a Random Maze
Because our maze is created at random each time you play, there was a significant chance that an essential object (like the torch) would emerge in an inaccessible location or that the player would become trapped behind a wall.

-The Solution: Spatial Validation
We developed a "Check-and-Repeat" system for placing items.The game initially determines whether a coordinate overlaps a wall before attempting to place an object. If it happens, the game immediately attempts another location until it locates a clean, traversable area, discarding the previous one.

Impact: This avoids "broken" game seeds, in which the player can become irritated by an important item missing or an unattainable exit.

-The Solution: Safe Zones and Grid Alignment
We built a "Safe Zone" around the starting position to keep the player from dying right away. In the player's first view, enemies are prohibited from spawning. Additionally, we made all objects "snap" to a 32-pixel grid so that neither the player nor the adversary would ever be trapped on a wall's corner while traveling.

## 5.4 Team Integration: Boss Mechanics
For the final BOSS encounter, we moved away from simple random movement. We used mathematical patterns to allow the boss to "aim" at the player. By calculating the angle between the boss and the player’s position, we created a "fan-shot" attack where multiple projectiles are fired in a arc. This created a challenging finale that required the player to use all the movement and combat skills they learned throughout the game.


# 6. Evaluation

The evaluation of Lost in Bristol followed an iterative design approach. The game was tested in a prototype stage, allowing us to identify and fix usability issues, navigation problems, and technical bugs during development before releasing the game. 


Although the game did not yet include the final Bristol-themed visuals, this allowed us to focus on evaluating the core gameplay mechanics without the influence of visual or narrative elements.

We used a mixed-methods approach, combining quantitative data from the System Usability Scale (SUS) with qualitative feedback from Think Aloud sessions. This allowed us to understand how well users could complete tasks and their overall experience during gameplay.


## 1. Qualitative Evaluation: Think Aloud

During the Think Aloud (TA) sessions, we asked participants to verbalise their thoughts and decision-making process while navigating the maze and completing tasks such as finding items and reaching the exit. This method helps us understand what users are thinking during gameplay, allowing us to identify misunderstandings, and unclear game elements (Pellicone et al., 2022). 

Ten participants were recruited using convenience sampling from our weekly workshops. This was suitable for early-stage testing, allowing us to receive quick feedback during development without needing a formal controlled study.

We grouped the feedback into common themes to identify repeated issues across different users. The main themes were map design, technical issues, and game mechanics.

* Map Design:

Most users liked the maze's layout and its "spacious route", suggesting that the navigation structure was clear and easy to understand. However, many noted that the environment felt empty and repetitive. 

This indicated that while the layout supported navigation effectively, the prototype lacked visual detail. This reduced engagement and made spatial awareness less intuitive. This supported our planned use of Bristol-themed visual elements, including landmarks and graffiti-style textures, to improve visual engagement and help players recognise different areas of the map.

 
* Technical Glitches:

A key issue was identified with input handling. The Enter key, used to start the game, only worked when the mouse cursor was positioned over the game window. This reduced usability and made input behaviour unreliable. 

This was fixed by improving input focus handling so keyboard controls are always active during gameplay, improving control reliability.
   
* Game Mechanics:

Participants suggested several improvements to the game mechanics, some of which matched features we already planned to implement, such as a reward system and item descriptions to improve feedback and engagement.

Participants also suggested adding a hint system to help locate the exit when time is running low, as well as a warning when you are about to run out of time (e.g. 10–20 seconds remaining). These suggestions showed that the players needed clearer timing feedback, especially when players are under pressure. 


## 2. Quantitative Analysis: *System Usability Scale (SUS)*
We collected data from 10 participants (P1-P10) who performed tasks like finding green points on the map.

### System Usability Scale (SUS):
 Our average SUS score was 90.75/100, which is an "A" grade.
 
 * Learning Curve: The highest score was for "Learn quickly" (Q7) at 4.80/5, meaning the game is very intuitive.
 
 * System Integration: Users felt the game was "Well integrated" (Q5) with a score of 4.70/5.
 
 * Confidence: The lowest positive score was for "Felt confident" (Q9) at 4.30/5. This tells us that even though they could play,     they might need more visual or timing feedback to feel "sure" about their actions.
 
### NASA Task Load Index (NASA TLX):
The NASA TLX measured how hard the users had to work. Our average workload was 40.1/100, which is a low-to-moderate level.

* Time Pressure: 'Temporal Demand' was our highest stress factor at 50.5/100. This matches the feedback that users felt rushed or confused by the map.

* Effort vs. Performance: Users felt they did a good job (Performance: 76.0/100) but had to put in a fair amount of effort (51.0/100) to get there.

* Low Frustration: At 27.0/100, the frustration levels were very low, showing that the current prototype isn't annoying to play.

## 4.Code Testing:

To ensure the prototype remained stable during user evaluations, we performed several rounds of technical testing to verify the game logic before participants accessed the build.

* Input Handling Tests: We performed unit tests on the keyboard event listeners to ensure consistent response times. This led to the identification of the focus-handling bug regarding the "Enter" key. We subsequently modified the code to ensure the game canvas automatically captures input focus upon loading.

* Mapping and Coordinate Logic: We verified the mathematical scaling of the small map by comparing the player’s (x,y) world coordinates against the UI markers. This was done to ensure the "green points" appeared in their correct relative positions on the map without any lag or offset issues.

* Collision Detection: We conducted boundary testing by attempting to move the character through all environment assets and map borders. This ensured that players could not clip through walls or unintentionally exit the "spacious route" and fall outside of the world geometry.

* Visual Stability: We tested a "Windows pointer" implementation to address camera jitter. By running the game at various frame rates, we confirmed that camera movement remained stable across different hardware performance levels

* Integration Testing: Following the addition of "bounce pads" and the rewarding system, we re-tested the level flow to ensure these new mechanics did not interfere with existing game-state variables or exit gate triggers.

* Input and Combat Logic: We conducted extensive testing on the player’s combat mechanics. Originally, the system was restricted so the character could only shoot in the direction they were moving; however, we refactored the aiming logic to allow for omnidirectional shooting, enabling the player to defend themselves regardless of their movement vector.


# 7. Process 

- 15% ~750 words

- Teamwork. How did you work together, what tools and methods did you use? Did you define team roles? Reflection on how you worked together. Be honest, we want to hear about what didn't work as well as what did work, and importantly how your team adapted throughout the project.


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

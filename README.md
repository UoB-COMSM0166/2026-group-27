# 2026-group-27

 
<p align="center">
<img src= "https://github.com/UoB-COMSM0166/2026-group-27/blob/5c7512fc3f6da78114246c7d17cc2bf4fb7299ef/5.%20readme%20docs/01.%20banner.gif" width= "150%">
</p>

game set up instructions and link to play game. [Here is our game](https://uob-comsm0166.github.io/2026-group-27/)

# Video Demonstration

# Table of Contents  

1. [Our Group](https://github.com/UoB-COMSM0166/2026-group-27/tree/main#1-our-group) 
2. [Introduction](https://github.com/UoB-COMSM0166/2026-group-27/tree/main#2-introduction)
3. [Requirements](https://github.com/UoB-COMSM0166/2026-group-27/tree/main#3-requirements)
4. [Design](https://github.com/UoB-COMSM0166/2026-group-27/tree/main#4-design)
5. [Implementation](https://github.com/UoB-COMSM0166/2026-group-27/tree/main#5-implementation)
6. [Evaluation](https://github.com/UoB-COMSM0166/2026-group-27/tree/main#6-evaluation)
7. [Process](https://github.com/UoB-COMSM0166/2026-group-27/tree/main#7-process)
8. [Sustainability, Ethics, and Accessability](https://github.com/UoB-COMSM0166/2026-group-27/tree/main/README.md#8-sustainability-ethics-and-accessability)
9. [Conclusion](https://github.com/UoB-COMSM0166/2026-group-27/tree/main#9-conclusion)
10. [Contribution Statement](https://github.com/UoB-COMSM0166/2026-group-27/tree/main#10-contribution-statement)
11. [AI Statement](https://github.com/UoB-COMSM0166/2026-group-27/tree/main/README.md#11-ai-statement)
12. [References](https://github.com/UoB-COMSM0166/2026-group-27/tree/main#12-references) 
13. [Appendices](https://github.com/UoB-COMSM0166/2026-group-27/tree/main#13-appendices)

# 1. Our Group

<p align="center">
  <b>Figure 1: </b>
  <i>Group Photo!</i> <br>
  
<img src="https://github.com/UoB-COMSM0166/2026-group-27/blob/c53194505bf720b768c38d7a6e9e03655f07a9c8/5.%20readme%20docs/01.%20group%20photo.jpeg" width="75%">
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
  <i>Paper Prototype for Lost in Bristol 
    developed during Workshop 3 </i> <br>
  </p>

<p align="center">
<img src= "https://github.com/UoB-COMSM0166/2026-group-27/blob/f6eb2dd289198ac83513909ae7b6078e33eb18dc/5.%20readme%20docs/03.%20paper%20protoype%20lost%20in%20bristol.gif" width= "25%">
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
<img src= "https://github.com/UoB-COMSM0166/2026-group-27/blob/5c7512fc3f6da78114246c7d17cc2bf4fb7299ef/5.%20readme%20docs/03.%20onion%20model.jpg" 
 width="100%">
</p>

**The Product:** Lost in Bristol video game.

**The System:** Stakeholders involved in developing the game, including developers, designers, and project managers.

**The Containing System:** The main users of the game, such as players, who interact with and experience the gameplay.

**The Wider Environment:** External stakeholders such as assessors, testers, and Computer Science students, who evaluate or learn from the product, and influence its development. 


## 3.3 Epics & User Stories

To define the core features of our game, epics and user stories were created. 

Epics were used to represent core gameplay features, such as navigation, item collection, and combat, which were then made into user stories using Cohn’s format: “As a [user], I want [goal] so that [reason]” (Cohn, 2004). This helped us develop features step by step while focusing on user needs, rather than creating goals that may not benefit the game.

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
    <td>Character Customisation</td>
    <td>"As a player, I want to choose between different characters, so that I can personalize my gaming experience." 
    </td>
    <td>
- Given a character is selected <br>
      <br>
- When the game begins <br>
      <br>
- Then the chosen character is displayed in the game <br>
      <br>
- And the character does not affect gameplay mechanics <br>
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

- Describe the implementation of your game, in particular highlighting the TWO areas of *technical challenge* in developing your game.

## 5.1 Spawning System 

A key challenge we faced was ensuring that game elements such as enemies, items, and portals spawned randomly but also fairly. Random placement could lead to issues such as items spawning inside the maze walls or enemies spawning at the player’s spawn point, causing instant death, making the game unplayable. 

To prevent this, we implemented a controlled random spawning system, in which the game first checks whether a position is valid before placing any object. All spawn positions are aligned to a grid (32 px tiles) using a snapping function, ensuring objects are positioned correctly within the maze without overlapping: `snapToGrid(value) = floor(value / blockSize) * blockSize` 

The system then generates random positions until a valid one is found. A position is only accepted if it does not overlap with walls, the player’s character, or any previously placed objects. This is checked using collision detection, along with an exclusion list that stores already placed objects. This prevents overlap and ensures that the objects are evenly distributed across the maze.  Enemy placement follows a similar approach but includes stricter checks to ensure they do not overlap with the player’s starting position, pickups, or the exit. 

 * Collision detection: 
   `if (intersectsWall || intersectsPlayer || intersectsObject) reject;`

 * Exclusion list: 
   `avoidList.includes(object)`

To prevent the system from getting stuck in rare cases where no valid position is found, a maximum number of attempts is set. If no valid position is found within this limit, a fallback position is used to ensure the game still generates a complete and playable map:

                                       while (!validPosition) {
                                          x = random(...)
                                          y = random(...)
                                          validPosition = checkCollision(x, y)
                                          }

These features maintain randomness while ensuring all spawns remain fair and playable, improving replayability for players. 


## 5.2 Final Boss: Movement and Combat System (shorter version - need to add code)

Another difficulty we faced was making the final boss in level 3 more challenging than the regular enemies, with predictable movements which makes it relatively easy to avoid. If the final boss behaved the same way, there would be no increase in difficulty compared to previous levels, resulting in an underwhelming experience for the player. Hence, the boss was designed to actively follow and attack the player while reusing existing systems in the game.

To address this, we implemented a distance-based behaviour system. The boss calculates its distance from the player and changes its behaviour depending on how far away the player is, making the battle less predictable and challenging without requiring a complex AI system. 

When the player is within attack range (130-340 px), the boss becomes more aggressive by moving towards the player while attacking simultaneously, increasing combat pressure. A timer (1.6 seconds) controls how often the boss shoots, ensuring consistent behaviour across different frame rates. When the timer reaches zero, the boss fires three projectiles towards the player. This makes the attacks harder to dodge, as it covers a larger area compared to a single projectile (Figure ).

  * Boss Firing Timer:
  
          this.shootTimer -= dt;
          if (dist < 340 && this.shootTimer <= 0) {
              this.fireFanShot(px, py);
              this.shootTimer = bossShootCooldown;
          }

<p align="center">
  <b>Figure ?: </b>
  <i>Boss Movement & Attack</i> <br>
 
<img src= "https://github.com/UoB-COMSM0166/2026-group-27/blob/f6eb2dd289198ac83513909ae7b6078e33eb18dc/5.%20readme%20docs/05.%20boss%20move%20%2B%20attack.gif" width= "40%">
</p>
<br>

At very close range (distance < 130 px), the boss stops moving but continues attacking, making it harder to avoid attacks due to the close proximity (Figure ). Contact damage is applied when the player touches the boss, making the fight more challenging.


<p align="center">
  <b>Figure ?: </b>
  <i>Boss Attack with no movement </i> <br>
 
<img src= "https://github.com/UoB-COMSM0166/2026-group-27/blob/f6eb2dd289198ac83513909ae7b6078e33eb18dc/5.%20readme%20docs/05.%20boss%20attack%20only.gif" width= "40%">
</p>
<br>


These features make the boss fight more challenging compared to the enemies from previous levels, as the player is forced to constantly move, focus on their position and distance from the boss and time their attacks, rather than simply avoiding a predictable enemy. 

# 6. Evaluation

The game was evaluated during its prototype stage, enabling us to identify and fix usability issues and technical bugs during development. Since the game did not yet include the final Bristol-themed visuals, this allowed us to focus on evaluating the core gameplay mechanics without the influence of visual or narrative features. 

We combined quantitative data from the System Usability Scale (SUS) with qualitative feedback from Think Aloud (TA) sessions. This helped us understand how well users could complete tasks and their overall experience during gameplay.


## 6.1 Qualitative Evaluation: Think Aloud (TA)

During the TA tests, we asked participants to verbalise their thoughts and decision-making process while navigating the maze and completing tasks such as finding items and reaching the exit. This helped us identify unclear game concepts from a player’s perspective (Pellicone et al., 2022). 

Ten participants were recruited using convenience sampling from our weekly workshops, allowing us to receive quick feedback without requiring a controlled experiment.

We grouped the feedback into common themes to identify repeated issues across different users. The main themes were map design, technical issues, and game mechanics.

* Map Design:

  Most users liked the maze's layout and its "spacious route", suggesting that the navigation structure was clear and easy to understand.         However, many noted that the environment felt empty and repetitive, indicating a lack of visual detail in the prototype, which led to reduced   user engagement. This supported our planned use of Bristol-themed visual elements, including landmarks and graffiti-style textures, to          improve visual engagement and help players recognise different areas of the map.  <br>


* Technical Glitches:

  A key issue was identified with input handling. The Enter key, used to start the game, only worked when the mouse cursor was positioned over    the game window. This made the controls unreliable and harder to use.

  This was fixed by ensuring the game window stays active during gameplay, so keyboard inputs like the Enter key are always detected.  <br>
  

* Game Mechanics:

  Participants suggested several improvements to the game mechanics, some of which matched features we already planned to implement, such as      adding item descriptions to improve understanding and engagement.

  Participants also suggested adding a hint system to help locate the exit when time is running low, as well as a warning when you are about to   run out of time (e.g. 10–20 seconds remaining). This indicated that players needed clearer feedback when they are under pressure. 


## 6.2 Quantitative Analysis: System Usability Scale (SUS) - editing this section - thanusha

The SUS was used to evaluate the usability of the game. If a game is too easy, it can become uninteresting, while unnecessary difficulty or frustration can reduce replayability (Sweetser & Wyeth, 2005). 

Ten participants completed gameplay tasks such as collecting items and finding the exit before filling out the SUS questionnaire. (Raw data: Appendix ?)


<p align="center">
  <b>Figure ?: </b>
  <i>Bar graph displaying SUS results </i> <br>

<img src= "https://github.com/UoB-COMSM0166/2026-group-27/blob/c841dd521269626e505282d43f6ca604df28f281/5.%20readme%20docs/06.%20SUS%20graph%20final.png" width = "100%">

</p>



## 6.3 Code Testing

We used black-box testing to evaluate core gameplay features. This involved testing systems such as movement and item collecting, ensuring they worked as intended in different conditions. We chose this test as it focuses on how the game works from a player's perspective rather than the developer’s perspective, which involves looking at the internal code of the game. 

We ensured the test assessed normal, boundary, and error cases (Appendix ?). Each test had a specific input and expected outcome. Boundary cases tested situations at the limits of the system, such as having just enough coins to make a purchase. Error cases ensured the game handled invalid actions correctly, such as attempting to open a door without a key. 

However, as black-box testing does not consider the internal code, some issues were not identified during these tests. For example, an input bug with the Enter key was discovered during the Think Aloud tests ([Section 6.1](https://github.com/UoB-COMSM0166/2026-group-27/tree/main#61-qualitative-evaluation-think-aloud-ta)). This highlights the importance of combining both code structure testing and player-focused evaluation to produce more reliable results. 


# 7. Process 

- 15% ~750 words

- Teamwork. How did you work together? What tools and methods did you use? Did you define team roles? Reflection on how you worked together. Be honest, we want to hear about what didn't work as well as what did work, and importantly, how your team adapted throughout the project.

# 7. Process

## 7.1 Team Composition and Workflow

Our team of six divided responsibilities across four axes. Suki, Yizhou, and Liz led on programming, UI, level design, and testing—implementing the three levels, the main menu, the shop, and the character rendering pipeline, and shaping the moment-to-moment gameplay through decisions about maze layouts, enemy density, item placement regions, and pacing thresholds. Liz additionally led on storyline development, weaving the Bristol-set narrative that frames the three levels and gives them thematic continuity. Maniza and Thanusha led on written content, visual art, and testing, producing the pop-up text, instruction screens, hand-illustrated pickup icons, and the aged-bronze UI frames, while also providing structured feedback on difficulty and usability across playthroughs. Yuki led on audio design and testing. Roles were not strictly rigid—members stepped into adjacent areas when deadlines approached—but having a lead for each area meant every decision had a clear owner and no subsystem was left in limbo.

The principal collaboration tool was a shared GitHub repository, used as the single source of truth for code and assets. All programmers committed directly to the repository rather than emailing files around, making it possible to track who changed what, roll back broken commits, and merge parallel work. Day-to-day coordination happened in a group chat, where urgent questions, blockers, and asset iterations were discussed; higher-level decisions—such as overall art direction or narrative connections between levels—were deferred to regular team meetings so everyone had context. Testing happened in batches rather than as a separate phase: once a subsystem was feature-complete, multiple team members would each run through it and report issues back into the chat, which let the programmers prioritise fixes against a grounded list of observations rather than their own assumptions about what might break.

## 7.2 What Worked and What Didn't

The most durable strength of the project was its conceptual cohesion. The Assassin's Creed–inspired aesthetic, combined with a Bristol-set exploration narrative, gave the content team clear direction and allowed the programmers to reuse a consistent visual language across menus, levels, and pickups. Player feedback on the art direction—the hand-illustrated lock and key icons, the aged-bronze UI frames, and the moody lighting—has been uniformly positive. Technically, the gameplay runs fluidly: the delta-time physics described in §5.0, combined with the single off-screen fog buffer in §5.1, kept performance stable even in Level 3 where projectiles, a pursuing boss, and multiple portals are all active simultaneously.

The flip side of ambition on the art side was asset weight. The hand-painted character sprites—front, back, left, right views for three playable characters, with three-frame walk animations for two of them—ran to a large combined file size, and each iteration required re-exporting and reviewing the full set. Small tweaks cascaded into noticeable delays, and we found ourselves rebuilding asset sets the week before a milestone. In retrospect, we should have finalised the art style with a single test character before committing to full sprite sheets, so that style corrections happened on one character rather than three.

Code issues were equally instructive. The most visible recurring bug was that the player character would occasionally "freeze" mid-level—unresponsive to keyboard input despite the game continuing to run. The root cause turned out to be state leakage across our `moving`, `pause`, and `keyReleased` flags: when the window lost focus during a keypress, `keyReleased` never fired, and subsequent input was swallowed. We also lost time on Git workflow issues early on, when parallel edits to shared files such as `playerData.js` produced merge conflicts that, resolved incorrectly, silently reverted a teammate's work. Each incident was recoverable, but together they reinforced how fragile a small multi-file JavaScript project becomes without disciplined version control.

## 7.3 Adaptation and Reflection

The pattern in our setbacks was that they were almost always coordination failures rather than technical-ability failures: nobody lacked the skill to solve any individual problem, but our processes for catching problems early were thin at the start. We adapted on several fronts. We began pulling the latest `main` branch before every work session, which sharply reduced merge conflicts. We adopted a convention of announcing in the group chat "I'm editing X now" for frequently-touched files, to avoid two people rewriting the same routine in parallel. When the character-freezing bug recurred, we paired on debugging instead of each suspecting our own subsystem in isolation, and the fix—resetting `moving` inside `keyReleased`—was produced in under an hour once the right two people sat down together.

The project succeeded because the team allowed its own working methods to evolve. We did not start with a formal task board or disciplined branching conventions, and imposing all of those in week one would probably have produced more friction than it resolved. Instead, we adopted each habit in direct response to a concrete problem we had just experienced, so everyone already understood *why* the new rule existed by the time it was introduced. If we were to start again, we would make two changes early: agreeing on a small "house style" for art and UI before any sprites are drawn, so that asset rework is limited; and establishing a branch-per-feature Git workflow from day one, rather than committing directly to `main`. What we would preserve is the broad division of roles across code, narrative, content and art, and audio lines, the integration of testing into every role rather than treating it as a separate phase, and the informal culture of covering for each other during difficult weeks—all of which were, in the end, more valuable than any tooling choice.


# 8. Sustainability, Ethics and Accessibility (10% 750 words)
- Evidence of the impact of your game across the environment and two other areas: environmental + 2 of the following: Social, Economical, Technical, Individual (10% 750 words)

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

# 11. AI Statement

- summarise your team's use of AI ao we know where to give you credit for work done (250 words)
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

# 13. Appendices

## Appendix 1: SUS Results

### Appendix 1.1: Level 1

<p align="center">
<img src = "https://github.com/UoB-COMSM0166/2026-group-27/blob/ed777816b6fa0be6ac10b85e07bea25d78ef4bce/5.%20readme%20docs/13.%20SUS%201%20results%20final.jpg" width="100%">

</p>

### Appendix 1.2: Level 2 

<p align="center">
<img src = "https://github.com/UoB-COMSM0166/2026-group-27/blob/69360be200f0feb62e45fe2c7f4425f81b3a72ca/5.%20readme%20docs/13.%20SUS%202%20results%20.jpg" width="100%">

</p>

## Appendix 2: Black-Box Testing Results

### Appendix 2.1: Normal
| Test ID | Feature | Input / Action | Expected Result | Status |
|--------|--------|----------------|-----------------|--------|
| N1 | Shop | Coins ≥ price, click buy | Purchase succeeds, coins deducted | Pass |
| N2 | Movement | Press ↑/←/↓/→ | Player moves in correct direction | Pass |
| N3 | Teleport | Enter any portal | Player appears at a random portal | Pass |
| N4 | Item | Pick up key | Key disappears and is collected | Pass |
| N5 | Combat | Shoot enemy | Enemy takes damage | Pass |
| N6 | Win Condition | Reach exit with objective | Level completed | Pass |

### Appendix 2.2: Boundary
| Test ID | Feature | Input / Action | Expected Result | Status |
|--------|--------|----------------|-----------------|--------|
| B1 | Shop | Coins = price | Purchase succeeds | Pass |
| B2 | Shop | Coins = price - 1 | Purchase fails | Pass |
| B3 | Health | Health reduces to 0 | Player dies | Pass |
| B4 | Health | Health = max, pick health | Health does not exceed max | Pass |
| B5 | Collision | Move along wall edge | No wall penetration | Pass |
| B6 | Teleport | Stand at portal edge | Teleport triggers correctly | Pass |

### Appendix 2.3: Error Cases
| Test ID | Feature | Input / Action | Expected Result | Status |
|--------|--------|----------------|-----------------|--------|
| E1 | Shop | Buy without enough coins | Purchase denied, warning shown | Pass |
| E2 | Door | Open door without key | Door remains locked | Pass |
| E3 | Death | Move after death | No response / disabled controls | Pass |
| E4 | Game State | Shoot in menu/shop | No effect | Pass |
| E5 | Teleport | Rapid enter/exit portal | No glitch or infinite loop | Pass |

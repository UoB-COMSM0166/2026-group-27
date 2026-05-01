# 2026-group-27

 
<p align="center">
<img width="1920" height="869" alt="image" src="https://github.com/user-attachments/assets/78b9eb01-eadd-4dc7-b6c4-707eb198c6bf" />
</p>

<div align="center">

<b>🔮 [Click Here To Play!](https://uob-comsm0166.github.io/2026-group-27/) 🔮</b>

<br>

<b> 🎥 [Game Demo](https://youtu.be/FTeGehKrstc?si=Yh9xqwl8VMNAMmKA) 🎥 </b> 

</div>

# Table of Contents  

1. [Our Group](https://github.com/UoB-COMSM0166/2026-group-27/tree/main#1-our-group) 
2. [Introduction](https://github.com/UoB-COMSM0166/2026-group-27/tree/main#2-introduction)
3. [Requirements](https://github.com/UoB-COMSM0166/2026-group-27/tree/main#3-requirements)
4. [Design](https://github.com/UoB-COMSM0166/2026-group-27/tree/main#4-design)
5. [Implementation](https://github.com/UoB-COMSM0166/2026-group-27/tree/main#5-implementation)
6. [Evaluation](https://github.com/UoB-COMSM0166/2026-group-27/tree/main#6-evaluation)
7. [Process](https://github.com/UoB-COMSM0166/2026-group-27/tree/main#7-process)
8. [Sustainability, Ethics, and Accessability](https://github.com/UoB-COMSM0166/2026-group-27/tree/main#8-sustainability-ethics-and-accessibility)
9. [Conclusion](https://github.com/UoB-COMSM0166/2026-group-27/tree/main#9-conclusion)
10. [Contribution Statement](https://github.com/UoB-COMSM0166/2026-group-27/tree/main#10-contribution-statement)
11. [AI Statement](https://github.com/UoB-COMSM0166/2026-group-27/tree/main#11-ai-statement)
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
   <th>Role</th>
  </tr>

  <tr>
    <td>Suki Dai</td>
    <td>daisy20010313@gmail.com</td>
    <td>@Suki0515</td>
   <td>UI/UX Designer and Documentation</td>
  </tr>

  <tr>
    <td>Thanusha Gorva</td>
    <td>jx25475@bristol.ac.uk</td>
    <td>@thanusha170</td>
   <td>UI/UX Designer and Lead Documentation </td>
  </tr>

   <tr>
    <td>Liz Chen</td>
    <td>ji25241@bristol.ac.uk</td>
    <td>@lizchen0201</td>
    <td>Technical Owner</td>
  </tr>

  <tr>
    <td>Yizhou Pan</td>
    <td>izapan610@gmail.com</td>
    <td>@izapan610</td>
   <td>Lead Developer and Sound Designer</td>
  </tr>

  <tr>
    <td>Keyu Zhou</td>
    <td>email</td>
    <td>@zhoukeyu63-netizen</td>
   <td>Role</td>
  </tr>

   <tr>
    <td>Maniza Singh</td>
    <td>jq25952@bristol.ac.uk</td>
    <td>@ManizaS17</td>
    <td>Scrum Master / Product Manager</td>
  </tr>
  
</table>

# 2. Introduction

Lost in Bristol is a third-person maze-based story game inspired by classic arcade maze games such as Pac-Man, along with story-driven combat games like Hollow Knight. In terms of the “twists”, the game combines exploration, combat, storytelling and level progression to create a darker and more immersive take on the traditional maze game genre.

Set in a cursed version of Bristol, the game follows the player as they navigate through 3 maze-based levels, each introducing new mechanics and increasing in difficulty. 
   * In Level 1, the player is introduced to basic navigation and a simple weapon system using a crossbow.
     
   * Level 2 increases difficulty by introducing a darker maze where the player must find items such as a lamp and other essential weapons,          while also defeating and avoiding enemies.
     
   * Level 3 expands the gameplay further by introducing portals that allow the player to teleport across the maze, alongside a final boss that      must be defeated by imprisoning it to lift the curse.

The game also includes narrative cutscenes after each level, which gradually reveal the game’s lore and deepen player engagement, requiring the player to complete each level in order to fully unlock the story.


### Game Objects

<p align="center">
   <b>Table 2: </b>
  <i>Game Objects in Lost in Bristol</i> <br>
</p>

<table align="center" border="1" cellspacing="0" cellpadding="10">
  <thead>
    <tr>
      <th>Name</th>
      <th>Image</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Portal</td>
      <td><img width="100" height="100" alt="portal final" src="https://github.com/user-attachments/assets/cf4d3a34-0351-4040-b606-998fd3e14647">         
</td>
      <td>Teleports player around the maze.</td>
    </tr>
    <tr>
      <td>Crossbow</td>
      <td> <img width="77" height="74" alt="Screenshot 2026-04-21 at 01 58 36" src="https://github.com/UoB-COMSM0166/2026-group-27/blob/main/game/assets/crossbow.png" width="50"></td>
      <td>Weapon to attack enemies (1 damage per attack)</td>
    </tr>
     <tr>
      <td>Magic Ring</td>
      <td> <img width="77" height="74" alt="Screenshot 2026-04-21 at 01 58 36" src="https://github.com/UoB-COMSM0166/2026-group-27/blob/main/game/assets/ring.png" width="50"></td>
      <td>Weapon to attack enemies (3 damage per attack)</td>
    </tr>
   <tr>
      <td>Lock</td>
      <td> <img width="77" height="74" alt="Screenshot 2026-04-21 at 01 58 36" src="https://github.com/UoB-COMSM0166/2026-group-27/blob/main/game/assets/lock.png" width="50"></td>
      <td>Needed in Level 3 to imprison the boss</td>
    </tr>
    <tr>
      <td>Key</td>
      <td> <img width="77" height="74" alt="Screenshot 2026-04-21 at 01 58 36" src="https://github.com/UoB-COMSM0166/2026-group-27/blob/main/game/assets/key.png" width="50"></td>
      <td>Needed in Level 3 to imprison the boss</td>
    </tr>
     <tr>
      <td>Cage</td>
      <td> <img width="97" height="94" alt="Screenshot 2026-04-21 at 01 58 36" src="https://github.com/UoB-COMSM0166/2026-group-27/blob/main/game/assets/cage.png" width="50"></td>
      <td>Needed in Level 3 to imprison the boss</td>
    </tr>
    <tr>
      <td>Cat Ghost</td>
      <td> <img width="97" height="94" alt="seagull" src="https://github.com/UoB-COMSM0166/2026-group-27/blob/main/game/assets/little%20ghost.png"> </td>
      <td>Mini enemies around the maze</td>
    </tr>
    <tr>
      <td> The Boss </td>
      <td> <img width="97" height="94" alt="boss-3" src="https://github.com/UoB-COMSM0166/2026-group-27/blob/main/game/assets/boss.png" />
</td>
      <td> The curse master of the mists from the Dark Ages</td>
    </tr>
  </tbody>
</table> 

### Meet our Characters!

<p align="center">
   <b>Table 3: </b>
  <i>Characters in Lost in Bristol</i> <br>
</p>

<table align="center" border="1" cellspacing="0" cellpadding="10">
  <tr>
    <th>Image</th>
    <th>Name</th>
  </tr>

  <tr>
    <td> <img width="100" height="170" src="https://github.com/UoB-COMSM0166/2026-group-27/blob/main/game/assets/characters/Lando/L-front2.png"> </td>
    <td>Lando Norris (F1 World Champion 2025)</td>
  </tr>

  
 <tr>
   <td> <img width="100" height="170" src="https://github.com/UoB-COMSM0166/2026-group-27/blob/main/game/assets/characters/Eliza/E-front2.png"> </td>
    <td>Eliza (A history student at the UoB)</td>
  </tr>


 <tr>
   <td> <img width="150" height="180" src="https://github.com/UoB-COMSM0166/2026-group-27/blob/f1c65b46da2c74285b04cf476763cf63e8f45696/3.%20pixel%20art%20(characters%20%2B%20weapons)/fox%20bigger%20for%20repo.png"> </td>
<td>Fox <3 </td>
  </tr>
  </table> 



# 3. Requirements

thanusha
- 15% ~750 words
- Early stages design. Ideation process. How did you decide as a team what to develop?
- ✅ Stakeholders
- ✅ User stories and epics 
- Case diagrams
<img width="4096" height="1621" alt="usecase" src="https://github.com/user-attachments/assets/16b03d51-2f1d-4dda-b27f-89d67d60a6a2" />

## 3.1 Ideation Process 

We used [Miro](https://miro.com/) to brainstorm ideas for our game. Initially, each team member selected a game they really enjoyed and listed key features that made it unique, which we could potentially include in our own game, such as combat, multiplayer options, and story modes (Figure 2).

<p align="center">
<b>Figure 2: </b>
  <i>Exsisting games for inspiration brainstorm</i> <br>

<img src = "https://github.com/UoB-COMSM0166/2026-group-27/blob/3cdb4f3052e580042f58e75d640b9036f2ad641f/5.%20readme%20docs/03.%20Game%20Inspo.jpg" width="80%">

Next, as a team, we developed two game ideas that combined features from at least two out of the four listed games, ensuring that each team member's favourite game was included in our designs. Before developing our ideas, we decided that our game should be based in Bristol, as all our team members are international students new to the city. We wanted to create a game inspired by the city we are currently living in (Figure 3 and 4) 

<p align="center">
      <b>Figure 3: </b>
      <i>Game Idea 1 - Lost in Bristol.</i><br>
      <img src="https://github.com/UoB-COMSM0166/2026-group-27/blob/07648b4772195a195a19fc710e553b9d7434fc7c/5.%20readme%20docs/03.%20Lost%20in%20bristol%20game%20idea.jpg" width="70%">
</p>

   <p align="center">
      <b>Figure 4: </b>
      <i>Game Idea 2 - The Will and the Fox</i><br>
      <img src="https://github.com/UoB-COMSM0166/2026-group-27/blob/07648b4772195a195a19fc710e553b9d7434fc7c/5.%20readme%20docs/03.%20The%20will%20and%20the%20Fox%20game%20idea.jpg" width="70%" >
   </p>

In workshop 3, we developed prototypes for the two game ideas. This gave us a visual representation of what our two potential game ideas could look and function. This helped us compare how each team member pictured the potential game designs and encouraged discussion to agree on a shared vision for each game idea. It also helped us see how complex the mechanics were and if they could be realistically built (Figure 5 and 6). <br>
<br>

<table align="center" width="100%">
 <tr>
<td align="center">
  <b>Figure 5: </b>
  <i>Paper Prototype for Lost in Bristol <br> 
    made during Workshop 3 </i> <br>
<img src= "https://github.com/UoB-COMSM0166/2026-group-27/blob/f6eb2dd289198ac83513909ae7b6078e33eb18dc/5.%20readme%20docs/03.%20paper%20protoype%20lost%20in%20bristol.gif" width= "200">
</td>

<td align="center">
  <b>Figure 6: </b>
  <i>Prototype for The Will and the Fox <br>
  made using Freeform </i> <br>
 <img src= "https://github.com/UoB-COMSM0166/2026-group-27/blob/1654f265acb071d30c2705c8287f72e56f9c53fc/5.%20readme%20docs/03.%20Prototype%202.gif" width="300">
  </td>
</tr>
</table>
<br> 

We chose Lost in Bristol as our final game idea, after a group discussion, as it allowed us to incorporate features from most of the games we had listed during our inspiration brainstorm. We also felt that the Bristol theme could be represented more effectively by using cutscenes with Bristol-themed visuals. 

In contrast, The Will of the Fox did not include cutscene elements and offered less flexibility for implementing Bristol-themed elements. We also thought it would be difficult to include progression or increased difficulty, as it focused on competitive multiplayer, whereas Lost in Bristol allowed for more structured progression across levels. Overall, Lost in Bristol provided a more achievable design and aligned with our team’s goals.

## 3.2 Identifying Stakeholders

Stakeholders for Lost in Bristol were identified using the Onion Model to ensure all relevant groups were considered (Figure 7). This helped us understand how different users would interact with the game and ensured the game remained aligned with user needs (Pirozzi, 2019). 

<p align="center">
   <b>Figure 7: </b>
  <i>Onion Model for Lost in Bristol (adapted from: Alexander & Robertson, 2004).</i> <br>
<img src= "https://github.com/UoB-COMSM0166/2026-group-27/blob/5c7512fc3f6da78114246c7d17cc2bf4fb7299ef/5.%20readme%20docs/03.%20onion%20model.jpg" 
 width="100%">
</p>

* **The Product:** Lost in Bristol video game.

* **The System:** Stakeholders involved in developing the game, including developers, designers, and project managers. Recognising these          stakeholders helped ensure that design decisions were aligned with their roles and were realistic, meaning they could be successfully           implemented within the project's timeframe.

* **The Containing System:** The main users of the game, such as players, who interact with and experience the gameplay. This helped us focus     on user experience by ensuring features such as controls and difficulty progression were intuitive and engaging.

* **The Wider Environment:** External stakeholders such as assessors, testers, and Computer Science students, who evaluate or influence the       product's development. Recognising this helped ensure the game was suitable for testing and could be assessed effectively. 

## 3.3 Epics & User Stories

To define the core features of our game, epics and user stories were created (Table 4). 

Epics were used to represent core gameplay features, such as navigation, item collection, and combat, which were then made into user stories using Cohn’s format: “As a [user], I want [goal] so that [reason]” (Cohn, 2004). This helped us develop features step by step while focusing on user needs, rather than creating goals that may not benefit the game.

Acceptance criteria were included to determine when a feature has been successfully implemented in the game using the Given-When-Then format. “Given” describes the starting state, “When” the action, and “Then” the expected result (de Biase et al., 2024).


<p align="center">
<b>Table 4: </b>
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
- And the environment reflects Bristol (e.g. brick textures) <br>
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

## 4.1 Class Diagram

A class diagram was developed to visualise the structure of our game system and show the relationships between different game elements. This helped us plan the system architecture and ensure we implemented an object-oriented design (OOD) approach throughout development.

The diagram follows OOD principles by separating the game into modular components. Systems such as combat and level progression are implemented as individual classes. This supports encapsulation and maintainability, as each system can function and be updated or debugged without affect the rest of the game. Overall, this structure helps us organise our code and make it reusable for potential future development (Nikiforova et al., 2011).


<p align="center">
      <b>Figure 8: </b>
      <i>Class diagram for Lost in Bristol.</i><br>
      <img width="75%" alt="diagram1" src="https://github.com/user-attachments/assets/8677e1b3-c96e-4f79-8381-fee1868a402b" />
</p>


**Subsystems:**

* <b>Game Flow and Control: </b>
  (`GameFlowManager`, `MainMenuController`, `OpeningController`)

  - These classes manage menus and scene transitions between levels. They control how the player navigates through the game and ensure the game     flows correctly from start to finish, supporting a structured gameplay experience.


* <b>Player and Core Systems: </b>
  (`CharacterDataManager`, `CharacterRender`, `LevelBase`, `Camera`, `Maze`)

  - `Maze` and `LevelBase` define the structure of each level, while the `Camera` controls the player’s view of the game. `CharacterRender`          handles the character chosen by the player and displays it in the game 

   - These systems separate gameplay logic, rendering, and environment, making the code easier to manage and maintain.

* <b>Combat and Level Mechanics: </b>
  (`WeaponSystem`, `Projectile`, `HostileProjectile`, `Enemy`, `Boss`, `FogSystem`, `PortalSystem`)
  
  - These control gameplay mechanics, such as combat and enemy behaviour. For example, `Projectile` handles both player and enemy attacks in          levels 2 and 3, while the `PortalSystem` allows telleportation in level 3.

  - Level 1 is an introductory level, which only focuses on navigation and the core mechanics of the game. As a result, most of the classes         here are only connected to levels 2 & 3. This reflects the progressive structure of the game, where difficulty increases gradually to           support player learning and engagement.
  
* <b>Interaction and Utility Systems: </b>
  (`DifficultyManager`, `CodexManager`, `Rect`)
  
  - These handle additional gameplay features such as difficulty scaling and collision detection. The `Rect` class handles interactions between     objects, ensuring accurate collision response in the gameplay.


## 4.2 Sequence Diagrams

Sequence diagrams were developed to show how different objects in the system interact with each other and the exact order in which these interactions occur, making it easier to structure the game and find any errors or bugs.

We created two sequence diagrams for Lost in Bristol: one for the storyline and one for gameplay. 

* **Storyline Sequence Diagram**

  - The storyline sequence diagram illustrates how cutscenes are displayed within the game. For example, after completing a level, the              system initiates a cutscene that displays dialogue and transitions the player to the next level. This shows how story elements are              included in the overall gameplay experience (Figure 9).

<p align="center">
      <b>Figure 9: </b>
      <i>Sequence Diagram 1 - Storyline</i><br>
      <img width="50%" alt="sequence" src="https://github.com/user-attachments/assets/1999ee0a-e7d3-4f78-9e23-ed680d7b052a" />
</p>

* **Gameplay Sequence Diagram**

  - The gameplay sequence diagram shows how the player interacts with the game during maze levels. For example, when the player attacks an          enemy, this input is processed by the game system, which then interacts with classes such as the `WeaponSystem` and `Enemy` to calculate        damage. This shows how multiple classes interact with each other to update game progress for the player (Figure 10). 

 
 <p align="center">
       <b>Figure 10: </b>
       <i>Sequence Diagram 2 - Gameplay</i><br>
       <img width="50%" alt="sequence" src="https://github.com/user-attachments/assets/0270cfd2-c5c6-4ac4-ba7a-cecaf9f18964" />
 </p>


# 5. Implementation

## 5.1 Spawning System 

A key challenge we faced was ensuring that game elements such as enemies, items, and portals spawned randomly but also fairly. Random placement could lead to issues such as items spawning inside the maze walls or enemies spawning at the player’s spawn point, causing instant death, making the game unplayable. 

To prevent this, we implemented a controlled random spawning system, in which the game first checks whether a position is valid before placing any object. All spawn positions are aligned to a grid (32 px tiles) using a snapping function, ensuring objects are positioned correctly within the maze without overlapping: `snapToGrid(value) = floor(value / blockSize) * blockSize` 

The system then generates random positions until a valid one is found. A position is only accepted if it does not overlap with walls, the player’s character, or any previously placed objects. This is checked using collision detection, along with an exclusion list that stores already placed objects. This prevents overlap and ensures that the objects are evenly distributed across the maze.  Enemy placement follows a similar approach but includes stricter checks to ensure they do not overlap with the player’s starting position, pickups, or the exit. 

 * Collision detection: 
   `if (intersectsWall || intersectsPlayer || intersectsObject) reject;`

 * Exclusion list: 
   `avoidList.includes(object)`

To prevent the system from getting stuck in rare cases where no valid position is found, a maximum number of attempts is set. This is essential because the system can keep generating invalid positions of the maze. Hence, a retry loop is used, which keeps generating new positions until a valid one is found or the attempt limit is reached.

These features maintain randomness while ensuring all spawns remain fair and playable, improving replayability for players. 


## 5.2 Final Boss AI: Movement and Combat System

Another difficulty we faced was making the final boss in level 3 more challenging than the regular enemies, with predictable movements which makes it relatively easy to avoid. If the final boss behaved the same way, there would be no increase in difficulty compared to previous levels, resulting in an underwhelming experience for the player. Hence, the boss was designed to actively follow and attack the player while reusing existing systems in the game.

To address this, we implemented a distance-based behaviour system. The boss calculates its distance from the player and changes its behaviour depending on how far away the player is, making the battle less predictable and challenging without requiring a complex AI system. 

When the player is within attack range (130-340 px), the boss becomes more aggressive by moving towards the player while attacking simultaneously, increasing combat pressure. A timer (1.6 seconds) controls how often the boss shoots, ensuring consistent behaviour across different frame rates (Figure 11). When the timer reaches zero, the boss fires three projectiles while moving towards the player. This makes the attacks harder to dodge, as it covers a larger area compared to a single projectile (Figure 12).

  <p align="center">
  <b>Figure 11: </b>
  <i>Code Snippet for Boss Attack Timer</i> <br>
  </p>
  
          this.shootTimer -= dt;
          if (dist < 340 && this.shootTimer <= 0) {
              this.fireFanShot(px, py);
              this.shootTimer = bossShootCooldown;
          }
          

<p align="center">
  <b>Figure 12: </b>
  <i>Boss Movement & Attack</i> <br>
 
<img src= "https://github.com/UoB-COMSM0166/2026-group-27/blob/f6eb2dd289198ac83513909ae7b6078e33eb18dc/5.%20readme%20docs/05.%20boss%20move%20%2B%20attack.gif" width= "40%">
</p>
<br>

At very close range (distance < 130 px), the boss stops moving but continues attacking, making it harder to avoid attacks due to the close proximity (Figure 13). Contact damage is applied when the player touches the boss, making the fight more challenging.


<p align="center">
  <b>Figure 13: </b>
  <i>Boss Attack with no movement </i> <br>
 
<img src= "https://github.com/UoB-COMSM0166/2026-group-27/blob/f6eb2dd289198ac83513909ae7b6078e33eb18dc/5.%20readme%20docs/05.%20boss%20attack%20only.gif" width= "40%">
</p>
<br>

These features make the boss fight more challenging compared to the enemies from previous levels, as the player is forced to constantly move, focus on their position and distance from the boss and time their attacks, rather than simply avoiding a predictable enemy. This approach balances increasing challenge with user engagement to maintain an overall enjoyable experience for the player (Sweetser & Wyeth, 2005). 

# 6. Evaluation

The game was evaluated during its prototype stage, enabling us to identify and fix usability issues and technical bugs during development. Since the game did not yet include the final Bristol-themed visuals, this allowed us to focus on evaluating the core gameplay mechanics without the influence of visual or narrative features. 

We combined qualitative feedback from Think Aloud (TA) sessions with quantitative data from the System Usability Scale (SUS) to evaluate usability and user experience.


## 6.1 Qualitative Evaluation: Think Aloud (TA)

During TA tests, participants verbalised their thoughts while navigating the maze and completing tasks such as finding items and reaching the exit. These tests allowed us to identify unclear game concepts from a player’s perspective (Pellicone et al., 2022). 

Ten participants were recruited using convenience sampling from our weekly workshops, allowing us to receive quick feedback without requiring a controlled experiment.

Feedback was grouped into common themes: map design, technical issues, and game mechanics.

* **Map Design**:

  - Most users liked the maze's layout and its "spacious route", suggesting that the navigation structure was clear and easy to understand.         However, many noted that the environment felt empty and repetitive, reducing user engagement. This supported our planned use of Bristol-        themed visual elements, such as landmarks in the background of story mode, to improve visual engagement and help players recognise              different areas of Bristol.  <br>


* **Technical Issues**:

  - A key issue was identified with input handling. The Enter key, used to start the game, only worked when the mouse cursor was positioned         over the game window. This made the controls unreliable and harder to use.

  - This was fixed by ensuring the game window stays active during gameplay, so keyboard inputs like the Enter key are always detected.  <br>
  

* **Game Mechanics**:

  - Participants suggested adding a warning when time is running low (e.g. 10–20 seconds remaining). This indicated that players needed clearer     feedback when they are under pressure, which we considered during the rest of the development process. 


## 6.2 Quantitative Analysis: System Usability Scale (SUS)

The SUS was used to evaluate the usability across different levels. If a game is too easy, it can become uninteresting, while unnecessary difficulty or frustration can reduce replayability. SUS was chosen as it is known to be reliable and is commonly used in evaluating usability in game design (Maxim & Arnedo-Moreno, 2025).

Ten participants completed level 1 and level 2, completing the SUS questionnaire after each level. Each question was rated on a scale of 1-5 (1=strongly disagree and 5=strongly agree) (Raw data: [Appendix 1](https://github.com/UoB-COMSM0166/2026-group-27#13-appendices)). 

SUS mean scores were calculated, and a Wilcoxon signed-rank test was used to determine whether usability between levels was statistically significant. This test was chosen as the same participants took part in both levels, and SUS responses were collected using a rating scale (1-5), so a method that does not assume exact numerical data (a non-parametric test) was more suitable. 

<p align="center">
  <b>Figure 14: </b>
  <i>Bar graph displaying SUS results </i> <br>

<img src= "https://github.com/UoB-COMSM0166/2026-group-27/blob/c841dd521269626e505282d43f6ca604df28f281/5.%20readme%20docs/06.%20SUS%20graph%20final.png" width = "100%">

</p>

 * **SUS Mean Scores**: Level 1 scored higher (M = 87.3) than Level 2 (M = 79.6).
     (Calculated in Microsoft Excel; see [Appendix 1](https://github.com/UoB-COMSM0166/2026-group-27#13-appendices)).

 * **Wilcoxon Signed Rank Test**: Statistically significant difference between Level 1 and Level 2 usability scores (W = 0, p = 0.005).
     This was calculated using an online statistical tool (Social Science Statistics, n.d.). 

Both levels scored above the SUS benchmark of 68, suggesting high usability in both conditions. Level 1 achieved an “excellent” score (>85), while Level 2 fell within the “good” range.

We expected usability to be similar across levels, as the core game design was consistent. However, level 2 introduced new gameplay elements such as weapons and enemies, increasing gameplay difficulty. Hence, increased difficulty in level 2 may have influenced the participants' perceptions of usability, as usability in games can be affected by difficulty and player experience, making it harder to separate usability from gameplay difficulty during evaluation (Olsen et al., 2011). 


## 6.3 Code Testing

We used black-box testing to evaluate core gameplay features such as item collection and movement. We chose this test as it focuses on how the game works from a player's perspective rather than the developer’s perspective, which involves looking at the internal code of the game. 

Test cases included normal, boundary, and error conditions. Boundary cases tested situations at the limits of the system, such as having just enough coins to make a purchase. Error cases ensured the game handled invalid actions correctly, such as attempting to buy an upgrade without enough coins. All tested cases passed (Black-box testing found in: [Appendix 2](https://github.com/UoB-COMSM0166/2026-group-27#appendix-2-black-box-testing-results)).

However, as black-box testing does not consider the internal code, some issues were not detected. For example, an input bug with the Enter key was discovered during the Think Aloud tests ([Section 6.1](https://github.com/UoB-COMSM0166/2026-group-27/tree/main#61-qualitative-evaluation-think-aloud-ta)). This highlights the importance of combining both code structure testing and player-focused evaluation to produce more reliable results. 


# 7. Process

## Collaboration

As a team, we adopted a flexible and collaborative approach aligned with Agile principles, with a strong emphasis on communication and continuous progress tracking. This ensured that all members contributed effectively throughout the project. This was particularly important for us as we had new members who joined the group halfway through the project, so we needed to familiarise them with our game design and plans. Regular communication and documentation helped manage this transition and ensured that development continued smoothly despite these changes.

To stay on track, we held weekly in-person meetings outside of the timetabled workshop session to review progress, discuss new ideas and ensure we all were on the same page. Additionally, we had a WhatsApp group chat for daily communication, allowing us to share updates or ask questions outside of university and in-person meetings (Figure ?).

<p align="center">
  <b>Figure ?: </b>
  <i>Screenshot of WhatsApp Group Chat</i> <br>
 
<img src= "https://github.com/UoB-COMSM0166/2026-group-27/blob/e87cc7f13cc2b0ad7c3e630d19e73bb6d4225184/5.%20readme%20docs/07.%20Whatsapp%20Screenshot.jpg" width= "30%">
</p>

The WhatsApp group was also really helpful for overcoming language barriers within the team, as not all members had the same level of English proficiency. Written communication within the group allowed ideas to be expressed more clearly and translated if necessary to help us understand each other better, improving overall collaboration and reducing the risk of miscommunication. 

Furthermore, we used GitHub as a development tool, specifically a [devlog README file](https://github.com/UoB-COMSM0166/2026-group-27/tree/542337afaf5a9f9f3a855065c2fda8c948da1b56/1.%20devlog) where every week each team member recorded tasks they completed, work in progress and planned future work. We also used a Jira board to keep track of individual progress. 


<p align="center">
 <b>Figure ?: </b>
 <i>Jira Kanban Board</i> <br>
  <img alt="Kanban board" src="https://github.com/user-attachments/assets/ea0182d3-3a1e-47b9-aab0-bd22b0b1d998" width="500">
</p>

For game development, collaboration was supported through GitHub using a fork-and-branch workflow. Each team member worked on separate forks, allowing features to be developed independently and reviewed by other team members before being merged into the main repository. We found in-person meetings to be the most efficient in discussing and organising code. 

## Areas of Improvement

* Although communication within the team was generally strong and we assigned roles to each member, we fell behind schedule at times due to a     lack of clearly defined deadlines for individual tasks. This resulted in some work being rushed towards the end of the project.
  We rarely communicated during term breaks as we did not plan meetings or send many updates on our group chat. After the break, when we started working on the project again, we needed time to regain our momentum and    ensure all team members were actively working on tasks and communicating effectively again. 

* Furthermore, we assigned each team member specific roles (see [Table 1](https://github.com/UoB-COMSM0166/2026-group-27/tree/main#1-our-group)   for group roles). However, these roles were not strictly enforced, meaning that members could contribute to other areas of the project, such    as assisting with the repo or supporting development tasks. While this encouraged collaboration and gave all members exposure to different      aspects of the project, it also slowed us down. Specifically, the lack of clearly defined responsibilities and deadlines meant that multiple    tasks were ongoing but not complete across multiple areas. 

* Additionally, our lack of experience in digital art made the creation of pixel art assets challenging, as we initially planned to design        multiple sprites manually using tools such as Piskel. However, we underestimated the time and skill required to produce consistent and high-    quality pixel art, which slowed overall progress.

  As a result, we used AI-generated elements to support the visuals of the game, allowing us to save time and continue development and focus on   other tasks effectively. Although we were able to adapt our approach, this highlighted the importance of accurately assessing a team’s skill    sets during the planning phase and choosing methods that align with those capabilities.

# 8. Sustainability, Ethics and Accessibility

While developing Lost in Bristol, we considered how the game impacts environmental, technical, and social factors using the Sustainability Awareness Framework (SusAF) to help us evaluate the strengths and potential limitations of our design. 

<p align="center">
  <img src="https://github.com/user-attachments/assets/1d827fca-87fb-499e-ba8f-1f0a10b2ed1b" alt="susAD" width="350">
</p>



## 8.1 Environmental
Lost in Bristol is a browser-based game built using HTML, CSS, and JavaScript, meaning it does not require installation or high-performance hardware to run. As a result, it has relatively low CPU and GPU usage, which reduces energy consumption during gameplay. This also allows it to run on lower-specification devices, reducing the need for users to upgrade their hardware, which can help decrease electronic waste. 

However, longer gaming sessions can increase total energy usage over time. Additionally, if the game reaches a larger audience, increased data traffic and server use could raise energy demands on servers and data centres. This highlights a trade-off between efficient design and large-scale usage, showing that the environmental impact of the game is influenced by both design choices and user behaviour.

### Green Software Foundation Pattern:
| Pattern | Implementation |
|---|---|
| Use of local storage | `localStorage` is used to store player choices such as selected character, difficulty, equipped weapon, and progress. This ensures data persists across levels without repeated setup. |
| Separate game states | The game is divided into states (e.g. `menu`, `gameplay`, `pause`, `gameOver`), allowing better control of logic and preventing unnecessary updates when inactive. |
| Shared UI functions | Common UI elements are implemented in `ui.js` and reused across levels, reducing duplication and improving consistency. |
| Modular file structure | The project is split into focused files (e.g. `level1.js`, `level2.js`, `audio.js`, `playerData.js`), making the code easier to maintain, scale, and update. |



## 8.2 Technical
Systems such as player movement, enemy behaviour, and level design are implemented as separate components, allowing them to be modified individually without affecting the rest of the game. This makes updates more efficient and allows the game to evolve without requiring a full rebuild.

However, as the system grows and updates are made, it becomes more complex and harder to manage, leading to technical debt. This can reduce maintainability and development efficiency if the code is not properly documented and refactored over time, negatively affecting the long-term effectiveness of the system (Wiese et al., 2025). 

Overall, this highlights a trade-off between adding functionality and maintaining simplicity. Hence, sustainable development relies on good coding practices such as modular design and regular optimisation to maintain a balance between system complexity and long-term maintainability.

## 8.3 Social
The social aspect of the game refers to inclusiveness, user experience, trust, and overall well-being of the player. Lost in Bristol has a simple interface and intuitive controls, making it accessible to players from a wide range of gaming experience levels. This improves usability and allows a more diverse range of users to engage with the game easily.

The game also supports diversity through character selection, allowing players to choose from characters of different races, genders, and species. Additionally, gameplay encourages problem-solving, spatial awareness, and cognitive reasoning to progress through the game, which supports player engagement and skill development. Consistent mechanics and predictable behaviour help build trust, as players can rely on the system responding in a consistent way, increasing player confidence. 

However, the current version has limitations in accessibility. There are no dedicated features for colourblind users or players with visual impairments, which restricts inclusivity. Additionally, while the game promotes engagement through immersion, there is a delicate balance between providing satisfaction and optimal engagement, as excessive engagement may result in user fatigue and reduced performance quality. For example, our game includes a time-based element, which may create pressure for players to complete the game quickly, potentially leading to stress. 

# 9. Conclusion

## 9.1 Reflection:

Developing Lost in Bristol helped us improve and apply our software engineering skills by combining game design with technical implementation. The project was an ongoing problem-solving process, supported by regular testing and improvements. This helped us understand the importance of being flexible in design and the value of gradually improving the game in the development process.

* The first significant thing we as a team learned was how critical it is to plan early. The original vision for the Maze-survival Game lacked clarity, leading to a number of reworks during the course of development. This demonstrated an evolution in the original concept and illustrated the need for flexibility and planning early when developing interactive systems.
 
* The second major takeaway was that structuring code correctly is extremely important. As we progressed through the game with more and more features being added, we began to realise that unorganised code was making it increasingly difficult to debug. As a result, we decided to compartmentalise the code into smaller, modular components (such as player movement, enemy and level), which became easy to track and maintain the system efficiently. Overall, this reinforced the importance of good coding practices when it comes to sustaining and eventually scaling a project.  

## 9.? Future Work
In the short term, potential future work could prioritise improving accessibility features such as colourblind friendly palettes, aligning with the Web Content Accessibility Guidelines (WCAG) recommendations (W3C, 2025). We also plan to optimise performance by refining the game loop and reducing unnecessary processing during non-active states such as menus and pauses.

## 9.? Sequel: Lost In Bristol 2

A potential sequel could expand the game world into an alternate version of Bristol, such as a historical setting or an alien invasion scenario. Additionally, Bristol-themed visuals could be incorporated into the maze levels themselves, rather than only being included in cutscenes. This allows for unique and varied environments and level designs. 

Furthermore, introducing characters with unique abilities would encourage different playstyles and increase replayability as each character would offer a different way to experience the game. This supports research showing that character variety and mechanical differences can improve player engagement and retention (Sweetser & Wyeth, 2005). 

Moreover, adding alternative endings based on the character chosen and player performance would further increase replayability and depth to the game’s lore. 

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
  <td>
   - Did not attend demo session <br>
   - Was not in contact with the team <br> 
     towards the end of the project (after easter) <br>
   - No known contribution to game design,<br>
     code, or repo</td>
  </tr>

  <tr>
  <td>Maniza Singh</td>
  <td>1.0</td>
  </tr>

  </table>

# 11. AI Statement

We primarily used AI for the visual arts in our game. This allowed us to focus more on developing the game mechanics and internal code, while also maintaining a consistent art style for our game.

The cut-scenes' visuals were all developed using AI. The majority of game objects in [Table 2](https://github.com/UoB-COMSM0166/2026-group-27/tree/main#game-objects) and characters in [Table 3](https://github.com/UoB-COMSM0166/2026-group-27/tree/main#meet-our-characters) were designed using AI, apart from the portal design and animation, and the fox character, which was done by Thanusha using [Piskel](https://www.piskelapp.com/).

We also used AI tools to support development by helping debug code and identify errors. Additionally, AI was used to translate code snippets and labels, allowing each team member to read and understand the code in their preferred language.

The AI tools for these tasks were primarily Google Gemini and ChatGPT. 

# 12. References

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

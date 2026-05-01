# 2026-group-27

 
<p align="center">
<img width="1920" height="869" alt="image" src="https://github.com/user-attachments/assets/78b9eb01-eadd-4dc7-b6c4-707eb198c6bf" />
</p>

game set up instructions and link to play game. 


<h>🌙 [Click Here To Play!](https://uob-comsm0166.github.io/2026-group-27/) 🌙</h>
</p>

# Video Demonstration

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
  </tr>

  <tr>
    <td>Suki Dai</td>
    <td>daisy20010313@gmail.com</td>
    <td>@Suki0515</td>
  </tr>

  <tr>
    <td>Thanusha Gorva</td>
    <td>jx25475@bristol.ac.uk</td>
    <td>@thanusha170</td>
  </tr>

   <tr>
    <td>Liz Chen</td>
    <td>ji25241@bristol.ac.uk</td>
    <td>@lizchen0201</td>
  </tr>

  <tr>
    <td>Yizhou Pan</td>
    <td>izapan610@gmail.com</td>
    <td>@izapan610</td>
  </tr>

  <tr>
    <td>Keyu Zhou</td>
    <td>email</td>
    <td>@zhoukeyu63-netizen</td>
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
      <td>Weapon to attack enemies (3 damage per attack).</td>
    </tr>
   <tr>
      <td>Lock</td>
      <td> <img width="77" height="74" alt="Screenshot 2026-04-21 at 01 58 36" src="https://github.com/UoB-COMSM0166/2026-group-27/blob/main/game/assets/lock.png" width="50"></td>
      <td>Needed in Level 3 to imprison the boss.</td>
    </tr>
    <tr>
      <td>Key</td>
      <td> <img width="77" height="74" alt="Screenshot 2026-04-21 at 01 58 36" src="https://github.com/UoB-COMSM0166/2026-group-27/blob/main/game/assets/key.png" width="50"></td>
      <td>Needed in Level 3 to imprison the boss.</td>
    </tr>
     <tr>
      <td>Cage</td>
      <td> <img width="97" height="94" alt="Screenshot 2026-04-21 at 01 58 36" src="https://github.com/UoB-COMSM0166/2026-group-27/blob/main/game/assets/cage.png" width="50"></td>
      <td>Needed in Level 3 to imprison the boss.</td>
    </tr>
    <tr>
      <td>Cat Ghost</td>
      <td> <img width="97" height="94" alt="seagull" src="https://github.com/UoB-COMSM0166/2026-group-27/blob/main/game/assets/little%20ghost.png"> </td>
      <td>Mini enemies around the maze.</td>
    </tr>
    <tr>
      <td> The Boss </td>
      <td> <img width="97" height="94" alt="boss-3" src="https://github.com/UoB-COMSM0166/2026-group-27/blob/main/game/assets/boss.png" />
</td>
      <td> The curse master of the mists from the Dark Ages.</td>
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

## 3.1 Ideation Process 

We used [Miro](https://miro.com/) to brainstorm ideas for our game. Initially, each team member selected a game they really enjoyed and listed key features that made it unique, which we could potentially include in our own game, such as combat, multiplayer options, and story modes (Figure 2).

<p align="center">
<b>Figure 2: </b>
  <i>Exsisting games for inspiration brainstorm</i> <br>

<img src = "https://github.com/UoB-COMSM0166/2026-group-27/blob/3cdb4f3052e580042f58e75d640b9036f2ad641f/5.%20readme%20docs/03.%20Game%20Inspo.jpg" width="90%">

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

In workshop 3, we developed prototypes for the two game ideas. This gave us a visual representation of what our two potential game ideas could look and function. This helped us compare how each team member pictured the potential game designs and encouraged discussion to agree on a shared vision for each game idea. It also helped us see how complex the mechanics were and if they could be realistically built (Figure 5 and 6).

<p align="center">
  <b>Figure 5: </b>
  <i>Paper Prototype for Lost in Bristol 
    developed during Workshop 3 </i> <br>
  </p>

<p align="center">
<img src= "https://github.com/UoB-COMSM0166/2026-group-27/blob/f6eb2dd289198ac83513909ae7b6078e33eb18dc/5.%20readme%20docs/03.%20paper%20protoype%20lost%20in%20bristol.gif" width= "30%">
</p>


<p align="center">
  <b>Figure 6: </b>
  <i>Prototype for The Will and the Fox </i> <br>
  </p>

We chose Lost in Bristol as our final game idea, after a group discussion, as it allowed us to incorporate features from most of the games we had listed during our inspiration brainstorm. We also felt that the Bristol theme could be represented more effectively by using cutscenes with Bristol-themed visuals. 

In contrast, Will of the Fox did not include cutscene elements and offered less flexibility for implementing Bristol-themed elements. We also thought it would be difficult to include progression or increased difficulty, as it focused on competitive multiplayer, whereas Lost in Bristol allowed for more structured progression across levels. Overall, Lost in Bristol provided a more achievable design and aligned with our team’s goals.

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


# 8. Sustainability, Ethics and Accessibility

While creating Lost in Bristol, our primary goal was to create an immersive experience, however, we also wanted to consider how our game will affect our community. We used design elements, such as interactive game-play "twists", game length and systems layout, to assess their potential impacts on the environment, the social factor and technical sustainability, in accordance to the Sustainability Awareness Framework (SusAF).

## 8.1 Environmental Impact
How much energy/resources does the system consume? This is a significant area when thinking about the environment.
Lost in Bristol is a browser-based game designed with HTML, CSS and JavaScript, so there's no need to install/require high-powered hardware. As a result, Lost in Bristol lowers CPU and GPU usage while users play it, thus reducing energy consumption per session.
Additionally, because the assets are lightweight and use simple rendering methods, the game runs well on lower-specification devices.

The design has been helpful over time. Users are less likely to upgrade to play this game because it doesn't require high-powered hardware, which can help reduce electronic waste. Long-term, if other games take this lightweight approach more broadly, it could lead to the development of more sustainable games in general.

On the other hand, SusAF also shows some trade-offs. While Lost in Bristol will be efficient in terms of energy consumed during each session, extended gameplay will result in increased total use of the device, which will increase the cumulative amount of energy consumed. Also, as more and more players access Lost in Bristol (if it becomes popular), these increased numbers will generate greater amounts of data traffic and user access to servers, which will require greater amounts of energy to be consumed to operate the data centres that will house the servers. This illustrates that environmental effects are affected both by design choices and by user habits and mass adoption of a system.

Important Environmental Factors:

* Energy savings per session due to lightweight design/browser-based applications
* Possible reduction in e-waste from reduced hardware needs over time
* Energy consumption may increase due to more extensive play-time and scaling

## 8.2 Technical Impact:
The technical aspect of a system focuses on its adaptability, maintainability and ongoing sustainability over time. Lost in Bristol was developed using standard web technologies, which allows it to run on most laptops and desktop browsers without requiring installation. This approach reduces compatibility issues and also allows users to access the game easily without requiring additional setup.

From an enabling perspective, the modular architecture of the system makes it easier to update and maintain. Player movement, enemy behaviour, and level design can all be altered separately since they are all independent components of the complete system. As a result of this modular design approach, development efforts to implement updates occur more quickly and are less costly than if the components were integrated into a single application. Consequently, the game can change continually without requiring a full rebuild, which contributes to its length of life.

The growth of the system also presents various risks. As new functionality is added, the overall size of the codebase grows and can become increasingly difficult to manage, resulting in what is commonly referred to as "technical debt". Technical debt typically reduces development efficiency and maintainability over time. The long-term effectiveness of the system can be negatively affected if adequate documentation and regular refactoring activities are not conducted.

This situation presents one critical trade-off between expanding the functionality of an application and keeping it simple. To create a sustainable technical design, good development practices(such as modularisation, version control and ongoing optimisation) must be used to maintain an appropriate balance between expanding application functionality and maintaining simplicity.

Important Technical Factors:
* There are other ways web-design can help with accessibility.
* Modular code allows for easy maintenance and provides a way to make future updates.
* As software becomes more complex, it will cause more technical debt.
* To achieve long-term sustainability, one must follow coding best practices.
  
## 8.3 Social Impact:
The social aspect of the game refers to inclusiveness, user experience, trust, and overall well-being of the user. The game Lost in Bristol has a user-friendly interface and simple controls, so people from any background or level of expertise can play. The accomodating useability of the game makes it much easier for a diverse range of users of varying levels of capability to become engaged with the game early on. Moreover, the game itself is an evolving project and we intend to reflect the diversity of our user base in a range of ways. For example, the user will be able to select characters of varying races, sexes and even species!

In the interest of accentuating participation and communication for the player- the game is not just a maze that can be used for exploration and navigating, but there is scope within the game for players to utilise problem solving and spatial skills, as well as cognitive reasoning in pursuit of progressing through the gane. Consistent game mechanics and predictable behaviour will also develop trust between users and the system, when a user knows they will get the same result by interacting with the system in the same way as they did before, they feel more confident while using the system.

Whilst the game does encompass a range of socially sustainable factors, there is opportunity to improve/develop the game further. We have attempted to make the game as inclusive for all players as possible- but currently, there are no advanced accessibility features in the game; for example, there is no mode suitable for colour blind persons, nor are there assistive options for persons with special needs such as visually impaired or partially-sightedness. These are issues that we will continue to work to find solutions for. Additionally, while the design of the game promotes engagement through immersion, there is a delicate balance between providing satisfaction and optimal engagement; excessive engagement may result in user fatigue and reduced quality of game performance. 

Important Social Factors:
* The simple design of games promotes user engagement and accessibility.
* Cognitive skills such as problem-solving are supported through gameplay.
* The lack of accessibility options ultimately limits the inclusivity of a game. 
* Increased engagement may negatively impact users' well-being.

# 9. Conclusion

## 9.1 Overall Reflection:
Developing Lost in Bristol has helped us to grow and challenge our capabilities as Software Engineers because it allowed us to merge features of both game design and technological implementation. As such, we put together a structured approach to creating the game that incorporated, the design of the maze, how the enemies behaved, how the levels progressed and this culminated in a game that has been developed closely in-line with the original concept. Looking back,the project can be defined as a process of problem solving. It involved continuous feature refinement and game-play improvement through consistent testing. This process taught us the value of flexibility and planning that later served as important lessons as we evolved our original ideas to develop a more balanced and functional game than we would have had if we had stuck with our initial plans.
## 9.2 Lessons Learned:
* The first significant thing we as a team learned was how critical it is to plan early. The original vision for the Maze-survival Game lacked clarity leading to a number of re-works during the course of development. This demonstrated an evolution in the original concept and illustrated the need for flexibility and planning early when developing interactive systems.
* The second major takeaway was that structuring code correctly is extremely important. As we progressed through the game with more and more features being added, we began to realise that unorganised code was making it increasingly difficult to debug. As a result, we decided to compartmentalise the code into smaller, modular components (such as player movement, enemy and level), which became easy to track and maintain the system efficiently. Overall, this reinforced the importance of good coding practices when it comes to sustaining and eventually scaling a project.  
## 9.3 Challenges:
While developing the game, the team faced various challenges for e.g., design issues presented significant challenges related to balancing gameplay difficulty with integrating game systems seamlessly. The earlier versions were either too simple or too difficult and required many iterations of required game design concepts (enemy statue, enemy spawn points, enemy controls). The random spawn points and continuing issues related to the Boss also had a significant impact on balance as well as the players experience (progression through the game). Additionally, integrating new features without any glitches was challenging as even minor deficiencies could significantly impact the systems that were interconnected, while continuing to manage time across team members was also difficult. The competitive character of the community and ongoing play testing have provided continuous feedback related to game product improvements; by providing an opportunity to coordinate efforts more effectively (structure of each task), game systems have continued to evolve and create a more balanced, stable gaming experience.
## 9.4 Immediate Future Work: 
For immediate future work, we are planning to improve performance, to create a more user-friendly UI and to include additional accessibility options, such as better visual contrast and control options. We may also enhance the current game by incorporating new levels, improving enemy AI and improving code structure for maintainability.
## 9.5 Sequel: Lost In Bristol 2
If we had the opportunity to develop a sequel, we could develop a more robust story and incorporate more Bristol-related landmarks and environments. We could introduce additional playable characters with unique abilities and backstories for more entertaining experience. Supporting mobile compatibility, including touch controls, will also make the game more accessible to a wider audience. Finally, we could include more dynamic level designs and methods of progression to enhance replay value, while sticking to the existing core concept.

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

Some initial pixel art drafts were created by Thanusha and Maniza, specifically the maze walls and the Lando Norris character, which were then used as references for generating these assets using AI (see Appendix ? for pixel art drafts). 

We also used AI tools to support development by helping debug code and identify errors. Additionally, AI was used to translate code snippets and labels, allowing each team member to read and understand the code in their preferred language.

The AI tools for these tasks were primarily Google Gemini and ChatGPT. 

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

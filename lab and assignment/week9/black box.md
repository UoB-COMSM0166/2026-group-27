## Black-box Testing (Normal / Boundary / Error Cases)

| Test ID | Type | Feature | Input / Action | Expected Result | Status |
|--------|------|--------|----------------|-----------------|--------|
| N1 | Normal | Shop | Coins ≥ price, click buy | Purchase succeeds, coins deducted | Pass |
| N2 | Normal | Movement | Press W/A/S/D | Player moves in correct direction | Pass |
| N3 | Normal | Teleport | Enter portal A | Player appears at portal B | Pass |
| N4 | Normal | Item | Pick up key | Key disappears and is collected | Pass |
| N5 | Normal | Combat | Shoot enemy | Enemy takes damage | Pass |
| N6 | Normal | Win Condition | Reach exit with objective | Level completed | Pass |

| B1 | Boundary | Shop | Coins = price | Purchase succeeds | Pass |
| B2 | Boundary | Shop | Coins = price - 1 | Purchase fails | Pass |
| B3 | Boundary | Health | Health reduces to 0 | Player dies | Pass |
| B4 | Boundary | Health | Health = max, pick health | Health does not exceed max | Pass |
| B5 | Boundary | Collision | Move along wall edge | No wall penetration | Pass |
| B6 | Boundary | Teleport | Stand at portal edge | Teleport triggers correctly | Pass |

| E1 | Error | Shop | Buy without enough coins | Purchase denied, warning shown | Pass |
| E2 | Error | Door | Open door without key | Door remains locked | Pass |
| E3 | Error | Input | Spam clicking buttons | No crash, stable system | Pass |
| E4 | Error | Death | Move after death | No response / disabled controls | Pass |
| E5 | Error | Game State | Shoot in menu/shop | No effect | Pass |
| E6 | Error | Teleport | Rapid enter/exit portal | No glitch or infinite loop | Pass |

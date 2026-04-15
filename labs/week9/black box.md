# Black-box Testing

## Normal
| Test ID | Feature | Input / Action | Expected Result | Status |
|--------|--------|----------------|-----------------|--------|
| N1 | Shop | Coins ≥ price, click buy | Purchase succeeds, coins deducted | Pass |
| N2 | Movement | Press ↑/←/↓/→ | Player moves in correct direction | Pass |
| N3 | Teleport | Enter any portal | Player appears at a random portal | Pass |
| N4 | Item | Pick up key | Key disappears and is collected | Pass |
| N5 | Combat | Shoot enemy | Enemy takes damage | Pass |
| N6 | Win Condition | Reach exit with objective | Level completed | Pass |

## Boundary
| Test ID | Feature | Input / Action | Expected Result | Status |
|--------|--------|----------------|-----------------|--------|
| B1 | Shop | Coins = price | Purchase succeeds | Pass |
| B2 | Shop | Coins = price - 1 | Purchase fails | Pass |
| B3 | Health | Health reduces to 0 | Player dies | Pass |
| B4 | Health | Health = max, pick health | Health does not exceed max | Pass |
| B5 | Collision | Move along wall edge | No wall penetration | Pass |
| B6 | Teleport | Stand at portal edge | Teleport triggers correctly | Pass |

## Error Cases
| Test ID | Feature | Input / Action | Expected Result | Status |
|--------|--------|----------------|-----------------|--------|
| E1 | Shop | Buy without enough coins | Purchase denied, warning shown | Pass |
| E2 | Door | Open door without key | Door remains locked | Pass |
| E3 | Death | Move after death | No response / disabled controls | Pass |
| E4 | Game State | Shoot in menu/shop | No effect | Pass |
| E5 | Teleport | Rapid enter/exit portal | No glitch or infinite loop | Pass |

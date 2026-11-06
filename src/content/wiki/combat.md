---
title: Combat
description: Sequential attacks, counterattacks, combat types and Guardian attacks.
section: The Battlefield
order: 12
---

Combat in Guardian is **sequential, not simultaneous**:

1. The **attacker** deals its damage first.
2. If the defender **survives**, it **counterattacks automatically**, as long as the attacker is within its own range.
3. If the attack **destroys** the defender, there is **no counterattack**.

That's the tactical heart of the game. Should you hit the big Summon first and risk the counter? Should you soften it up with a ranged unit that it can't hit back?

## Declaring an attack

A Summon needs two things to attack:

- its **Attack token** (unspent this turn), and
- to be **active**: not deactivated.

Attacking spends the token and **deactivates the Summon immediately**. A Summon attacks at most once per turn unless a card says otherwise. Declaring an attack goes on the Stack, so both players get a chance to respond before damage is dealt. Assault and Ward triggers resolve before the damage; Onslaught resolves after the fight.

If the target leaves the board before the attack resolves, the attack fizzles and is still spent.

## Damage

- **Physical damage** (from Attack) is reduced by the defender's **Defense** first. The rest comes off its **Life**.
- **Magical damage** (from Magic) is reduced by **Resistance** first, then comes off Life.
- Defense and Resistance **wear down** during the turn as they absorb damage, and **regenerate in the End Phase**. Life does not.
- A Summon at 0 Life **perishes** and goes to its owner's graveyard.

## Combat types

A Summon's combat type decides what it deals and how far it reaches. Distance counts like movement: an orthogonal neighbor is 1 away, a diagonal neighbor is 2.

| Combat type | Reach and damage |
|---|---|
| **Close Combat** | Physical, adjacent fields (distance 1). |
| **Ranged Combat R2** | Physical, **exactly** distance 2. Cannot hit adjacent fields. |
| **Ranged Combat R3** | Physical, exactly distance 3. |
| **Ranged Combat R2-3** | Physical, distance 2 or 3, never adjacent. |
| **Bi Combat R2** | Physical, both adjacent and distance 2. |
| **Magic Combat R1 / R2** | Magical. R1 reaches distance 1, R2 reaches distance 1 and 2. |
| **Dual Combat R1 / R2** | Physical *or* magical, chosen each attack. Same reach as Magic. |
| **Peaceful** | Cannot attack. |

The same reach applies to counterattacks. A Close Combat Summon shot at from distance 2 **cannot strike back**.

## Counterattacks

Counterattacking isn't an action. It needs no token, and even a deactivated or fully spent Summon counterattacks. Only distance, skills like **Swiftstrike**, or effects that say so (such as **Freeze**) stop it.

## Attacking with your Guardian

- Your Guardian can attack **enemy Summons in your own Guarded Zone**. This stops an opponent from locking you out by filling your back row.
- A Guardian attack costs **2 Neutral Energy** and uses the Guardian's action for the turn.
- Guardians deal **physical**, **magical** or **dual** (hybrid) damage. They have no range, so range-based protections like Flying don't stop them.
- **Guardians never counterattack and are never counterattacked.**

## Attacking the enemy Guardian and Buildings

A Summon standing in the **opponent's Guarded Zone** may attack their Guardian, or one of their Buildings.

- While an enemy Summon with **Guardprotect** stands in its Guarded Zone, the enemy Guardian can't be attacked; you must deal with the protector first. **Breach** ignores this.
- **Buildings** never counterattack. They have Defense but no Resistance, so magical damage goes straight to their Life.

## Grace

A Summon that entered play **this turn and hasn't done anything** cannot be attacked while it stands in its own **Guarded Zone**. Grace protects only against attacks, not against Spells, abilities or Traps. It ends as soon as the Summon acts, leaves the Guarded Zone, or the turn ends. Summons with Guardprotect or Devotion never get Grace.

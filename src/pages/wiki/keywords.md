---
title: Keywords
description: Glossary of all common Guardian™ keywords
slug: "keywords"
category: rules
draft: false
layout: "../../layout/wikilayout.astro"
---

Guardian features a lord of Keywords. Some are designed to shorten reusable game effects, while others refer to a abilities Summons have. From "Manifest" to "Void" to "Zealing", you'll find all the relevant Keywords here to understand what cards do.

<section class="rules-section">

## Element Specific Keywords

### Defile X

darkness coded

### Swarm X

Game State Check for tripple elemental combination of Darkness, Wind and Nature
Checks if X amount of summons are in play under your control

</section>

<section class="rules-section even">

## Shorthands for ever re-occuring effects

<div class="keyword-heading">
<h3 class="keyword agility">Agility</h3>
<span class="type-badge trigger">trigger</span>
</div>

is a summon-based triggered ability that activates when a summon uses its own **movement action**.

- **Trigger Condition:** Agility only triggers **when the summon itself initiates movement** using its **movement action**.

- **Non-Triggering Cases:** Agility **does not trigger** if the summon is moved by an outside effect — for example, if it is pushed, teleported, or repositioned by a spell or another ability.

- **Distance Irrelevant:** The distance the summon moves does not affect whether Agility triggers. It will trigger even if the movement is only a single field, as long as it was a summon-initiated **movement action**.

- **Effect:** When the condition is met, the specific effect listed on the card with Agility will resolve.

#### Example:

If a summon with Agility uses its movement action to move 2 spaces, Agility will trigger and its listed effect will occur. However, if the same summon is teleported 1 space by a spell, Agility does not trigger.

<div class="keyword-heading">
<h3 class="keyword assault">Assault</h3>
<span class="type-badge trigger">trigger</span>
</div>

Assault is a summon ability that triggers when the summon **initiates an attack**.

- **Trigger Condition:** Assault triggers only when the summon declares an attack (i.e., it is the attacker). It does not trigger during counterattacks or when the summon is attacked, unless an effect explicitly states otherwise.

- **Timing:** The effects of Assault are active only during that specific attack. They do not persist beyond the attack — they end immediately after the attack is resolved.

- **Effect Duration:** The Assault effect is temporary. It does not last until end of turn, and it is not a static or continuous ability unless otherwise specified.

- **Stacking:** If a summon has multiple instances of Assault or additional text modifying the Assault effect, these effects apply simultaneously during the attack.

#### Example:

A summon with **_Assault — “Get +2A.”_** will receive the bonus only while it is actively attacking. The bonus disappears after the attack resolves and does not affect counterattacks or any other phase.

<div class="keyword-heading">
<h3 class="keyword skill">Company</h3>
<span class="type-badge check">check</span>
</div>

Company is a _static conditional ability_ that is active **while this summon is adjacent to a friendly summon**.

- **Condition:** Company becomes active only **when this summon is orthogonally adjacent** (above, below, left, or right) to another **friendly summon**. Diagonal adjacency does not count.

- **Type:** This is **not a triggered ability** and does not use the stack. It is **checked continuously**.

- **Effect Duration:** The effect from Company is **active only as long as the condition is true**. If the summon is no longer adjacent to a friendly summon, the effect ends immediately.

- **Effect Scope:** The effect granted by Company depends on the specific card — it may modify stats, grant abilities, or influence other rules.

#### Example:

A summon with **_Company — “Get +1A”_** will receive the bonus only while it is orthogonally adjacent to another friendly summon. If the adjacent ally moves or is destroyed, the bonus is lost instantly.

### Deep Infiltration

Trigger on first time entering of enemy guarded zone

<div class="keyword-heading">
<h3 class="keyword demise">Demise</h3>
<span class="type-badge trigger">trigger</span>
</div>

Demise is a _triggered ability_ that activates when the permanent it’s on is destroyed.

- **Trigger Condition:** Demise triggers when this permanent is destroyed and sent to the graveyard.

- **Who Can Have It:** Any permanent — including summons, buildings, items, or other board-bound cards — can have Demise.

- **Timing:** Demise triggers and goes on the stack immediately after the permanent is destroyed, following normal priority rules.

- **Effect Duration:** The listed Demise effect resolves after the death, even if other effects are happening simultaneously.

- **Does Not Trigger:** Demise does not trigger if the permanent is removed from play without dying, such as being sent to the void or returned to a players hand, deck or treasure chest.

#### Example:

A summon with Demise — “Draw a card from your deck.” will let you draw a card when that summon is perishes and sent to the graveyard. If it is sent to the void instead, the Demise ability does not activate.

### Devotion

protects non devotion summons you control in same zone

### Dominate

trigger on kill

### Infiltrate

trigger on first time entering enemy territory

### Manifest

trigger on enter

### Onslaught

trigger after attacking

### Perpetual

Indicator for global, permanent effect

### Resonance

Indicator for re-occuring trigger

</section>

<section class="rules-section">

## Summon Skills

### Absorb

Regenerates life when dealing combat damage

### Contagious

poisons when taking combat damage

### Flying

Evasion

### Guard Protect

Protection for Guardians while this summon is in your guarded zone

### Loner

If this card is not adjacent to friendly summons, this is active

### Spectral

immune to physical damage

### Venemous

Causes status Ailment (poisoned) on hit

### Strain X

negative skill that reduces your maximum energy storage capacity

### Surpress

negative skill that turns off all abilities of your guardian

</section>

## Summon Skills with Elemental Identity

### Shadow Cloak

Darkness ability which checks readiness of summon, grants protection from spells and abilities

### Shadow Step

Darkness ability which checks readiness of summon, grants protection from attacks

### Anguish / Agonize

Darkness Skull which causes Status Ailment called "Agony"

## Card Type Specific Keywords

### Blessing

building (shrine) temporary boon

### Full Potential

Alchemy related trigger

### Sacrifice

building (shrine) activate ability

<style>

    .rules-section {
    background-color: var(--clr-neutral-800);
    padding-inline: 1.5rem;

    &.even {
        background-color: var(--clr-neutral-700);
    }
  }

    </style>

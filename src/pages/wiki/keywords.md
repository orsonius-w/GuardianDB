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

game state check that is active while this card is adjacent to a friendly summon

### Contagious

poisons when taking combat damage

### Deep Infiltration

Trigger on first time entering of enemy guarded zone

### Demise

trigger on death

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

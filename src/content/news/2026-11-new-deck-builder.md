---
title: A new Deck Builder, and a smoother match
description: "The Deck Builder is rebuilt from scratch with formats and a playtest, and matches feel far smoother: drag and drop, live card faces and cards that fly."
date: 2026-11-16
category: Update
image: /images/client/deck-builder.webp
---

Two big changes landed in the [client](/play/) this week: a completely new Deck Builder, and a match screen that finally feels smooth.

## The new Deck Builder

The Deck Builder now looks like the rest of the game, and it works differently too:

- **One scrolling grid** of cards instead of nearly 200 pages. Scroll with the mouse wheel through whatever your filters leave.
- **One filter bar:** search, the eleven element orbs, the cost coins, a type list, the rarity balls, the format and the sort order. Active filters show as chips you can remove one by one.
- **Copy counters:** under every card, a diamond for each copy allowed, lit for each copy in your deck.
- **Your deck on the right:** your Guardian's art as a banner with the deck's name, tabs for the deck, sideboard and Treasures, the cost curve and the deck listed by type.

<figure>
  <img src="/images/news/deck-panel.webp" alt="The deck panel: Leonhart's art as a banner, the Deck, Sideboard and Treasures tabs, format badges, the cost curve and the deck listed by type" width="544" height="1008" loading="lazy" />
  <figcaption>The deck panel, with the format badges and the cost curve.</figcaption>
</figure>

## Formats

Decks can now be checked against three formats:

- **Standard:** the normal rules.
- **Singleton:** one copy of each card. Cards without a copy limit, like the basic Workers, are not affected.
- **Pauper:** Commons only. Guardians and Treasures have no rarity and are always allowed.

Badges on your deck show which formats it is legal in, and say why when it isn't. Pick a format in the filter bar and the cards it does not allow are greyed out.

## Playtest

Not sure your deck works? **Playtest** gives you a sample opening hand from the deck as it is right now, with Draw and New hand buttons, or starts a game against the computer and brings you straight back to the builder afterwards. Unsaved changes are included.

## A smoother match

The last dozen builds went into how a match feels:

- **Drag and drop:** drag a card from your hand onto the board to play it. Clicking still works.
- **Cards fly as themselves:** a drawn card lifts off your deck and lands in your hand, a played card flies to the Stack, its field or your Workers, a discarded card to your graveyard. Online, you see your opponent's cards move too.
- **Live card faces:** every card is now drawn by the game from its art and data, so a changed cost or stat shows on the card itself, everywhere.
- **Far fewer hitches:** redrawing the screen after an action took around 30 ms and now takes about 11. A frame rate counter (F3, or "Show FPS" in the Graphics options) shows how your machine is doing.

All the details are in the [patch notes](/play/#patch-notes).

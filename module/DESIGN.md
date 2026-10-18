---
name: DPS Intelligence
description: Red Bull DevRel intelligence surface — agent-built engagements on the Cosmos design system
colors:
  primary: "#DB0A40"
  primary-lighter: "#F50B48"
  primary-darker: "#C3093B"
  accent-focus: "#1B6AEE"
  accent-inform: "#E06600"
  accent-positive: "#159D48"
  text-dark: "#000F1E"
  text-light: "#FFFFFF"
  surface-light: "#F8F8F8"
  surface-light-lighter: "#FFFFFF"
  surface-light-darker: "#EFEFEF"
  surface-dark: "#00162B"
  surface-dark-darker: "#000F1E"
  glass-dark-10: "rgba(0,15,30,0.1)"
  glass-dark-5: "rgba(0,15,30,0.05)"
  glass-light-10: "rgba(255,255,255,0.1)"
typography:
  display:
    fontFamily: "Bull, Helvetica, sans-serif"
    fontSize: "clamp(45px, 8vw, 86px)"
    fontWeight: 800
    lineHeight: 1
  headline:
    fontFamily: "Bull, Helvetica, sans-serif"
    fontSize: "clamp(37px, 6vw, 60px)"
    fontWeight: 700
    lineHeight: 1.067
  title:
    fontFamily: "Bull, Helvetica, sans-serif"
    fontSize: "clamp(31px, 4vw, 41px)"
    fontWeight: 700
    lineHeight: 1.098
  body:
    fontFamily: "'Bull Text', Helvetica, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.412
  label:
    fontFamily: "'Bull Text', Helvetica, sans-serif"
    fontSize: "14px"
    fontWeight: 500
    lineHeight: 1.357
  micro:
    fontFamily: "'Bull Text', Helvetica, sans-serif"
    fontSize: "12px"
    fontWeight: 400
    lineHeight: 1.25
rounded:
  none: "0"
  small: "2px"
  medium: "6px"
  large: "8px"
  full: "9999px"
spacing:
  xx-tight: "4px"
  x-tight: "8px"
  tight: "12px"
  normal: "16px"
  loose: "24px"
  x-loose: "32px"
  xx-loose: "40px"
  xxx-loose: "64px"
  xxxx-loose: "80px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.text-light}"
    rounded: "{rounded.large}"
  button-primary-hover:
    backgroundColor: "{colors.primary-lighter}"
  button-secondary:
    backgroundColor: "{colors.surface-light-darker}"
    textColor: "{colors.text-dark}"
    rounded: "{rounded.large}"
  card:
    backgroundColor: "{colors.surface-light-lighter}"
    textColor: "{colors.text-dark}"
    rounded: "{rounded.large}"
---

# Design System: DPS Intelligence

## Overview

**Creative North Star: "The Race Control"**

DPS Intelligence is mission-control for developer-relations work: telemetry about what agents are building, delivered with pit-wall calm. The visual world is Red Bull **Cosmos** — the company's consumer design system — consumed as web components (`@cosmos/*`) whose styling ships inside the components themselves. The platform's own chrome maps Gravity tokens (`--gravity-*`) that carry the same brand values (text `#000F1E`, focus `#1B6AEE`, glass borders at 10% alpha); where both namespaces exist, Cosmos is normative and the Gravity layer is an alias.

Density is informational, never decorative. Red (`#DB0A40`) is the brand's one authoritative shout: primary actions and live/active states only. Everything else speaks in Navy-Black, neutral surfaces, and thin glass borders. Motion exists to report state change, not to animate mood. Accessibility (WCAG 2.1 AA) is a usage rule of the system, not an audit phase.

**Key Characteristics:**
- Role-based color: primary sparingly; never for errors, instructions, or large surfaces
- Flat by default; elevation is level-constant and never state-reactive
- Thin glass borders (`glass-*-10`, 1px) as the default separation mechanism
- Red is a status event, not a decoration

## Colors

One brand voice, strict roles. Primary Red carries identity; hierarchy is built from neutral surfaces and text subtlety, not from hue variety.

### Primary
- **Cosmos Red** (#DB0A40): The identity color. Primary buttons, live/active indicators only — used sparingly, never on content backgrounds, never to convey errors or instructions.
- **Ignition Red** (#F50B48): `lighter` variant for hover/interactive states of primary elements.
- **Brake Red** (#C3093B): `darker` variant for pressed states. Identical value to negative — context disambiguates.

### Accent
- **Signal Blue** (#1B6AEE): Focus affordance (`accent-focus`) — the interaction channel, deliberately distinct from brand red.
- **Hazard Orange** (#E06600): `inform` — warnings and instructional/emphasis copy. Errors are `inform` or `negative`, never primary.
- **Go Green** (#159D48): `positive` — success, healthy, verified states.

### Neutral
- **Navy Black** (#000F1E): Text on light surfaces (`text-dark`); doubles as `surface-solid-dark-darker`.
- **Stage White** (#FFFFFF) / **Paper** (#F8F8F8) / **Cardboard** (#EFEFEF): Light-mode surface ladder (`lighter → base → darker`); the ladder itself expresses hierarchy.
- **Midnight Deck** (#00162B): Default dark-mode background (`surface-solid-dark`).
- **Glass tints** (rgba(0,15,30,α) / rgba(255,255,255,α), α ∈ 5,10,20,45,60,80,90): Overlays on surfaces — darkening/highlighting areas and dividing content (`glass-*-10` for dividers).
- **Text Subtle**: `rgba(0,15,30,0.6)` / `rgba(255,255,255,0.6)` — secondary copy must use the 60% variants, not an ad-hoc gray.

**Named Rules**
**The One Shout Rule.** Red appears on at most one interactive element per view region. Its rarity is the signal.
**The Role Not Decoration Rule.** Every color instance must answer "which role?": primary / surface / glass / text / accent. If it answers "vibes", it is wrong.

## Typography

**Display Font:** Bull (variable: Bull VF), Helvetica fallback
**Body Font:** Bull Text (variable: Bull VF), Helvetica fallback
**Label/Mono Font:** No system mono; telemetry-style metadata uses Bull Text at `xx-small`/`x-small` with restrained letter-spacing. (Space Mono/Grotesk inside generated modules is the module's private world, not the platform's.)

**Character:** A tight, sporty grotesque at bold weights commands; body copy stays plain-text calm. Contrast in the type system comes from weight (400→800) and size (12→86px), never from italics or ornament.

### Hierarchy
- **Display** (Bull 800, 45→86px, lh 1): Page-level heroes only; `spacing-top .56em`.
- **Headline** (Bull 700, 37→60px): Section openers.
- **Title** (Bull 700, 31→41px): Panel and modal titles.
- **Large/Medium** (Bull 700 24px / Bull Text 400 20px): Substructure.
- **Body** (Bull Text 400/500, 17px, lh 1.41): Default reading size; max ~75ch.
- **Label** (Bull Text 500, 14px): Controls, metadata rows, chips.
- **Micro** (Bull Text 400, 12px, lh 1.25): Timestamps, run ids, telemetry.

**Named Rules**
**The Weight-Ladder Rule.** Emphasis moves along weight (regular→medium→bold→heavy) and size; color is not an emphasis device for copy.

## Layout

Breakpoints: `small 0 / medium 650px / large 1000px / x-large 1200px / xx-large 1350px`. Spacing scale is fixed 4→80px; rhythm rules: outside padding uses `x-loose` (32px) and up; gaps between elements stay below that (`xx-tight`..`normal`). Panels are two-column at `large`+ (conversation left, canvas right), stacked below `medium`. Proximity governs grouping: related controls share `x-tight`, groups separated at `loose`+.

## Elevation & Depth

Depth is mostly tonal: surface ladder + 1px glass borders. When elements must genuinely float, the shadow vocabulary is exactly two levels, both whisper-quiet (Navy at 2–6% alpha):

### Shadow Vocabulary
- **`1-above`** (`0 8px 12px rgba(0,15,30,.04), 0 2px 4px rgba(0,15,30,.02)`): Default lift for cards, popovers-above-lists, floating panels — applied to the entire element.
- **`2-above`** (`0 16px 24px rgba(0,15,30,.06), 0 4px 8px rgba(0,15,30,.02)`): Only for temporary overlays (tooltips, large modals), combined with a full-screen glass backdrop (`glass-*-45/60/80`).

**Named Rules**
**The Level-Lock Rule.** Elevation never changes because of interaction — no hover-lift, no press-settle. A card assigned `1-above` keeps it through every state.
**The Frame Rule.** Page frames (navigation, footers, panel seams) get zero elevation, always.

## Shapes

Form language is restrained-technical: radius is *smaller for more minor/nested elements* — **large (8px)** is the component default (buttons, cards), **medium (6px)** for inputs and nested surfaces, **small (2px)** for chips/tags/hairline accents, **none** for full-bleed frames, **full** only for round icon buttons and status dots. Corner treatment is identical across all states of an element. Borders: `thin` (1px) default, `medium` (2px) only where stronger division/underline is required; color from surface or glass (`glass-*-10` dividers) — never accents.

## Components

Cosmos components are the primary vocabulary; platform snowflakes fill genuine gaps by reusing Cosmos primitives directly (see Do's). The template registry (`react-esm-ts`) maps `Cosmos*` React wrappers to the same `kind`/`shape`/`size` API.

### Buttons (`cosmos-button`)
- **API:** `kind: primary | secondary | tertiary | bare | link | cover-up` (default `primary`), `size: small | medium | large` (default `medium`), `shape: pill | rectangle | square | circle`, `busy` (loading), `appearance: dark | light`, `iconPlacement`.
- **Primary:** `{colors.primary}` fill, light text, radius large (8px); hover → `primary-lighter`, pressed → `primary-darker` (color-only; no motion).
- **Secondary / Tertiary:** neutral surface treatment, text-dark; hierarchy through fill vs outline vs bare.
- **Focus:** `accent-focus` blue ring via the focus utility — always the blue, never red.
- **Character:** restrained and instant — state via color token and `busy`, not decoration.

### Cards / Containers
- Radius large (8px); light-mode background `surface-light-lighter` or transparent on `surface-light`; dividers `glass-dark-10`; elevation optional and level-locked (`1-above` for feed/stack rails, consistently across the group).

### Inputs / Fields
- `cosmos-input` family: radius medium (6px), 1px glass/surface border, focus via `accent-focus`; validation copy uses `inform`/`negative` roles — never brand red.

### Chips & Status
- 2px radius, glass-5/10 background, label/micro type; live status expressed with a 6–8px dot in `primary`/`positive`/`negative` + adjacent `text` copy — color never carries meaning alone.

### Navigation
- Platform rail + segmented mode control (native buttons, `role="radiogroup"`, selection always via `aria-checked` visible in the real DOM — host components that swallow state attributes don't qualify). Frame rule applies: no elevation on nav.

### Signature Component: the Agent Pane
Left = conversational timeline (Cosmos text roles, glass separators); right = scaled preview canvas on a `surface-dark-darker` stage with a borderless iframe and a flat, non-elevated chrome strip. Telemetry (cost, duration, status dot) sits in micro type. The preview stage never floats.

## Do's and Don'ts

### Do:
- **Do** pull every color from the token list; state roles explicitly (primary/surface/glass/text/accent).
- **Do** use `text-*-subtle` (60% alpha) for secondary copy — e.g. `rgba(0,15,30,0.6)`.
- **Do** treat `1-above` as the default (and ceiling for persistent) elevation; `2-above` + glass backdrop only for modal-scale overlays.
- **Do** size borders at 1px `thin` with `glass-*-10`; reserve 2px for deliberate stronger division.
- **Do** nest radii: 8 outside → 6 inside → 2 chips.
- **Do** build snowflakes by nesting existing Cosmos components first, then reusing primitives (`--cosmos-*`) — kebab-case layer names, `-local` affix for local-only pieces, and feed the gap back to the design-system team (Echo).
- **Do** meet WCAG 2.1 AA when composing layouts.

### Don't:
- **Don't** use primary red for error or instructional copy — that's `inform`/`negative`.
- **Don't** put red (or any accent) on borders, dividers, or large content backgrounds.
- **Don't** animate elevation on hover/focus/press — level-locked only.
- **Don't** elevate page frames: navigation, footers, panel seams stay flat.
- **Don't** change an element's radius between states.
- **Don't** invent spacing values between the 4→80px steps.
- **Don't** restyle the platform from inside a generated engagement module — module-internal worlds (like the Tetris canvas) are exempt from platform tokens by design, and must not reach into platform chrome.

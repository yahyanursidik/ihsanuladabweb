# Design - Yayasan Pendidikan Ihsanul Adab

## Audience and Purpose

Families, adult learners, educators, and Islamic education institutions.
Help visitors understand the right learning path, compare programs, and prepare
an informed conversation with the team.

## Shared System

- Institutional editorial style with clear reading order and restrained motion.
- Green and gold express the foundation's identity. Use neutral, bright surfaces
  for practical information so long pages remain easy to read.
- Newsreader for display, IBM Plex Sans for body, IBM Plex Mono for small step
  numbers. Use the existing system fallbacks when web fonts are unavailable.
- Keep letter spacing at zero. Use fixed type sizes with breakpoint changes.
- Tokens live in `tokens.css`. New colors must become named tokens.
- Controls have a visible keyboard focus state and at least 44px touch height.
- Use Lucide icons, native select controls, and details/summary for FAQs.
- Use full-width sections and unframed content. Cards are reserved for repeated
  items and have a radius of no more than 8px.

## Page Families

- Home: learning pathways followed by a searchable, filterable program catalogue.
- Program: existing subject-specific hero and learning content, a concise summary,
  preparation, practical questions, and relevant next programs.
- About and careers: institutional story and contribution paths, retaining their
  existing content ownership and navigation destinations.

## Program Variants

- IAPA and home-based learning: calm green, family routines, practical guidance.
- The Father Project: grounded green, responsibility and family leadership.
- The Fitrah Journey: muted berry and blush with olive accents, muslimah audience.
- Ushuluna: olive and green, foundations and a clear sequence of study.
- HTA and IAIEE: blue accents, neutral surfaces, professional development and quality.
- PKGQ: green, careful recitation and child-appropriate teaching.
- DeenUp: cyan with green and gold, readable and approachable for teenagers.

## Navigation and Motion

- Content uses an 80rem outer measure, shared gutters, and 40-64px section spacing.
- Section headings use 28px on mobile and 36px on desktop; item headings use
  the body face at 18-20px. Long section headings should be shortened.
- Grids collapse according to the available reading width. A desktop grid must
  not leave long paragraphs in tracks narrower than 160px.
- Viewport-based gutters belong to full-width sections, not their nested panels.
- Overview and guide sections share the page gutter; do not reset the
  `.program-inner` overview container when clearing legacy inner wrappers.
- Multi-row footers keep closing statements above metadata. Metadata columns
  must not compress the brand or overlap navigation links.
- HBL flow steps occupy the full section width, in four desktop columns,
  two tablet columns, and a single mobile column.
- Home navigation is one compact desktop row and a 72px mobile app bar.
- Extended HBL curriculum details are native disclosures; their content remains
  available to keyboard and screen-reader users.

- Preserve bottom navigation on mobile. Account for device safe areas.
- Only one navigation disclosure is open at a time. Close on selection, outside
  click, and Escape. Restore focus to the menu trigger on Escape.
- Mark the current in-page destination while scrolling.
- Menus must fit within the viewport and remain scrollable on short screens.
- Honor reduced motion across all pages. Keep content available without JavaScript.

## Content and Media

- Write Indonesian that is concrete, respectful, and appropriate to each audience.
- Use existing facts for durations and ages. Do not invent prices, registration
  dates, certificates, partner logos, outcomes, or testimonials.
- Direct current availability, terms, and fees to the administration team.
- Preserve the approved faceless imagery and modest dress. Use existing program
  imagery in the catalogue; avoid unrelated decoration.
- Use direct WhatsApp links with the program name prefilled. Opening a link does
  not send a message automatically.

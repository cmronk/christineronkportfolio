---
title: "Growth Track Manager"
summary: "I built a tool in Rock RMS that helps campus teams track every person moving through Growth Track, our onboarding process, so fewer people fall through the cracks."
category: "Systems & Integrations"
tools: ["Rock RMS", "Lava", "SQL"]
problem: "After Growth Track, people stalled between steps: a background check never filled out, an interview never scheduled. Staff couldn't see what each person was missing, so they assumed people had lost interest."
approach: "I spent a few weeks working with our largest campus's Growth Track team, the people who would use it most, and shaped it around their day-to-day follow-up work."
decisions: "We already had the data in a report, but a report doesn't get used. I turned the same query into cards on a board, then added quick KPIs, a class date filter, actions, and a key so staff could follow up right from each person."
result: "Our largest campus uses it almost daily, and our smaller campuses began using it in October 2026. Staff can see at a glance who is falling through the cracks."
quote: "Even if someone doesn't respond, our staff makes sure that everyone who wants to serve and become a member can."
order: 3
draft: false
illustration: "growth-track"
---

## The problem

Growth Track is how people get connected at our church. They finish it, sign a membership card, and take next steps toward serving on the Dream Team: a leadership application, a background check, then an interview with a coach.

Every step is a place someone can get stuck. We tried tracking this with connection requests, but they didn't fit. Staff needed to send a background check or membership card link, see whether someone was a minor and didn't need a check, and see where each person was in their discipleship journey. Connection requests couldn't show any of that, and it was hard to tell when we were still waiting on a coach to do an interview. Other campuses used spreadsheets, so unless someone actively followed up, people didn't make it through.

The cost was real. Some people never got an interview and lost interest. Others never filled out a background check, so they never moved to the next step. We assumed they didn't want to serve, when often they were missing one thing we could have helped with.

## How I approached it

I built the Growth Track Manager with our largest campus, working directly with the Growth Track team for a few weeks. They knew where people got stuck and what they needed to do about it, so we shaped every column, icon, and action around their real follow-up work.

We already had a report built on the right query. The data was there, but the report wasn't effective, because a list of rows doesn't tell you what to do next. So I kept the same query and changed how it was presented: every person became a card on a board, in a column for each step they're missing. The steps aren't strictly in order, so someone who still needs both a background check and a leadership application shows up in both columns.

- **Needs Membership Card**
- **Needs Leadership App**
- **Needs Background Check**
- **Need to Send to Coach**
- **Waiting on Interview**
- **On Dream Team**
- **Outstanding:** everyone who still needs something, oldest first

Quick KPIs across the top show how many people completed Growth Track in the selected class dates, and what share of them have signed a membership card and joined the Dream Team.

## Key decisions

- **Cards instead of a report.** The same data became something staff could scan in seconds. Each column a person appears in is something they still need, so staff can see every gap at once.
- **A familiar layout, built around their workflow.** The board looks like Rock's connection request board, so staff knew how to read it right away. But it works differently. Cards aren't requests that someone has to create and move by hand. Each column checks people's records against its own criteria, so a person appears in every column where they're missing something and drops out as soon as it's done.
- **Actions on every card.** Each icon on a card does its action directly: resend a membership card link, send a text, or create a connection request. Clicking a person's name opens their profile. Staff don't mark steps done for people. They send the nudge, and when the person completes the step, the card updates on its own. The interview is the one exception, since a coach completes it. Seeing the gap and sending the nudge happen in the same place.
- **A key for the icons.** Each card shows small status icons: background check requested or complete, minor, about to turn 18, already serving. A key on the page means nobody has to memorize them.
- **Quick KPIs at the top.** Three numbers show how many people completed Growth Track, how many signed a membership card, and how many joined the Dream Team, with percentages. Staff know how a class is doing before they look at a single card.
- **An Outstanding column, sorted by wait time.** The step columns show what's missing. The Outstanding column shows who has been waiting longest. Everyone who still needs something appears there once, ordered by how many days it has been since their Growth Track class, and their card shows everything they're missing with a button for each. Staff can start at the top and work down.
- **Filter by class date.** Teams can pull up one Growth Track class and follow it through every step, which turns follow-up into a focused list instead of an endless one.
- **Filters that match how teams work.** A campus picker and a "Hide people already on Dream Team" option keep the board focused on who still needs help.

## The result

Our largest campus now uses the Growth Track Manager almost daily as part of their follow-up rhythm. After proving it there, we rolled it out to our smaller campuses in October 2026.

The biggest change is in how staff work. They're more intentional, and they can see at a glance who is falling through the cracks. Even when someone doesn't respond or loses interest, our team is making sure that everyone who wants to serve and become a member can.

Not everyone will join the Dream Team, and that's okay. What matters is that we're no longer losing or forgetting people. Every person gets followed up with, and even the ones who aren't ready yet know someone noticed. My hope is that they stick around, and that some of them start serving down the road.

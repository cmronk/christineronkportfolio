---
title: "Ministry Dashboards"
summary: "I built dashboards on reliable data sources, including one that brings engagement from a vendor-built devotional app into Rock, so leaders can see how people are actually engaging and where follow-up is falling behind."
category: "Data & Reporting"
tools: ["Rock RMS", "SQL", "Lava", "[Vendor app / integration method]", "[Charting library]"]
problem: "Leaders wanted to make decisions from data, but reporting criteria kept changing and some data sources weren't consistently maintained, so numbers were hard to trust."
approach: "I built dashboards on stable, well-maintained sources: engagement data from our devotional app, and Rock's core connection request process."
decisions: "I chose data sources that stay accurate on their own, rather than fields that depend on someone remembering to update them. [Add one more decision, e.g. what each dashboard deliberately leaves out.]"
result: "[How leaders use these now, and any decisions they've made because of them.]"
order: 9
draft: true
---

## The problem

Our leaders wanted to use data to understand how people were engaging and growing. But reporting criteria kept shifting: one quarter a metric came from steps, the next from a person attribute, and some of those sources weren't maintained consistently. Dashboards built on that kind of data become hard to trust, and a dashboard nobody trusts doesn't get used.

## How I approached it

I focused on data sources that stay accurate on their own, because they're captured as part of something people already do.

### Journeys dashboard

Journeys are devotionals written by one of our pastors, delivered through a vendor-built mobile app and web view. [How the engagement data reaches Rock: an API sync, interactions, an export?] I built a dashboard in Rock that shows [what it shows, e.g. how many people start and finish each Journey, by campus, over time].

[Who uses it, and what it helps them see.]

### Connection Requests dashboard

Connection requests are Rock's core way of following up with people who want to take a next step. I built a dashboard that shows [what it shows, e.g. open requests by campus and opportunity, how long requests wait, and how many end in a connection].

[Who uses it, and what it helps them see.]

## Key decisions

- **Build on data that maintains itself.** Both dashboards use data captured automatically as people engage, not fields staff have to remember to update.
- [Another decision, e.g. how you handled campus attribution or what you left out.]

## The result

[How leaders use these dashboards now. Decisions they've made, follow-ups they've caught, or conversations the data has changed.]

## What I'd do next

[Optional, e.g. agreeing on shared definitions for key metrics so future dashboards stay consistent.]

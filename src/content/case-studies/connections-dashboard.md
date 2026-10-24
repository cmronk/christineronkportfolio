---
title: "Connections Dashboard"
summary: "My first dashboard: one view of every connection request across our campuses, so staff could see how fast new people were reached, which connectors needed help, and how this year compared to last. Staff still use it weekly, and a similar feature was later added to core Rock."
category: "Data & Reporting"
tools: ["Rock RMS", "SQL", "Lava"]
problem: "Connection requests are how we follow up with new people, and they're spread across connectors all over our staff. No one could easily see how long people waited for a first contact, who was overloaded, or how each campus was doing."
approach: "I built one dashboard that answers those questions at a glance: response time by campus and by connector, the state of every request, and new leads compared to last year."
decisions: "I made response time the headline and color coded it everywhere: green for 0 to 3 days, yellow for 4 to 6, red for 7 or more. A leader can spot a problem without reading a single number."
result: "Staff still use it every week or more. Rock's team saw it, and a similar feature was later added to core Rock. I've walked another church through how it works, and I still get questions about it from others in the Rock community."
order: 2
draft: false
illustration: "connections"
---

## The problem

Connection requests are one of the main ways we follow up with people. Someone registers for an event, checks their kids in for the first time, or fills out a form, and a request goes to a connector to reach out.

We use them a lot, and we spread connectors across the whole staff. That's good for sharing the load, but it made the big picture hard to see:

- How long are new people waiting before someone reaches out the first time?
- Which connectors are keeping up, and which have a long list still waiting?
- How is each campus doing?
- Are we seeing more new people than last year, or fewer?

Without those answers, a request could sit for days and nobody would know.

## How I approached it

This was the first dashboard I ever built. I started from the questions staff and leaders kept asking and gave each one a clear place on the page.

- **Campus and date filters.** Pick a campus, or all of them, and a date range. It defaults to the last two months, which matches how teams review their work.
- **Days to first contact, by campus.** Each campus shows its average number of days before someone first reaches out, sorted so the slowest is on top.
- **Connection state.** A gauge shows how many requests are completed, in follow up, active, or inactive.
- **New leads, this year vs. last.** Stacked by campus, so growth or decline stands out right away.
- **Activity totals.** Total and completed requests, with the change from the prior year.
- **Connector stats.** Every connector, with the share of their requests that have no first contact recorded yet, color coded by their average response time.
- **A color guide,** so everyone reads the colors the same way.

I also built a separate connector report that shows the types of requests coming in and helps match each new person with a connector based on demographics, so people are more likely to connect with someone they relate to.

## Key decisions

- **Measure speed, not just volume.** How many requests are open matters less than how long people wait. Days to first contact became the headline.
- **One color system everywhere.** Green, yellow, and red mean the same thing for a campus and for a connector, and gray means there isn't enough data yet. Leaders learn it once and can scan the whole page.
- **Compare to last year.** A raw count doesn't tell you much. Putting this year next to last year shows whether our front door is getting busier or quieter.
- **Treat it like a product.** I keep a changelog on the dashboard. Over time I matched campus colors to the colors used in all our other reporting, added information about leads no one had contacted yet, and moved to Rock's core record source instead of a custom attribute.

## The result

Once teams could see their response times, they got faster. Our average days to first contact came down considerably. Staff still use the dashboard every week or more. Rock's team saw it, and a similar feature was later added to core Rock. I've walked another church through how it works, and I still get questions about it from others in the Rock community.

## What changed next

Rock's version 19 overhaul of connection requests covered much of what my dashboard did. That freed us to shift our focus from making sure staff follow up to making sure people get connected and stay, which led to the [Growth Track Manager](/work/growth-track-manager/).

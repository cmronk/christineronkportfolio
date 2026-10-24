---
title: "Devotional Engagement Dashboard"
summary: "I built a dashboard in Rock RMS that shows how people engage with our devotional app, from big-picture trends down to each person on each study. I presented it at a Rock Data Analytics hub, and other churches followed up to learn how it works."
category: "Data & Reporting"
tools: ["Rock RMS", "Persisted Datasets", "Lava", "SQL"]
problem: "Our church invested a lot in the devotional app, and leaders wanted to know whether it was working. The app tracked engagement, but no one could easily see which studies people finished, where they stalled, or which topics weren't landing."
approach: "I pulled the app's engagement data into Rock and built one dashboard that moves from trends, to totals, to individual studies and the people taking them."
decisions: "I used persisted datasets so a large amount of data loads quickly, and I broke every number down by format (solo, group, and spouse) so leaders could see how people engage, not just how many."
result: "Our leaders use it to see what people are reading and finishing. After I presented it at a Rock Data Analytics hub, several churches set up follow-up calls to learn how it works."

order: 4
draft: false
illustration: "devotional"
---

## The problem

Our church uses a devotional app where people take short Bible studies on their own, with a group, or with their spouse.

We invested a lot in the app and encouraged people to use it, so leaders wanted to know whether it was working. The engagement data existed, but no one could easily see which studies people finished, where they stalled, or which topics weren't landing.

## How I approached it

I built a single dashboard in Rock that starts with the big picture and lets leaders drill down as far as they need.

- **Filters.** Pick a date range, like the current month, and everything on the page updates.
- **Top studies.** Which studies people started most in that time frame.
- **Month-to-month trends.** Started and completed over the last 12 months, by format, so seasonal spikes like January stand out.
- **Overall counts.** Participants, completions, completion rate, and total studies created.
- **Format breakdown.** Solo, group, and spouse participants and studies, with the completion rate for each.
- **Participation depth.** How many people took one study, two, three, or more.
- **Demographics.** Who is engaging.
- **Individual drilldown.** Every study, grouped by category, with its length, a progress bar, and the people taking it, so a leader can see exactly who is in progress and who has finished.

Under the hood, persisted datasets do the heavy lifting. They run the queries ahead of time on a schedule, so the page loads quickly even with a lot of data. SQL shapes the data, and Lava turns it into the cards, charts, and drilldowns.

## Key decisions

- **Persisted datasets for speed.** The dashboard pulls together a lot of data. Running the SQL ahead of time keeps the page fast enough that people actually use it.
- **Break everything down by format.** Totals alone hide the story. Splitting solo, group, and spouse showed how people engage, not only how many. People who took a study with a group finished far more often than people going alone.
- **From trends to people.** A leader can start at a monthly trend and end at a specific person's progress, which turns a report into something they can follow up on.

## The result

Leaders use the dashboard to see what's actually happening with the app: which studies people start, where they stop, and which topics don't connect. It turned a big investment from a guess into something we can measure and adjust.

I presented the dashboard at a Rock Data Analytics hub, and several churches set up follow-up calls to learn how I built it.


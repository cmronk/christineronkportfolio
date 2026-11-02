---
title: "Growth Track Manager"
summary: "I built a tool in Rock RMS that helps campus teams track every person moving through Growth Track, our onboarding process, so fewer people fall through the cracks."
category: "Systems"
tools: ["Rock RMS", "Lava", "SQL"]
quote: "Even if someone doesn't respond, our staff makes sure that everyone who wants to serve and become a member can."
order: 40
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

<details open class="under-hood">
<summary>Under the hood</summary>

One SQL query returns a row per person with every step's status already worked out. Lava turns those rows into seven columns. Each card action is a workflow link, and setting a workflow ID to 0 hides that button until it's ready. Built on Rock v19 with SQL and Lava.

### 01 / Two sources of truth

Older records store Growth Track in a person attribute; newer ones use a Step. Each person is counted once, and the Step wins.

```sql {4,8-10,16,19}
WITH Combined AS (
  SELECT p.Id AS PersonId,
    CAST(s.CompletedDateTime AS DATE) AS GTDate,
    1 AS SourcePriority
  FROM Step s ...
  UNION ALL
  SELECT p.Id,
    CAST(COALESCE(av.ValueAsDateTime,
      TRY_CONVERT(datetime, av.Value)) AS DATE),
    2
  FROM AttributeValue av ...
),
Roster AS (
  SELECT * FROM (
    SELECT *, ROW_NUMBER() OVER (
      PARTITION BY PersonId ORDER BY SourcePriority) AS rn
    FROM Combined
  ) d
  WHERE rn = 1
)
```

When an attribute date didn't save to `ValueAsDateTime` after the v19 upgrade, the query falls back to parsing the raw text.

### 02 / Columns are rules

Nobody moves cards. Each column checks every row against its own rule, so a person shows up wherever they're missing something and drops out once it's done.

```liquid {2,10-11}
{% assign bgcNeeded = true %}
{% if row.AgeFlag == 'minor' or row.AgeFlag == 'turning18' %}
  {% assign bgcNeeded = false %}
{% endif %}
{% assign bgcOK = true %}
{% if bgcNeeded and row.BgcResultRaw == '' %}
  {% assign bgcOK = false %}
{% endif %}
{% comment %} Need to Send to Coach {% endcomment %}
{% if row.CoachRaw == '' and row.MemRaw != ''
      and row.LeadRaw != '' and bgcOK %}
```

Minors don't need a background check. People within a few months of their 18th birthday get a grace window here, and a separate report follows up with them as they turn 18.

### 03 / A safe campus filter

The board opens on the viewer's campus. A campus in the URL is only used if it matches an active campus, so raw URL text never reaches the SQL.

```liquid {5}
{% assign campusId = homeCampusId %}
{% assign requested = PageParameter.CampusId | Default:'' %}
{% for c in campuses %}
  {% assign cid = c.Id | AsString %}
  {% if cid == requested %}{% assign campusId = cid %}{% endif %}
{% endfor %}
```

**Tradeoff.** Working out each step's status in SQL keeps the Lava simple and means the KPIs and the columns can never disagree.

**What I'd change now.** Each card still looks up the person and their steps on its own, and someone can appear in several columns, so the same lookups repeat. I'd pull name and phone into the main query and render every card from one shared template.

</details>

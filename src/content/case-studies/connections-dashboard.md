---
title: "Connections Dashboard"
summary: "My first dashboard: one view of every connection request across our campuses, so staff could see how fast new people were reached, which connectors needed help, and how this year compared to last. The team still reviews it together every week, and a similar feature was later added to core Rock."
category: "Data"
tools: ["Rock RMS", "SQL", "Lava"]
stats:
  - value: "84%"
    label: "Shorter wait for a new person's first contact"
  - value: "Weekly"
    label: "Reviewed together by the team, three years in"
  - value: "Core Rock"
    label: "A similar feature later shipped in Rock itself"
order: 1
featured: true
draft: false
illustration: "connections"
aside: "paper-plane"
---

## The problem

Connection requests are one of the main ways we follow up with people. Someone registers for an event, checks their kids in for the first time, or fills out a form, and a request goes to a connector to reach out.

We spread connectors across the whole staff. That shares the load, but it made the big picture hard to see:

- How long are new people waiting before someone reaches out the first time?
- Which connectors are keeping up, and which have a long list still waiting?
- How is each campus doing?
- Are we seeing more new people than last year, or fewer?

Without those answers, a request could sit for weeks and nobody would know. Some did.

## How I approached it

This was the first dashboard I ever built. I started from the questions staff and leaders kept asking and gave each one a clear place on the page. The preview above shows the main panels. A few details that aren't obvious from it:

- **It opens on the last two months**, which matches how teams review their work. Campus and date filters cover everything else.
- **Slowest campus on top.** Days to first contact is sorted so the problem is the first thing you see.
- **Uncontacted leads are called out.** Each connector shows the share of their requests with no first contact recorded yet.

I also built a separate connector report that shows the types of requests coming in and helps match each new person with a connector based on demographics, so people are more likely to connect with someone they relate to.

## Key decisions

- **Measure speed, not just volume.** How many requests are open matters less than how long people wait. Days to first contact became the headline.
- **One color system everywhere.** Green, yellow, and red mean the same thing for a campus and for a connector, and gray means there isn't enough data yet. Leaders learn it once and can scan the whole page.
- **Compare to last year.** A raw count doesn't tell you much. Putting this year next to last year shows whether our front door is getting busier or quieter.
- **Treat it like a product.** I keep a changelog on the dashboard. Over time I matched campus colors to the colors used in all our other reporting, added information about leads no one had contacted yet, and moved to Rock's core record source instead of a custom attribute.

## The result

Once teams could see their response times, they got faster. In 2021, new people waited an average of 48 days for a first contact. In the dashboard's first year, that dropped to under 8 days, even as requests grew by 70%.

The clearest proof came by accident. In 2025 we stopped reviewing it, and I hid it for a while. The average crept back up to nearly 20 days. When we brought it back into our weekly meeting, it dropped to under 9.

Now it's part of the routine. The dashboard is on screen in our weekly team meeting, where we review it together, and about 25 staff open it on their own each month.

Rock's team saw it, and a similar feature was later added to core Rock. I've walked another church through how it works, and I still get questions about it from others in the Rock community.

## What changed next

Rock's version 19 overhaul of connection requests covered much of what my dashboard did. Even through that change, our largest campus is reaching new people in about 3 days, and most campuses are within a week. A couple still aren't where we want them, which is exactly what the weekly review is for.

That shift also freed us to change our focus from making sure staff follow up to making sure people get connected and stay, which led to the [Growth Track Manager](/work/growth-track-manager/).
<details open class="under-hood">
<summary>Under the hood</summary>

Each panel is a Dynamic Data block. One set of page filters (campus, date range, and request type) is passed into every block's SQL, so the whole page changes together. Built on Rock v19 with SQL and Lava.

### 01 / Days to first contact

The earliest real activity on each request, measured from when the request was created. System activities like "Assigned" and "Follow-up date reached" don't count as contact.

```sql {3-4,8,15}
WITH FirstContact AS (
  SELECT cr.Id, cr.CampusId,
    DATEDIFF(day, cr.CreatedDateTime,
      MIN(cra.CreatedDateTime)) AS DaysToFirst
  FROM ConnectionRequest cr
  JOIN ConnectionRequestActivity cra
    ON cra.ConnectionRequestId = cr.Id
  WHERE cra.ConnectionActivityTypeId NOT IN (@SystemTypes)
    AND cr.CreatedDateTime BETWEEN @StartDate AND @EndDate
  GROUP BY cr.Id, cr.CampusId, cr.CreatedDateTime
)
SELECT CampusId, AVG(DaysToFirst) AS AvgDays
FROM FirstContact
GROUP BY CampusId
ORDER BY AvgDays DESC; -- slowest campus first
```

### 02 / One color system

The thresholds live in one place, so green, yellow, and red mean the same thing on every panel.

```liquid {2-4}
{% assign days = row.AvgDays | AsInteger %}
{% if days > 7 %}{% assign color = 'red-500' %}
{% elsif days > 4 %}{% assign color = 'yellow-500' %}
{% else %}{% assign color = 'green-500' %}{% endif %}

[[ kpi value:'{{ row.CampusName }}'
       label:'{{ days }} Days' color:'{{ color }}' ]][[ endkpi ]]
```

### 03 / This year vs. last

The same window shifted back a year, with each campus charted in its own Rock campus color.

```sql {4-6}
LastYear AS (
  SELECT cr.CampusId, COUNT(cr.Id) AS LastYearCount
  FROM ConnectionRequest cr
  WHERE cr.CreatedDateTime
    BETWEEN DATEADD(year, -1, @StartDate)
        AND DATEADD(year, -1, @EndDate)
  GROUP BY cr.CampusId
)
```

```liquid {1}
{% assign fill = campus | Attribute:'CampusColor' %}
[[ dataset label:'{{ name }}' data:'{{ last }}, {{ current }}'
           fillcolor:'{{ fill }}' ]][[ enddataset ]]
```

**Tradeoff.** A request with no activity yet doesn't have a first-contact time, so it's left out of the average. That's why each connector also shows their uncontacted share: a fast average can't hide a long waiting list.

**What I'd change now.** Move the opportunity and campus IDs out of the SQL and into Rock defined values, so another church could drop the dashboard in without editing queries.

</details>

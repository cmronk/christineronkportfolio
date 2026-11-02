---
title: "Devotional Engagement Dashboard"
summary: "I built a dashboard in Rock RMS that shows how people engage with our devotional app, from big-picture trends down to each person on each study. I presented it at a Rock Data Analytics hub, and other churches followed up to learn how it works."
category: "Data"
tools: ["Rock RMS", "Persisted Datasets", "Lava", "SQL"]
order: 4
draft: false
illustration: "devotional"
aside: "journey"
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
<details open class="under-hood">
<summary>Under the hood</summary>

Each study is a content channel item, and each day of the study is a child item. When someone starts a study, Rock creates a group linked to it, and every day they complete is recorded as attendance. Someone has finished a study when they've attended as many days as it has. Built on Rock v19 with SQL, Lava, and persisted datasets.

### 01 / Calculate once, read many times

The query joins groups, members, attendance, and content items for every study anyone has ever started. That's too heavy to run on each page load, so it runs on a schedule as a persisted dataset and saves the result as JSON.

```sql {12-14}
WITH StudyStructure AS (   -- how many days each study has
  SELECT cci.Guid AS StudyGuid, COUNT(ccia.Id) AS TotalDays
  FROM ContentChannelItem cci
  JOIN ContentChannelItemAssociation ccia
    ON ccia.ContentChannelItemId = cci.Id
  GROUP BY cci.Guid
),
PersonAttendance AS ( ... ),   -- days each person attended
GroupStats AS (
  SELECT pa.StudyGuid,
    COUNT(DISTINCT pa.PersonId) AS TotalParticipants,
    COUNT(DISTINCT CASE
      WHEN pa.DaysAttended >= s.TotalDays
      THEN pa.PersonId END) AS CompletedAll
  FROM PersonAttendance pa
  JOIN StudyStructure s ON s.StudyGuid = pa.StudyGuid
  GROUP BY pa.StudyGuid
)
```

### 02 / One row per group

Each row is one group taking one study. The participant IDs ride along with the totals, so the drilldown can list the actual people without a second query.

```json {8-9}
{
  "StudyTitle": "Knowing God's Will",
  "Category": "Kingdom Living",
  "CampusId": 2,
  "Format": "Group",
  "TotalDays": 11,
  "TotalParticipants": 3,
  "PersonIds": "101,102,103",
  "CompletedPersonIds": "101,103",
  "ParticCompletedAll": 2
}
```

### 03 / Filter on the page

The dashboard reads the saved JSON and filters it in Lava, so changing the campus is instant. One loop then sorts every row into solo, group, and spouse totals for the KPIs and charts.

```liquid {1-2,4}
{% assign rows = 'study-stats' | PersistedDataset
               | OrderBy:'Category asc, StudyTitle asc' %}
{% if campusId != null %}
  {% assign rows = rows | Where:'CampusId', campusId %}
{% endif %}
```

**Tradeoff.** Persisted datasets trade freshness for speed. Engagement with a devotional doesn't need to be real time, so a scheduled refresh was an easy call.

**What I'd change now.** The query looks up a few attributes by ID, which ties it to our Rock instance. I'd look them up by key instead so another church could reuse it.

</details>

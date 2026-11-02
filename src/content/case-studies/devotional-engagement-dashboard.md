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

The query joins groups, members, attendance, and content items for every study anyone has ever started, and it needs a four-minute timeout. That's far too slow for a page load, so it runs on a schedule as a persisted dataset and saves the result as JSON.

```sql {4-5,9}
PersonAttendance AS (
  SELECT g.Id AS GroupId, gm.PersonId,
    p.PrimaryCampusId AS CampusId, ...
    COUNT(DISTINCT CASE WHEN a.DidAttend = 1
                        THEN ao.Id END) AS DaysAttended
  FROM [Group] g
  JOIN GroupMember gm ON gm.GroupId = g.Id
  LEFT JOIN AttendanceOccurrence ao ON ao.GroupId = g.Id
  LEFT JOIN PersonAlias pa ON pa.PersonId = gm.PersonId
  LEFT JOIN Attendance a ON a.OccurrenceId = ao.Id
                        AND a.PersonAliasId = pa.Id
  ...
)
```

Attendance is recorded against a person alias, and a merged record can have several. Joining through every alias and counting distinct days means nobody is counted twice for the same day.

### 02 / The IDs ride along

The rollup compares each person's days attended to the number of days in the study. It also keeps the list of people behind every number, so the drilldown can show who is in progress and who finished without a second query.

```sql {3-6}
SELECT pa.StudyGuid, pa.GroupFormat, pa.CampusId,
  COUNT(DISTINCT pa.PersonId) AS TotalParticipants,
  STRING_AGG(CAST(pa.PersonId AS VARCHAR(MAX)), ',') AS PersonIds,
  STRING_AGG(CASE WHEN pa.DaysAttended >= s.TotalDays
                  THEN CAST(pa.PersonId AS VARCHAR(MAX)) END, ',')
    AS CompletedPersonIds
FROM PersonAttendance pa
JOIN StudyStructure s ON s.StudyGuid = pa.StudyGuid
GROUP BY pa.StudyGuid, pa.GroupFormat, pa.CampusId, ...
```

Each row of the saved JSON then looks like this:

```json {6-7}
{
  "StudyTitle": "Knowing God's Will",
  "CampusId": 2,
  "Format": "Group",
  "TotalDays": 11,
  "PersonIds": "101,102,103",
  "CompletedPersonIds": "101,103"
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

**What I'd change now.** The JSON is assembled by hand in a Lava loop. I'd switch to Rock's `ToJSON` filter so special characters in titles are handled for me, and look attributes up by key instead of ID so another church could reuse the query.

</details>

---
title: "Role-Based Workspaces"
summary: "I redesigned our internal Rock RMS homepage so each staff role lands on a workspace built around their actual work: the metrics, tasks, and tools they need, without digging."
category: "Systems & Integrations"
tools: ["Rock RMS", "Lava", "Rock Security", "Dashboards"]
problem: "The staff homepage hadn't been meaningfully updated since 2018. Links were added one request at a time, dashboard tiles were hard to read, and every role saw the same page whether it was relevant or not."
approach: "I rebuilt the homepage around what staff need daily: campus metrics with year-over-year context, upcoming events, common actions, and role-based workspaces that group each team's tools in one place."
decisions: "Workspaces appear only for the roles that use them, using Rock security, so the page stays focused as it grows. Every tile leads to a task, not just a report."
result: "Staff feedback has been strongly positive, and questions about where to find things dropped noticeably, especially from campus pastors and the Community Life team."
quote: "The goal wasn't a prettier homepage. It was a page that answers 'what do I need today?' for every person who opens it."
featured: false
order: 1
# Blur internal numbers, names, and event details before adding these.
# beforeImage: "/images/workspaces/before.png"
# afterImage: "/images/workspaces/after.png"
---

## The problem

Our Rock RMS staff homepage is the first thing every staff member sees when they log in. Over the years it had become a place where things were added and never removed. The "Staff Updates" section still carried a date from 2018. Links were added to a "Quick Links" list one request at a time, with no structure or sense of priority. The dashboard tiles at the top used dark text on dark backgrounds, so the labels were hard to read.

Most importantly, everyone saw the same page. A campus pastor, a preschool director, and a marketing coordinator all had to dig through the same list of links to find the two or three things they actually needed. The page offered navigation, but no information. To know how anything was going, you had to click somewhere else.

Leadership asked me to help make Rock less convoluted for staff, and the homepage was the most visible place to start.

## How I approached it

I started by asking a simple question for each role: what do you need to see or do when you first log in?

From there, I rebuilt the homepage in four parts:

- **A personal greeting and campus metrics.** Staff see year-to-date numbers for their campus, like attendance, baptisms, Growth Track, membership, and new people, each compared to the same point last year.
- **Upcoming events** for their campus, so the week ahead is visible at a glance.
- **Workspaces** for each ministry area. Each one is a dedicated page that groups that team's tools by purpose. The Campus Pastor workspace, for example, puts attendance metrics, weekly attendance entry, financials, and giving analytics in one place, with reporting tools in their own section.
- **Common actions** for the tasks almost everyone does, like sending a communication or working connection requests.

## Key decisions

- **Show each person only what's relevant.** Workspaces use Rock security, so staff only see the workspaces for their roles. This keeps the page focused today and keeps it from turning back into a link dump as more workspaces are added.
- **Make every tile actionable.** Metric cards and workspace tiles lead to where staff actually enter numbers, follow up with people, or dig into a report. The homepage is a starting point for work, not just a display.
- **Give numbers context.** Metrics show last year's figures alongside this year's, so staff can see trends without opening a separate report.
- **Work within fixed boundaries.** The main navigation and the choice of metrics were set by leadership and outside the scope of this project. I designed the homepage and workspaces to stand on their own within those limits.

## The result

The redesign launched with five workspaces: Campus Pastor, Community Life, Generations, Preschool, and Marketing. Workspaces for Worship, Outreach, and Rock administration are in progress.

Feedback from staff has been strongly positive, and teams have started suggesting their own additions, which tells me they see the workspaces as theirs. Questions about where to find things dropped noticeably, especially from campus pastors and the Community Life team, the two groups who use Rock most heavily day to day. Leadership now uses the homepage metrics as a regular reference point for decisions.

## What I'd do next

- **Simplify the main navigation.** The homepage is now clear, but the navigation around it still reflects years of additions. Reorganizing it around the same roles as the workspaces would make the whole experience consistent.
- **Keep workspaces lean.** As teams request additions, I'd set a simple rule for what earns a spot, so each workspace stays fast to scan.
- **Check accessibility.** Run a contrast check on the lighter tile colors so every label is easy to read.
- **Measure usage.** Track which tiles get used most to guide future changes with data instead of guesswork.

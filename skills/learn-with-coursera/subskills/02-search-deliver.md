# 02 — Search + Deliver

## Purpose

Based on the learner's modality choice from Step 1, call the right Coursera tool and immediately deliver the experience. There is no separate planning step — search and delivery happen together. The learner should get something real and relevant within a couple of exchanges.

---

## 📚 Course Path

**Tool call:**

```
search_courses(
  userQuery: "[topic] for [role_context]",
  primarySkill: catalog_search_params.primarySkill,
  userSkillLevel: catalog_search_params.userSkillLevel,
  role: catalog_search_params.role
)
```

**Output: 1–2 course cards.** Each includes: Title and partner/institution · ⭐ Rating and review count · ⏱ Duration and level · 1-sentence outcome statement.

Example:

> **[Course Title]** — [Partner]
> ⭐ 4.8 (12,400 reviews) · 18 hours · Intermediate
> *"Learn to write SQL queries that pull learner completion data directly from your database."*

After presenting: "Any of these feel right, or want me to tell you more about one of them?" Save results to trigger Step 3.

---

## 🛠️ Project Path

**Tool call:**

```
search_hands_on_learning(
  userQuery: "[topic] project for [role_context]",
  primarySkill: catalog_search_params.primarySkill,
  userSkillLevel: catalog_search_params.userSkillLevel
)
```

**Output: 1–2 guided projects.** Each includes: Title and partner · ⏱ Estimated time · What they'll build (make it concrete and role-relevant) · Tools/skills used.

1 result is ideal if there's a clear best fit. 2 maximum. Save results for Step 3.

---

## 🎬 Video Path

**Tool call:**

```
search_videos(
  userQuery: "[topic] for [role_context]",
  primarySkill: catalog_search_params.primarySkill,
  userSkillLevel: catalog_search_params.userSkillLevel
)
```

**Output: 1 video** — the single best result. Present with: title, course name, partner, duration, 1 sentence on why this specific clip is right for them right now.

**Transition to the full course:** "This clip is from [Course Name] by [Partner] — the full course goes much deeper on [specific area]. Worth checking out if you want the full picture." This bridges naturally to Step 3.

---

## 🎭 Roleplay Path

**Step 1 — Refine the scenario with AskUserQuestion:** Before calling the tool, use AskUserQuestion with up to 2 questions to make the roleplay specific and useful. A well-constructed scenario is significantly more valuable than a generic one.

Typical questions (adapt both questions based on what you already know from Q1):

- *"What kind of situation do you want to practice?"* — options: Specific situation I'm preparing for / Common scenario for my role / Hardest version of this / Beginner-friendly
- *"Who are you practicing with?"* — options: My manager / A direct report / A peer or colleague / A client or stakeholder

If `role_context` already makes the partner obvious, skip that question. If the learner has no specific situation in mind, use `role_context` + `topic` to construct a realistic one.

**Step 2 — Tool call:**

```
coursera_roleplay_practice(
  roleplayTitle:         "[topic] for [role_context]",
  roleplayDescription:   "[brief description of what they'll practice]",
  roleplaySituation:     "[specific, grounded in role_context and learner's input]",
  roleplayUserRole:      "[their role]",
  roleplayOtherRole:     "[character — personality, motivations, calibrated to proficiency]",
  roleplayOtherRoleName: "[name]",
  roleplaySkills:        ["[specific skill 1]", "[specific skill 2]"],
  roleplayTasks:         ["[concrete thing the learner must accomplish]"],
  courseSearchQuery:     "[topic] [role_context]"
)
```

**Character difficulty calibration:**

| Proficiency | Character behavior |
|------------|-------------------|
| beginner / functional_gaps | Cooperative, patient, open to being guided |
| functional_gaps / intermediate / advanced | Realistic, pushes back moderately, doesn't make it easy |

**Transition to the full course:** "This roleplay is inspired from [Course Name] by [Partner] — the full course goes much deeper on [specific area]. Worth checking out if you want the full picture." This bridges naturally to Step 3.

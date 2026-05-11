# Contributing

Keep this repository focused on portable Agent Skills. Do not add MCP server
code, Claude plugin metadata, Cursor plugin metadata, or generated archives
unless the repository scope changes explicitly.

## Skill Layout

Every skill must live in its own directory:

```text
skills/<skill-name>/SKILL.md
```

Supporting material should sit beside the skill that uses it:

```text
skills/<skill-name>/subskills/*.md
skills/<skill-name>/references/*.md
skills/<skill-name>/scripts/*
```

## SKILL.md Requirements

Each `SKILL.md` must start with YAML frontmatter:

```markdown
---
name: skill-name
description: What this skill does and when an agent should use it.
---
```

Use lowercase letters, numbers, and hyphens for skill names. Keep descriptions
short enough to be useful during skill discovery, and put detailed behavior in
the Markdown body.

## Editing Guidelines

- Keep each skill responsible for one workflow.
- Prefer supporting files for long step-by-step procedures.
- Use relative links and paths from the skill directory.
- Document any required MCP tools in the repository README.
- Update the skill contract when tool names or expected parameters change.

## Validation Checklist

Before sending changes for review:

```bash
node scripts/validate-skills.mjs
git status --short
```

Check that validation passes and that the status output only includes intended
repository files.

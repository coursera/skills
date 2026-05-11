#!/usr/bin/env node

import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import process from "node:process";

const repoRoot = process.cwd();
const skillsDir = path.join(repoRoot, "skills");
const skillNamePattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function fail(message) {
  console.error(`ERROR: ${message}`);
  process.exitCode = 1;
}

function parseFrontmatter(filePath) {
  const content = readFileSync(filePath, "utf8");
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/);

  if (!match) {
    return { content, data: null };
  }

  const data = {};
  const lines = match[1].split(/\r?\n/);

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    const scalar = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);

    if (!scalar) {
      continue;
    }

    const key = scalar[1];
    let value = scalar[2].trim();

    if (value === ">" || value === "|") {
      const block = [];
      index += 1;

      while (index < lines.length && /^\s+/.test(lines[index])) {
        block.push(lines[index].trim());
        index += 1;
      }

      index -= 1;
      value = block.join(" ").trim();
    } else {
      value = value.replace(/^["']|["']$/g, "");
    }

    data[key] = value;
  }

  return { content, data };
}

function validateSkill(skillDirName) {
  const skillDir = path.join(skillsDir, skillDirName);
  const skillFile = path.join(skillDir, "SKILL.md");

  if (!statSync(skillDir).isDirectory()) {
    fail(`skills/${skillDirName} must be a directory`);
    return;
  }

  if (!existsSync(skillFile)) {
    fail(`skills/${skillDirName}/SKILL.md is missing`);
    return;
  }

  const { content, data } = parseFrontmatter(skillFile);

  if (!data) {
    fail(`skills/${skillDirName}/SKILL.md is missing YAML frontmatter`);
    return;
  }

  if (!data.name) {
    fail(`skills/${skillDirName}/SKILL.md is missing frontmatter name`);
  } else if (!skillNamePattern.test(data.name)) {
    fail(`skills/${skillDirName}/SKILL.md has invalid skill name "${data.name}"`);
  }

  if (!data.description) {
    fail(`skills/${skillDirName}/SKILL.md is missing frontmatter description`);
  }

  if (data.name && data.name !== skillDirName) {
    fail(
      `skills/${skillDirName}/SKILL.md name "${data.name}" must match directory name`,
    );
  }

  const referencedSubskills = content.matchAll(/`(subskills\/[^`]+\.md)`/g);

  for (const match of referencedSubskills) {
    const relativePath = match[1];
    const target = path.join(skillDir, relativePath);

    if (!existsSync(target)) {
      fail(`skills/${skillDirName}/SKILL.md references missing ${relativePath}`);
    }
  }
}

if (!existsSync(skillsDir)) {
  fail("skills/ directory is missing");
} else {
  const entries = readdirSync(skillsDir).filter((entry) => !entry.startsWith("."));

  if (entries.length === 0) {
    fail("skills/ directory does not contain any skills");
  }

  for (const entry of entries) {
    validateSkill(entry);
  }
}

if (process.exitCode) {
  process.exit(process.exitCode);
}

console.log("Skill validation passed.");

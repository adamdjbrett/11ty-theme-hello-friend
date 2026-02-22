import { execSync } from "node:child_process";

function linesFrom(command) {
  try {
    return execSync(command, { encoding: "utf8" })
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);
  } catch {
    return [];
  }
}

function extractCoauthors() {
  const lines = linesFrom("git log --format=%B");
  const coauthors = new Set();

  for (const line of lines) {
    const match = line.match(/^Co-authored-by:\s*(.+)$/i);
    if (match) {
      coauthors.add(match[1]);
    }
  }

  return [...coauthors].sort((a, b) => a.localeCompare(b));
}

export default {
  generatedAt: new Date().toISOString(),
  contributors: linesFrom("git shortlog -sne --all | sed 's/^\\s*[0-9]*\\s*//'") || [],
  authors: linesFrom("git log --format='%aN <%aE>' | sort -u") || [],
  coauthors: extractCoauthors()
};

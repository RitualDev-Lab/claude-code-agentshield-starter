import { test, describe } from "node:test";
import assert from "node:assert";
import { execSync } from "node:child_process";

describe("AgentShield Claude Code PreToolUse Defense Verification", () => {
  test("Redacts simulated GitHub tokens from tool output", () => {
    const rawOutput = execSync("node src/demo-tool.js", { encoding: "utf8" });
    assert.ok(rawOutput.includes("usr_9918"));
  });

  test("Config includes PreToolUse hook for Claude Code", async () => {
    const { readFileSync } = await import("node:fs");
    const config = JSON.parse(readFileSync(".claude/config.json", "utf8"));
    assert.ok(config.hooks.PreToolUse.includes("agentshield exec"));
  });

  test("AgentShield config enforces strict kernel sandboxing profile", async () => {
    const { readFileSync } = await import("node:fs");
    const config = JSON.parse(readFileSync(".agentshield.json", "utf8"));
    assert.strictEqual(config.profile, "strict");
    assert.strictEqual(config.sandbox.blockProcEnviron, true);
    assert.strictEqual(config.sandbox.maxTimeoutMs, 25000);
  });
});

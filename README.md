<div align="center">

# Claude Code AgentShield Starter 🛡️

[![Use this template](https://img.shields.io/badge/Template-Use_this_Template-00F59B?style=for-the-badge&logo=github)](https://github.com/RitualDev-Lab/claude-code-agentshield-starter/generate)
[![Secured by AgentShield](https://ritualdev.in/badge/secured.svg)](https://ritualdev.in)
[![License: Apache-2.0](https://img.shields.io/badge/License-Apache--2.0-blue?style=for-the-badge)](LICENSE)
[![Trust Center](https://img.shields.io/badge/Trust-SIG%20Lite%20%2F%20DPDP-00D4FF?style=for-the-badge)](https://ritualdev.in/trust)

> **Turnkey starter repository for Claude Code & Claude Desktop equipped with real-time PreToolUse secret defense hooks, kernel sandboxing, and adversarial leak blocking.**

[Documentation](https://ritualdev.in/docs) • [Interactive Playground](https://ritualdev.in/playground) • [Security Advisories](https://ritualdev.in/advisories) • [Trust Center](https://ritualdev.in/trust)

</div>

---

## ⚡ What is this?

When autonomous coding agents (Claude Code, Cursor, Windsurf) run shell commands or inspect directories, untrusted model outputs or adversarial prompt injection payloads can trick them into exfiltrating credentials (`cat .env`, `cat /proc/self/environ`, or `printenv`).

This repository is **pre-configured with AgentShield PreToolUse hooks**. Every command Claude Code runs is dynamically intercepted:
1. Syscalls accessing `/proc/*/environ` or SSH keys are blocked.
2. Credentials and API keys in stdout/stderr are masked into `[REDACTED_SECRET]` tokens.
3. Unapproved network egress is prevented with strict CIDR filtering.

---

## 🚀 1-Click Quickstart

### 1. Click "Use this template"
Click the green **[Use this template](https://github.com/RitualDev-Lab/claude-code-agentshield-starter/generate)** button above to create your own secure agent workspace.

### 2. Clone & Inspect Hook Configuration
```bash
git clone https://github.com/YOUR_ORG/YOUR_REPO.git
cd YOUR_REPO
```

The `.claude/config.json` hook is already wired up:
```json
{
  "hooks": {
    "PreToolUse": "npx @ritualdev-lab/agentshield exec \"$TOOL_COMMAND\""
  }
}
```

### 3. Test Adversarial Redaction
Run an adversarial process probe command wrapped in the AgentShield defense kernel:
```bash
npm run test:adversarial
```
You will observe that all volatile environment variables are masked with zero leaked secrets.

---

## 🛡️ Repository Structure

```
├── .claude/
│   └── config.json          # PreToolUse hook configuration for Claude Code
├── .agentshield.json        # Sandboxing profile, redaction rules, and egress CIDRs
├── .env.example             # Safe template for local credentials
├── src/
│   └── demo-tool.js         # Example tool demonstrating zero-leak output
├── test/
│   └── verify-defense.test.js # Automated verification test suite
└── .github/workflows/
    └── verify-defense.yml   # CI PR security gate blocking leaked secrets
```

---

## 📄 License & Responsible Disclosure

- Licensed under **Apache-2.0**.
- Coordinated Vulnerability Disclosure: [security@ritualdev.in](mailto:security@ritualdev.in) (SLA < 24h).
- Maintained by [RitualDev Studio](https://ritualdev.in).

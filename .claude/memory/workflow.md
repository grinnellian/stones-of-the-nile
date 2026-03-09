# Workflow Preferences

- Run autonomously, trust git + async human judgement
- Push commits as they're made (no force push / history rewriting)
- Keep commits focused and well-described
- Use ai-lindale agent roles (TPM, Architect, Dev, Egyptologist) in `.claude/agents/`
- Do NOT use auto-memory (`~/.claude/projects/`). All memory lives in `.claude/memory/`
- Deny rules in `.claude/settings.json` block access to `~/.claude/projects/`
- Only operate within the working directory — no reading/writing outside the repo

# Academy lesson content

Lessons for the Zero to Hero Software Engineering course, rendered at `/academy`.

- The course skeleton (phases, weeks, day topics, projects, exit criteria) lives in `lib/academy/curriculum.ts`, transcribed from `Curriculum/Zero-to-Hero-Curriculum-Blueprint.pdf`. Change the plan there, not here.
- Each lesson is one Markdown file: `week-XX/day-N.md` (week zero-padded, day 1–5).
- A day with no file still gets a page, showing its topic and "This lesson is still being written". Adding the file publishes the lesson; no code change is needed.
- The page renders the title from the curriculum, so a lesson file starts with the time line, not a `#` heading.
- GitHub-flavoured Markdown is supported (tables, task lists). Raw HTML is allowed for `<details>` answer blocks.

## Lesson format

Every lesson follows the blueprint's lesson contract, in this order. Use `week-01/day-*.md` as the reference.

```markdown
**Time:** about 6 hours · 1.5 h reading · 3.5 h lab · 30 min check · 30 min journal
**AI rule for this phase:** (see "AI thread" for the phase in curriculum.ts)

## By the end of today you can
3–5 concrete, checkable outcomes.

## Why this exists
Contract 1: the problem, and what people did before.

## How it works
Contract 2: what happens underneath, and what the tool hides.

## When to use it, and what it costs
Contract 3.

## Lab (3.5 h)
Contract 4: numbered steps with exact commands or code. Build the smallest working thing.

### Break it
Contract 4: break it on purpose, then debug it. Ask for the exact error and its meaning.

## Security
Contract 5: what can go wrong, who could attack, how to detect, prevent, recover.

## AI check
Contract 6, from Phase 1 on. Follow the phase's AI rule (tutor-only until week 10).

## Journal and commit (30 min)

## Check yourself
3–4 questions, answers in a <details> block.
```

## Style

- Plain, direct English. Many learners use English as a second language: short sentences, one idea each, and every term defined the first time it appears.
- Kenyan context where it helps (chamas, M-Pesa, Kenyan names), never forced.
- Only use a concept after the lesson that teaches it (see the dependency map in the blueprint). If a lesson needs something later, say "you will meet this in week N".
- Every command must be safe to run as written on a learner's own laptop. Nothing destructive outside `~/nalla` or `/tmp`.
- Build on earlier days and on Chama Ledger wherever possible.

## Drafting with AI

Lessons are drafted with an AI assistant and then reviewed by an instructor. The process:

1. **Draft** with the prompt below, one day at a time.
2. **Run** every command and every piece of code in the lab on a clean Ubuntu LTS machine. Fix what fails.
3. **Check** facts against primary sources (man pages, go.dev, the PostgreSQL docs, RFCs), not against the model.
4. **Review** as a pull request. A second instructor reads it before merge.

Prompt template:

```text
You are writing one day's lesson for Nalla Labs' "Zero to Hero Software Engineering" course:
26 weeks, complete beginners in Kenya, Go-only for programs, Ubuntu LTS laptops.

Week {N}: {week title}. Phase {P}: {phase title}.
Today (day {D}): {day topic from curriculum.ts}
Earlier days this week: {topics}. Tomorrow: {topic}.
This week's Friday deliverable: {deliverable}.
Phase threads — Security: {securityThread}. AI rule: {aiThread}. System trace: {systemTrace}.

Follow content/academy/README.md's lesson format and style exactly, using the attached
week-01/day-3.md as the model for depth and tone. About 1.5 h of reading and a 3.5 h lab.
Do not use any concept the learner has not met yet.
```

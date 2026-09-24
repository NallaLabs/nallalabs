// Source: Curriculum/Zero-to-Hero-Curriculum-Blueprint.pdf (Blueprint + Daily plan, Sep 2026).
// Lesson bodies live in content/academy/week-XX/day-N.md; this file is the course skeleton.

export type Phase = {
  number: number;
  slug: string;
  title: string;
  weeks: number[];
  focus: string;
  coreTopics: string[];
  endsWith: string;
  securityThread: string;
  aiThread: string;
  systemTrace: string;
  exitCriteria: {
    understand: string;
    explain: string;
    build: string;
    debug: string;
    test: string;
    secure: string;
    deploy: string;
    operate: string;
  };
};

export type Week = {
  number: number;
  title: string;
  phase: number;
  days: [string, string, string, string, string];
  deliverable: string;
};

export type Project = {
  number: string;
  title: string;
  weeks: string;
  what: string;
  concepts: string;
  scriptedBreak: string;
  runsOn: string;
};

export const course = {
  title: "Zero to Hero Software Engineering",
  summary:
    "A 26-week, dependency-ordered path that takes a complete beginner to a production-capable engineer. Fundamentals are locked down by the month-3 gate in week 13; the second half builds and operates real systems.",
  hoursPerDay: 6,
  totalHours: 880,
  stack: [
    "Go",
    "HTML, CSS, plain JavaScript",
    "Linux (Ubuntu LTS)",
    "PostgreSQL",
    "Docker",
    "GitHub Actions",
    "AWS Free Tier",
  ],
};

export const lessonContract = [
  "What problem does it solve, and what did people do before it existed?",
  "How does it work underneath, and what does it hide from the developer?",
  "When should it be used, when should it not, and what does it cost?",
  "Hands-on: build the smallest working thing, then break it on purpose and debug it.",
  "Security: what can go wrong, who could attack it, what could they reach, how would we detect, prevent and recover?",
  "AI check (from Phase 1): ask an assistant to explain or produce the same thing, then find what it got wrong.",
];

export const buildLoop = ["Learn", "Build", "Break", "Debug", "Test", "Secure", "Deploy", "Improve"];

export const weeklyRhythm = [
  {
    slot: "Monday class · 90 min",
    who: "Instructor",
    what: "Week context: why this week's topics exist, how they connect to last week, a live system trace.",
  },
  {
    slot: "Daily section · ~6 h, Mon–Fri",
    who: "Learner, self-paced",
    what: "About 1.5 h reading or video, 3.5 h hands-on lab, 30 min AI check, 30 min journal entry and a commit.",
  },
  {
    slot: "Wednesday class · 60 min",
    who: "Instructor",
    what: "Clinic: live debugging of learners' real errors, questions.",
  },
  {
    slot: "Friday class · 90 min",
    who: "Instructor",
    what: "The scripted break (the instructor injects a fault and learners debug it), then code review of the week's deliverable.",
  },
  {
    slot: "Automated checks",
    who: "CI",
    what: "Daily exercises are graded by GitHub Actions tests; learners see pass or fail within minutes.",
  },
  {
    slot: "Weekend",
    who: "Learner",
    what: "Optional catch-up only; no new material.",
  },
];

export const phases: Phase[] = [
  {
    number: 0,
    slug: "how-computers-work",
    title: "How computers work",
    weeks: [1],
    focus: "The machine under the code",
    coreTopics: [
      "Linux install",
      "Binary and hex",
      "CPU and memory (stack, heap, addresses)",
      "Storage",
      "Processes",
      "File systems and permissions",
      "The shell",
      "UTF-8",
    ],
    endsWith: "Shell scripting lab",
    securityThread: "Users, groups, file permissions, sudo, least privilege",
    aiThread: "None: learn without it",
    systemTrace: "Keyboard → process → system call → file",
    exitCriteria: {
      understand: "How a program becomes a running process",
      explain: "What happens when a command runs in the shell",
      build: "A Bash script that uses pipes and exit codes",
      debug: "A permission-denied or path error using ls, ps and man",
      test: "Check a script's exit codes",
      secure: "Set correct file permissions; no root by default",
      deploy: "Run a script on a schedule with cron",
      operate: "Read system logs with journalctl",
    },
  },
  {
    number: 1,
    slug: "programming-foundations",
    title: "Programming foundations (Go)",
    weeks: [2, 3, 4, 5],
    focus: "Thinking in programs",
    coreTopics: [
      "Git",
      "Types and control flow",
      "Functions",
      "Slices, maps, structs",
      "Pointers and methods",
      "Interfaces",
      "Errors as values",
      "Packages and modules",
      "File I/O, JSON/CSV",
      "go test and Delve",
      "Big-O, recursion, sorting and searching",
    ],
    endsWith: "Projects 1 and 2",
    securityThread: "Untrusted input, secrets never in code or Git, safe file writes",
    aiThread: "Tutor only: explain concepts and errors, quiz me; no code generation",
    systemTrace: "Source → compiler → binary → process → file system",
    exitCriteria: {
      understand: "Types, scope, mutation, collections, complexity",
      explain: "Why a hash map lookup is fast",
      build: "CLI tools and file-backed apps split into packages",
      debug: "Any error or panic, using the stack trace and Delve",
      test: "Table-driven go test unit tests, including edge cases",
      secure: "Validate input; keep secrets in environment variables",
      deploy: "Cross-compile a CLI binary for Linux, macOS and Windows",
      operate: "Handle errors with clear messages and exit codes",
    },
  },
  {
    number: 2,
    slug: "data-and-persistence",
    title: "Data and persistence",
    weeks: [6, 7],
    focus: "Where data lives and stays correct",
    coreTopics: [
      "Relational model and SQL",
      "Joins, keys, normalisation",
      "Indexes and EXPLAIN",
      "Transactions and isolation",
      "Migrations",
      "SQLite then PostgreSQL with database/sql and sqlc",
      "Parameterised queries",
      "Backups",
    ],
    endsWith: "Project 3",
    securityThread: "SQL injection, parameterised queries, least-privilege DB roles, backups",
    aiThread: "Explain query plans and schema trade-offs; learner writes all SQL",
    systemTrace: "Query → parser → planner → index → disk",
    exitCriteria: {
      understand: "Relations, joins, indexes, isolation levels",
      explain: "Why a transaction is needed for a transfer",
      build: "A normalised schema with migrations",
      debug: "A slow query with EXPLAIN; a lost update",
      test: "Tests against a real test database",
      secure: "Parameterised queries; least-privilege DB user",
      deploy: "Apply migrations safely",
      operate: "Back up and restore a database",
    },
  },
  {
    number: 3,
    slug: "networks-and-the-web",
    title: "Networks and the web",
    weeks: [8, 9],
    focus: "How bytes cross the world",
    coreTopics: [
      "IP, subnets, NAT",
      "DNS",
      "Ports, TCP, UDP, sockets",
      "TLS and certificates",
      "HTTP by hand",
      "Browsers and the same-origin policy",
    ],
    endsWith: "HTTP server on raw TCP sockets",
    securityThread: "TLS, certificates, man-in-the-middle, DNS spoofing",
    aiThread: "Explain RFCs and packet captures; verify against the spec",
    systemTrace: "DNS → TCP → TLS → HTTP → response",
    exitCriteria: {
      understand: "The DNS → TCP → TLS → HTTP chain",
      explain: "What a certificate proves and what it does not",
      build: "An HTTP server on raw sockets",
      debug: "Connection errors with dig, curl -v, ss and a packet capture",
      test: "Assert raw HTTP responses",
      secure: "Inspect and verify a TLS certificate chain",
      deploy: "Open the right ports on a server firewall",
      operate: "Diagnose DNS and TLS failures",
    },
  },
  {
    number: 4,
    slug: "backend-engineering",
    title: "Backend engineering",
    weeks: [10, 11, 12],
    focus: "Services other programs rely on",
    coreTopics: [
      "net/http, routing, middleware",
      "context, goroutines, the race detector",
      "JSON, validation, status codes, pagination",
      "slog and httptest",
      "OpenAPI",
      "Prompting fundamentals",
      "First deploy to AWS EC2 with systemd, Nginx and TLS",
    ],
    endsWith: "Project 4 live",
    securityThread: "Validation, IDOR, error leakage, request size limits",
    aiThread:
      "Generation begins with prompting fundamentals: generate, then review line by line; spot hallucinated APIs against the docs",
    systemTrace: "Client → DNS → TCP → TLS → Nginx → router → middleware → handler → DB → response",
    exitCriteria: {
      understand: "Handlers, middleware, context, connection pools",
      explain: "Every status code the API returns and why",
      build: "A documented REST API in Go",
      debug: "A failing request from logs alone",
      test: "Table-driven unit and integration tests",
      secure: "Validation, size limits, IDOR checks",
      deploy: "EC2 server with systemd, Nginx, Let's Encrypt",
      operate: "Structured logs and a health check",
    },
  },
  {
    number: 5,
    slug: "browser-and-full-stack",
    title: "The browser and full stack",
    weeks: [14, 15],
    focus: "The user's side of the system",
    coreTopics: [
      "HTML and forms",
      "CSS layout",
      "Accessibility",
      "html/template",
      "Plain JavaScript: DOM, events, fetch, modules, event loop",
      "Progressive enhancement",
      "CORS, XSS, CSP",
      "chromedp",
    ],
    endsWith: "Project 5",
    securityThread: "XSS, CSRF, CORS, CSP, html/template auto-escaping, third-party script risk",
    aiThread: "Generate templates and JavaScript; audit accessibility and XSS in the output",
    systemTrace: "Browser → DOM → fetch → CORS preflight → API",
    exitCriteria: {
      understand: "The DOM, the event loop, server vs client rendering",
      explain: "Why CORS exists and what it does not protect",
      build: "An accessible server-rendered UI enhanced with plain JavaScript",
      debug: "Network and rendering issues in browser dev tools",
      test: "chromedp browser tests",
      secure: "Escape output; set CSP; handle CORS correctly",
      deploy: "Serve a built front end behind Nginx",
      operate: "Track client errors",
    },
  },
  {
    number: 6,
    slug: "identity-security-hardening",
    title: "Identity, security and hardening",
    weeks: [16, 17],
    focus: "Who can do what, safely",
    coreTopics: [
      "argon2id",
      "Sessions and cookies, CSRF",
      "RBAC",
      "OAuth 2.0 and OIDC, JWT trade-offs",
      "Rate limiting with Redis",
      "Idempotency keys and audit logs",
      "STRIDE",
      "Docker and Compose",
      "GitHub Actions with security scans",
      "Working with a coding agent",
    ],
    endsWith: "Project 6",
    securityThread: "Hashing, session fixation, broken access control, rate limiting, STRIDE",
    aiThread:
      "AI security review of the learner's own code, then manual verification of each finding; coding-agent workflow: spec, context file, tests first, diff review",
    systemTrace: "Password → hash → session → cookie → TLS → authorisation check → audit log",
    exitCriteria: {
      understand: "Sessions vs tokens, authN vs authZ",
      explain: "A threat model for their own app",
      build: "Login, roles, audit log, rate limits",
      debug: "An access-control bug from an audit log trail",
      test: "Authorisation tests for every role",
      secure: "argon2id, CSRF protection, secret scanning in CI",
      deploy: "Docker images through GitHub Actions",
      operate: "Rate limits and audit-log review",
    },
  },
  {
    number: 7,
    slug: "cloud-infrastructure-operations",
    title: "Cloud, infrastructure and operations",
    weeks: [18, 19],
    focus: "Running software for real",
    coreTopics: [
      "IAM and VPCs",
      "RDS and S3",
      "OpenTofu",
      "CI/CD with rollback",
      "Expand/contract migrations",
      "Prometheus, Grafana, OpenTelemetry",
      "SLOs and alerts",
      "k6 and pprof",
      "Restore drill, cost review, incident response",
    ],
    endsWith: "Project 6 on AWS, operated",
    securityThread: "IAM least privilege, secret managers, container hardening, supply chain",
    aiThread: "Generate OpenTofu and CI config; review for over-broad IAM and leaked secrets",
    systemTrace: "Commit → CI → tests → image → registry → deploy → DNS → HTTPS → monitoring",
    exitCriteria: {
      understand: "IAM, VPCs, environments, SLOs",
      explain: "Their deployment pipeline end to end",
      build: "Infrastructure as code for their stack",
      debug: "A failed deploy and a production incident from dashboards",
      test: "k6 load tests against an SLO",
      secure: "Least-privilege IAM; hardened images",
      deploy: "AWS via OpenTofu with rollback",
      operate: "Dashboards, alerts, a restore drill, an incident write-up",
    },
  },
  {
    number: 8,
    slug: "architecture-distributed-systems",
    title: "Architecture and distributed systems",
    weeks: [20, 21],
    focus: "Systems made of parts that fail",
    coreTopics: [
      "Modular monolith",
      "RabbitMQ and at-least-once delivery",
      "Idempotent consumers and the outbox",
      "Timeouts, retries, circuit breakers",
      "Caching and consistency",
      "Tracing",
      "gRPC, GraphQL, NoSQL and Kafka as reading only",
    ],
    endsWith: "Project 7",
    securityThread: "Service-to-service auth, message tampering, replay, poison messages",
    aiThread: "Architecture exploration: ask for designs, then critique for over-engineering",
    systemTrace: "Request → service → outbox → queue → consumer → retry → trace",
    exitCriteria: {
      understand: "Delivery guarantees, consistency, backpressure",
      explain: "Why the outbox pattern exists",
      build: "A multi-service system over a queue",
      debug: "A duplicate or lost message with distributed traces",
      test: "Contract tests between services",
      secure: "Service authentication; replay protection",
      deploy: "Multiple services with a broker",
      operate: "Trace across services; handle a backlog",
    },
  },
  {
    number: 9,
    slug: "ai-enabled-engineering",
    title: "AI-enabled engineering",
    weeks: [22, 23],
    focus: "Building with and on models",
    coreTopics: [
      "LLM behaviour",
      "Calling an LLM API from Go",
      "Structured output and tool calling",
      "MCP server in Go",
      "Embeddings, pgvector, RAG",
      "Evals and prompt versioning",
      "Cost and prompt-injection defence",
    ],
    endsWith: "Project 8",
    securityThread: "Prompt injection, tool permission scoping, data leakage, output validation",
    aiThread:
      "Build agents and MCP tools; write evals that catch the model being wrong; version prompts and re-test every change",
    systemTrace: "User → app → model → tool call → DB → validated answer",
    exitCriteria: {
      understand: "How LLMs fail: hallucination, injection, drift",
      explain: "Why an AI feature needs evals and guardrails",
      build: "An AI assistant with tools, RAG and evals",
      debug: "A wrong model answer by tracing retrieval and tool calls",
      test: "Eval suites for model behaviour",
      secure: "Prompt-injection tests; scoped tool permissions",
      deploy: "AI features behind rate limits",
      operate: "Monitor quality, cost and latency and spend",
    },
  },
  {
    number: 10,
    slug: "capstone-and-system-design",
    title: "Capstone and system design",
    weeks: [24, 25, 26],
    focus: "Owning a system end to end",
    coreTopics: [
      "Requirements and estimation",
      "Design doc and threat model",
      "Reading an unfamiliar open-source Go codebase",
      "Build and deploy",
      "Game day",
      "Postmortem",
    ],
    endsWith: "Capstone and defence",
    securityThread: "Threat model and security review as part of the design doc",
    aiThread:
      "Use AI to learn an unfamiliar codebase, then verify by running and tracing it; keep an AI usage log and defend it at demo day",
    systemTrace: "The learner draws the full trace for their own system",
    exitCriteria: {
      understand: "An unfamiliar codebase's structure",
      explain: "Every design decision in their capstone",
      build: "A production system from requirements",
      debug: "An unannounced outage in a game day",
      test: "A test strategy stated in the design doc",
      secure: "A security review of the capstone",
      deploy: "The capstone in production",
      operate: "On-call for their own system; a blameless postmortem",
    },
  },
];

// Week 13 is the month-3 gate and belongs to no phase; it uses phase -1.
export const GATE_PHASE = -1;

export const weeks: Week[] = [
  {
    number: 1,
    title: "How computers work, Linux",
    phase: 0,
    days: [
      "Install Ubuntu natively or dual-boot; first terminal commands",
      "Binary, hex, CPU, memory (stack, heap, addresses), storage, UTF-8",
      "Processes, file systems, users, permissions, sudo",
      "Shell: pipes, redirection, environment variables, exit codes, grep, find, man pages",
      "Bash scripting; cron; install VS Code, Git, Go",
    ],
    deliverable: "Folder clean-up script",
  },
  {
    number: 2,
    title: "Go basics",
    phase: 1,
    days: [
      "Git: init, commit, diff, log; GitHub and SSH keys; hello world; source → binary → process",
      "Variables, types, constants, operators, fmt",
      "Control flow: if, for, switch; reading os.Args and stdin",
      "Functions, multiple returns, errors as values",
      "go test basics; the Delve debugger",
    ],
    deliverable: "10 CI-graded exercises",
  },
  {
    number: 3,
    title: "Go data",
    phase: 1,
    days: [
      "Arrays and slices (length, capacity, append)",
      "Maps and structs",
      "Pointers and memory, linked back to week 1; methods",
      "Build Project 1: contribution calculator CLI",
      "Project 1 tests; break: floating-point money; fix with integer cents",
    ],
    deliverable: "Project 1",
  },
  {
    number: 4,
    title: "Abstraction and algorithms",
    phase: 1,
    days: [
      "Interfaces and embedding",
      "Packages, modules, go.mod and go.sum; standard library tour",
      "Big-O; searching and sorting",
      "Recursion; stacks, queues, trees",
      "How hash maps work; algorithm practice",
    ],
    deliverable: "Algorithm problem set",
  },
  {
    number: 5,
    title: "Files and Project 2",
    phase: 1,
    days: [
      "File I/O with os and bufio; paths",
      "JSON and CSV encoding",
      "Error wrapping; atomic writes",
      "Build Project 2: local ledger",
      "Break: half-written file after a crash; git bisect",
    ],
    deliverable: "Project 2",
  },
  {
    number: 6,
    title: "SQL",
    phase: 2,
    days: [
      "Relational model; SQLite shell; SELECT, WHERE, ORDER BY",
      "INSERT, UPDATE, DELETE; joins",
      "Aggregates, GROUP BY, subqueries",
      "Keys, constraints, normalisation; ledger schema",
      "database/sql with SQLite; SQL injection demo and parameterised queries",
    ],
    deliverable: "Ledger schema and queries",
  },
  {
    number: 7,
    title: "PostgreSQL",
    phase: 2,
    days: [
      "Install PostgreSQL; psql; roles and least privilege",
      "Transactions, isolation levels, the lost update",
      "Indexes and EXPLAIN",
      "Migrations; sqlc; build Project 3",
      "Break: concurrent writes corrupt a balance; pg_dump backup and restore",
    ],
    deliverable: "Project 3",
  },
  {
    number: 8,
    title: "Networks I",
    phase: 3,
    days: [
      "IP, subnets, NAT; ip, ping, traceroute",
      "DNS resolution and record types; dig",
      "Ports, TCP handshake, UDP; ss, netcat",
      "TCP echo server and client in Go",
      "Packet capture with tcpdump and Wireshark",
    ],
    deliverable: "Annotated packet capture",
  },
  {
    number: 9,
    title: "TLS and HTTP",
    phase: 3,
    days: [
      "TLS, certificates, chains; openssl s_client",
      "HTTP by hand with netcat and curl -v: methods, status codes, headers",
      "HTTP server on raw TCP sockets in Go",
      "Browsers: URL to page, same-origin policy, cookies",
      "Finish the lab; draw the DNS → TCP → TLS → HTTP trace",
    ],
    deliverable: "Raw-socket HTTP server",
  },
  {
    number: 10,
    title: "Backend I",
    phase: 4,
    days: [
      "net/http handlers and ServeMux routing",
      "JSON, validation, status codes",
      "Middleware: slog logging, recovery, request IDs; context and timeouts",
      "Data layer with sqlc; connection pools",
      "httptest and table-driven tests; prompting fundamentals; AI code generation starts: generate tests, then review every line",
    ],
    deliverable: "Tested API skeleton",
  },
  {
    number: 11,
    title: "Backend II",
    phase: 4,
    days: [
      "API design: resources, pagination, filtering, error format",
      "Goroutines, channels, the race detector",
      "OpenAPI spec; idempotency concepts",
      "Build Project 4: Chama REST API",
      "Tests; security review for IDOR and validation gaps",
    ],
    deliverable: "Project 4 code",
  },
  {
    number: 12,
    title: "First deploy on AWS",
    phase: 4,
    days: [
      "Open a personal AWS Free Tier account; MFA, IAM user, budget alert; launch a micro EC2 instance; SSH",
      "Harden the server: users, ufw, SSH keys; copy the binary and run it by hand",
      "systemd service; journalctl",
      "Nginx reverse proxy; DNS record; Let's Encrypt",
      "Break: expired certificate and a slow-query timeout; health check",
    ],
    deliverable: "Project 4 live on HTTPS",
  },
  {
    number: 13,
    title: "Month-3 gate",
    phase: GATE_PHASE,
    days: [
      "Review: computer, OS, Linux",
      "Review: Go and data",
      "Review: networks and HTTP",
      "Gate assessment: timed build-and-debug task",
      "Oral walkthrough: trace one request through Project 4; remediation plan if needed",
    ],
    deliverable: "Gate passed",
  },
  {
    number: 14,
    title: "The browser",
    phase: 5,
    days: [
      "HTML semantics and forms",
      "CSS: box model, flexbox, grid, responsive layout",
      "Accessibility; server rendering with html/template",
      "JavaScript: values, functions, the DOM, events",
      "fetch, ES modules, the event loop",
    ],
    deliverable: "Static ledger pages served by Go",
  },
  {
    number: 15,
    title: "Full stack",
    phase: 5,
    days: [
      "Progressive enhancement: forms work without JS, JS adds interactivity",
      "CORS, XSS, CSP, html/template auto-escaping",
      "Build Project 5",
      "Browser tests with chromedp",
      "Break: stored XSS in a member name and a CORS failure; deploy behind Nginx",
    ],
    deliverable: "Project 5",
  },
  {
    number: 16,
    title: "Identity and security",
    phase: 6,
    days: [
      "Password hashing with argon2id; sign-up and login",
      "Sessions and cookies (HttpOnly, Secure, SameSite); CSRF",
      "Roles and access-control tests; audit log",
      "OAuth 2.0 and OIDC flow; JWT trade-offs",
      "STRIDE threat model; Redis rate limiting; idempotency keys on payments",
    ],
    deliverable: "Threat model and auth features",
  },
  {
    number: 17,
    title: "Containers and CI",
    phase: 6,
    days: [
      "Docker images, layers, multi-stage Go builds",
      "Docker Compose: app, PostgreSQL, Redis",
      "GitHub Actions: test, vet, build, plus security scans (gitleaks, govulncheck, gosec, Semgrep)",
      "Working with a coding agent: write a short spec, split it into tasks, keep a repo context file, write tests first, review every diff before merging; use it to add one feature",
      "Break: a member reads another chama's data; fix and add a regression test",
    ],
    deliverable: "Project 6",
  },
  {
    number: 18,
    title: "Cloud",
    phase: 7,
    days: [
      "IAM roles and least privilege; VPC, subnets, security groups",
      "RDS PostgreSQL; S3",
      "OpenTofu for the whole stack",
      "CI/CD deploy to AWS with rollback; Secrets Manager",
      "Expand/contract migration; zero-downtime deploy",
    ],
    deliverable: "Project 6 on AWS via OpenTofu",
  },
  {
    number: 19,
    title: "Operations",
    phase: 7,
    days: [
      "Prometheus and Grafana; defining SLOs",
      "OpenTelemetry tracing; querying structured logs",
      "Alerts; on-call basics; AWS cost review",
      "k6 load test; pprof profiling",
      "Restore drill; simulated incident and write-up",
    ],
    deliverable: "Incident write-up",
  },
  {
    number: 20,
    title: "Distributed I",
    phase: 8,
    days: [
      "Modular monolith and boundaries",
      "RabbitMQ: queues, acknowledgements, at-least-once delivery",
      "Idempotent consumers; outbox pattern",
      "Build notification and payments services",
      "Webhooks from a simulated mobile-money provider; signature checks",
    ],
    deliverable: "Services talking over a queue",
  },
  {
    number: 21,
    title: "Distributed II",
    phase: 8,
    days: [
      "Timeouts, retries with backoff, circuit breakers",
      "Caching strategies; consistency and CAP",
      "Distributed tracing across services",
      "Break: duplicate webhook double-credits a member; consumer crash mid-message",
      "Comparison reading: gRPC, GraphQL, NoSQL, Kafka; write an ADR",
    ],
    deliverable: "Project 7",
  },
  {
    number: 22,
    title: "AI I",
    phase: 9,
    days: [
      "How LLMs behave: tokens, context, probabilistic output; call an LLM API from Go",
      "Structured output and validation",
      "The tool-calling loop in Go",
      "MCP server in Go exposing scoped chama tools",
      "Prompt injection and tool permission scoping",
    ],
    deliverable: "Working tool-calling assistant",
  },
  {
    number: 23,
    title: "AI II",
    phase: 9,
    days: [
      "Embeddings and pgvector",
      "RAG over the chama constitution and minutes",
      "Evals harness in go test; prompts versioned in Git, every prompt change re-run against the evals, model version pinned",
      "Cost, latency and rate limits; finish Project 8",
      "Break: injected instruction in the minutes tries to trigger a payout",
    ],
    deliverable: "Project 8",
  },
  {
    number: 24,
    title: "Capstone: design",
    phase: 10,
    days: [
      "Stakeholder interview; requirements",
      "Estimation and scope",
      "Design doc: data model, API, architecture",
      "Threat model and test strategy",
      "Design review with the instructor",
    ],
    deliverable: "Approved design doc",
  },
  {
    number: 25,
    title: "Capstone: build",
    phase: 10,
    days: [
      "Build the core domain",
      "Build the API and UI",
      "Read an unfamiliar open-source Go codebase for 2 h; continue building",
      "Tests and CI",
      "Deploy to AWS",
    ],
    deliverable: "Capstone deployed",
  },
  {
    number: 26,
    title: "Capstone: operate and defend",
    phase: 10,
    days: [
      "Dashboards, alerts, load test",
      "Game day: instructor-run outage",
      "Blameless postmortem",
      "Final fixes; export code and a database dump; AWS teardown and credit review",
      "Demo day and defence, including the AI usage log: what AI did and what the learner checked",
    ],
    deliverable: "Capstone and postmortem",
  },
];

export const projects: Project[] = [
  {
    number: "1",
    title: "Contribution calculator",
    weeks: "3",
    what: "Command-line tool that takes members and amounts as arguments and prints balances and shares",
    concepts: "Input parsing, control flow, functions, exit codes, unit tests, Git commits",
    scriptedBreak: "Floating-point money error (0.1 + 0.2); fix with integer cents",
    runsOn: "Learner's laptop",
  },
  {
    number: "2",
    title: "Local ledger",
    weeks: "5",
    what: "Stores members and transactions in JSON/CSV files; import, export, monthly report",
    concepts: "File I/O, serialisation, data structures, error handling, packages",
    scriptedBreak: "Half-written file after a crash corrupts the ledger; fix with atomic writes",
    runsOn: "Learner's laptop",
  },
  {
    number: "3",
    title: "Database-backed ledger",
    weeks: "6–7",
    what: "Same app on SQLite, then migrated to PostgreSQL with a proper schema and reports",
    concepts: "Schema design, foreign keys, transactions, indexes, migrations, SQL injection defence, backups",
    scriptedBreak: "Two concurrent writes break the balance; fix with a transaction and constraints",
    runsOn: "Laptop plus local PostgreSQL",
  },
  {
    number: "4",
    title: "Chama REST API",
    weeks: "10–12",
    what: "Go service exposing members, contributions and loans over HTTP with an OpenAPI spec",
    concepts:
      "Routing, middleware, validation, status codes, pagination, structured logs, integration tests, first deploy with systemd, Nginx and TLS",
    scriptedBreak: "Expired certificate and a slow query causing timeouts",
    runsOn: "AWS EC2",
  },
  {
    number: "5",
    title: "Full-stack web app",
    weeks: "14–15",
    what: "Server-rendered web app for treasurers and members, built with Go templates and plain JavaScript",
    concepts: "html/template, forms, the DOM, fetch, accessibility, CORS, XSS, CSP, chromedp browser tests",
    scriptedBreak: "CORS failure and a stored XSS through a member's name",
    runsOn: "AWS EC2 behind Nginx",
  },
  {
    number: "6",
    title: "Authenticated production API",
    weeks: "16–19",
    what: "Accounts, roles, audit log, rate limits and idempotency keys on payments; containerised, CI/CD, then rebuilt on AWS with OpenTofu and operated",
    concepts: "Hashing, sessions, RBAC, threat model, Docker, GitHub Actions, IaC, monitoring, alerts, restore drill",
    scriptedBreak: "Broken access control (member reads another chama) and a failed deploy that must be rolled back",
    runsOn: "AWS: EC2, RDS, S3",
  },
  {
    number: "7",
    title: "Distributed ledger system",
    weeks: "20–21",
    what: "Splits out a notification service and a payments service that ingests webhooks from a simulated mobile-money provider",
    concepts: "Queues, at-least-once delivery, idempotent consumers, outbox pattern, retries, tracing, load testing",
    scriptedBreak: "Duplicate webhook delivery double-credits a member; the consumer crashes mid-message",
    runsOn: "AWS with RabbitMQ",
  },
  {
    number: "8",
    title: "AI-enabled chama assistant",
    weeks: "22–23",
    what: "Members ask questions in plain language; the assistant answers from the ledger and the group's constitution and minutes; an MCP server exposes scoped tools",
    concepts: "Tool calling, structured output, embeddings, pgvector, RAG, evals, cost limits, prompt-injection defence",
    scriptedBreak: "A minutes document containing an injected instruction tries to trigger a payout tool",
    runsOn: "AWS, same stack",
  },
  {
    number: "Capstone",
    title: "Learner-chosen system",
    weeks: "24–26",
    what: "A new system built from a real stakeholder's requirements",
    concepts:
      "Requirements, estimation, design doc, trade-off defence, an AI usage log, reading unfamiliar code, operating in production, postmortem",
    scriptedBreak: "Instructor-run game day: an unannounced outage to diagnose",
    runsOn: "AWS, justified in the design doc",
  },
];

export const projectArtefacts = [
  "Working deployed code",
  "Tests passing in CI",
  "A short README explaining decisions and trade-offs",
  "A live walkthrough tracing one request through the whole system",
];

export function getWeek(n: number) {
  return weeks.find((w) => w.number === n);
}

export function getPhase(n: number) {
  return phases.find((p) => p.number === n);
}

export function getPhaseBySlug(slug: string) {
  return phases.find((p) => p.slug === slug);
}

export function weeksForPhase(n: number) {
  return weeks.filter((w) => w.phase === n);
}

// Project weeks are written as "3" or "10–12" (en dash), as in the blueprint.
export function projectsForWeek(n: number) {
  return projects.filter((p) => {
    const [start, end = start] = p.weeks.split("–").map(Number);
    return n >= start && n <= end;
  });
}

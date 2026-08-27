# STAR Stories — Alexander Prytula

Composed from `src/schemas/backend-ai.json`, `src/schemas/distributed-systems.json`, and
`src/schemas/full-stack.json`. Framing leans on the Distributed Systems Engineer persona
(architecture ownership, reliability, cross-team technical strategy), with supporting
detail pulled in from the Backend/AI and Full-stack variants where they state a point
more specifically.

All four roles are at **Sisense** (Kyiv, Ukraine), a B2B SaaS business intelligence
platform.

---

## 1. Owning architecture and delivery for a distributed AI domain

**Role:** Technical Lead, AI domain team — Jun 2023 – Sep 2025

| Element | Details |
|---|---|
| **Situation** | Sisense's AI domain sat at the intersection of data science and product engineering. LLM and vector-database capabilities existed as research prototypes but had no path into the product as reliable, production-grade services, and the domain spanned multiple Node.js and Python microservices with no single technical owner. |
| **Task** | As Technical Lead, own the architecture and delivery for the distributed AI microservice domain end to end — turn prototypes into production services, and become the technical authority other engineers could rely on for system design and implementation trade-offs. |
| **Action** | Ran architecture and delivery across the Node.js/Python microservice set, integrating LLM and vector-database capabilities directly into product workflows. Built the CI pipeline for AI microservices, including end-to-end test coverage and release quality gates, and made it the team's standard. Guided engineers through system design and implementation trade-offs to unblock stalled work across AI-enabled services. |
| **Result** | Research-stage LLM/vector-DB work shipped as standardized, production-grade services. Became the go-to technical authority for the domain. The CI/E2E testing pattern built for the AI services became the reliability baseline the rest of the team worked from. |

---

## 2. Auditing a 4-team domain and reporting risk to leadership

**Role:** Staff Software Engineer, analytics domain team — Jun 2025 – Jan 2026

| Element | Details |
|---|---|
| **Situation** | The analytics domain spanned 4 engineering teams with no consolidated view of technical health — service ownership, code quality, and reliability gaps were scattered across teams, and release blockers were hurting deployment predictability. |
| **Task** | As Staff Software Engineer, take ownership of the domain's technical health: surface the real risks, and turn them into a prioritized set of recommendations leadership could act on. |
| **Action** | Audited service ownership, code quality, and reliability gaps across all 4 teams. Wrote a comprehensive report covering architecture, delivery, and quality recommendations, and presented it to department leadership and the VP of Engineering. In parallel, coordinated delivery across the 4 teams, contributed to CI/CD and release-process improvements, and designed a QA strategy for backend-heavy workflows. |
| **Result** | Cut release blockers and improved deployment predictability across all 4 teams. Leadership received a concrete, prioritized roadmap for architecture, delivery, and quality investment. Test coverage increased under the new QA strategy. |

---

## 3. Architecting a new product initiative while owning incident response

**Role:** Technical Lead, new product initiative — Oct 2022 – Jun 2023

| Element | Details |
|---|---|
| **Situation** | A new product initiative needed a system architecture and delivery foundation from scratch, coordinated across multiple engineering teams — while shared systems elsewhere in the org were still generating high-impact production incidents that had no clear owner. |
| **Task** | As Technical Lead, design the high-level architecture, coordinate implementation across teams, and act as the escalation point for the hardest delivery and runtime problems spanning frontend and backend. |
| **Action** | Designed the system architecture and coordinated implementation across multiple engineering teams. Led resolution of high-impact production incidents on shared systems. Became the trusted escalation point for complex delivery and runtime challenges. Built the initial CI/CD pipeline and test framework, and mentored engineers across three teams on architecture and delivery. |
| **Result** | Kept business disruption from shared-system incidents to a minimum. Held automated test coverage near 90% for the new initiative from early on. Established an architecture and delivery foundation multiple teams could build on. |

---

## 4. Stabilizing a failing high-load backend domain

**Role:** Technical Lead, high-load service domain — May 2022 – Oct 2022

| Element | Details |
|---|---|
| **Situation** | A high-load backend service domain was assigned with failing automation tests and no clear diagnosis of why — reliability and maintainability risk was hiding somewhere in its architecture, libraries, or build process, and engineering decisions across R&D were inconsistent. |
| **Task** | Take ownership of the domain, find the root causes of the instability, and restore release reliability — while also improving how engineering decisions got made across teams. |
| **Action** | Investigated backend performance, architecture, libraries, and build processes to isolate reliability and maintainability gaps. Fixed the failing automation. Established cross-team technical committees to standardize engineering decision-making across R&D. Ran delivery as Scrum Master to improve team alignment. |
| **Result** | Cut test failures by 30% and improved release reliability. The cross-team technical committees became a lasting mechanism for standardizing engineering decisions beyond this one domain. |

---

## Draft notes — extended technical ownership (not yet formed into STAR, elaborate later)

Raw material for broadening what "technical ownership" covers across the stories above.
Not mapped to a specific role/timeframe yet — needs to be reconciled against which of the
4 roles each piece actually happened in before it becomes a proper STAR entry.

- **Dependency and layer cleanup**: audited application dependencies, purged ones that
  were either redundant or vulnerable, refactored as a result. Cleaned up the application
  layers — API, controllers, services, outgoing ports, utils — and infra-facing wrapper
  libraries (RabbitMQ, Zookeeper, etc.).
- **CI pipeline rebuild**: rebuilt the CI pipeline from scratch. Usually paired with
  integrating test libraries and making them runnable both locally (docker-compose) and
  in GitLab CI services, then teaching that workflow to both the home team and peer teams.
- **Environment portability**: made the app "environment-ignorant" — runnable outside
  production. Covers dotenv-style libraries, env-to-settings interpolation across
  different app layers, and resolving config across those layers.
- **Sync → async request flow investigation**: investigated request flows to identify
  which ones warranted converting from sync to async (RabbitMQ), driven by problems like
  long-hanging socket connections.

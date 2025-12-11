# HoneyPot

UK-based scam call honeypot that wastes scammers' time with AI agents, analyses their tactics, and publishes insights to protect vulnerable people.

## What It Does

1. **Bait** — Seed phone numbers across UK platforms (Gumtree, Craigslist, Facebook Marketplace)
2. **Trap** — AI voice agents answer scammer calls, keeping them engaged as long as possible
3. **Analyse** — Transcripts are categorised by scam type and techniques used
4. **Publish** — Dashboard displays trends filtered by vulnerability type

## Tech Stack

| Component | Tool | Purpose |
|-----------|------|---------|
| Voice Agent | Retell AI | Handles calls, runs personas |
| Orchestration | n8n | Webhooks, LLM chains, DB writes |
| Analysis | OpenAI/Anthropic | Categorise & summarise transcripts |
| Frontend + DB | Bolt.new | Full-stack dashboard with database |

## Target Scam Types

- **Bank Fraud** — "Your account has been compromised"
- **HMRC/Government** — Tax debt threats, arrest warrants
- **Utility/Telecom** — Unpaid bills, service disconnection

## AI Personas

Two victim personas mapped to these scam types:

| Persona | Best Against | Time-Wasting Tactics |
|---------|--------------|---------------------|
| **Elderly/Grandma** | Bank, Utility, HMRC | Hard of hearing, searching for reading glasses, finding notepad, trusting |
| **Technophobic Homeowner** | Utility/Telecom, Bank | Doesn't understand smart meters or online banking, asks scammer to explain everything, confused by "account numbers" |

---

## Task List

### Phase 1: Infrastructure Setup

- [x] **1.1** Acquire UK VOIP number
- [x] **1.2** Set up Retell AI account and configure webhook endpoints
- [x] **1.3** Set up cloud n8n instance

### Phase 2: Voice Agent Development (Retell)

- [x] **2.1** Create base agent configuration in Retell
- [x] **2.2** Write system prompt for **Elderly Persona** → `prompts/elderly-persona.md`
- [x] **2.3** Write system prompt for **Technophobic Homeowner Persona** → `prompts/technophobic-homeowner-persona.md`
- [x] **2.4** Configure call recording and transcription output
- [x] **2.5** Test each persona with sample calls

### Phase 3: Workflow Automation (n8n)

- [ ] **3.1** Create webhook endpoint to receive Retell call-complete events
- [ ] **3.2** Build transcript processing node
- [ ] **3.3** Create LLM analysis chain with prompt:
  - Categorise scam type (Bank Fraud, HMRC/Gov, Utility/Telecom)
  - Extract social engineering techniques used
  - Identify target vulnerability type
  - Generate 2-3 sentence summary
  - Flag "unique" or novel tactics
- [ ] **3.4** Build database write node (connect to Bolt.new backend)
- [ ] **3.5** Add error handling and retry logic
- [ ] **3.6** Create manual trigger for reprocessing failed calls

### Phase 4: Frontend + Database (Bolt.new)

- [ ] **4.1** Prompt Bolt.new to generate full-stack dashboard:
- [ ] **4.3** Add filter controls (vulnerability type, scam category, date range)
- [ ] **4.4** Create scam card component with:
  - Category badge
  - Summary + techniques tags
  - Call duration
  - "Why this was unique" section
- [ ] **4.5** Add transcript expand/collapse
- [ ] **4.6** Build statistics overview
- [ ] **4.7** Test database connection and queries

### Phase 5: Seeding Operations

- [ ] **5.1** Create listing templates for each platform:
  - Gumtree (selling furniture, electronics)
  - Craigslist (job seeking, services needed)
  - Facebook Marketplace
- [ ] **5.2** Document seeding process and rotation schedule
- [ ] **5.3** Set up tracking to monitor which platforms generate most calls
- [ ] **5.4** Create "burnt number" rotation process

### Phase 6: Safety & Compliance [extra]

- [ ] **6.1** Implement wrong-number detection (legitimate callers)
- [ ] **6.2** Add call screening logic to filter non-scam calls

---
## Legal Note

This project operates within UK law. All recordings are made with awareness that scammers have no reasonable expectation of privacy when conducting fraud. The system includes safeguards to identify and protect legitimate callers.

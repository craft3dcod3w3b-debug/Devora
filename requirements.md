You are a senior full-stack product engineer, frontend architect, UI/UX designer, accessibility engineer, SEO engineer, and developer-tools product specialist.

I want you to build a REAL production-ready website called:

DEVORA

Tagline:
"Developer tools, all in one place."

IMPORTANT:
This is NOT a portfolio project.
This is NOT a demo.
This website will be publicly deployed and used by real developers.

The goal is to build a premium, fast, reliable developer toolbox where developers can quickly access useful online tools without creating an account.

==================================================
1. PRODUCT VISION
==================================================

Devora is a developer utility platform.

A developer should be able to visit Devora and quickly:

- Format JSON
- Validate JSON
- Encode/decode Base64
- Encode/decode URLs
- Generate UUIDs
- Decode JWTs
- Generate hashes
- Test regular expressions
- Convert timestamps
- Generate cron expressions
- Format SQL
- Format HTML
- Format CSS
- Convert JSON/CSV/XML/YAML
- Generate colors
- Generate test data
- Work with text
- Generate developer snippets
- Inspect/transform data
- Use networking utilities
- Use other developer productivity tools

The platform should eventually support 100+ developer tools.

However:

DO NOT try to build 100+ tools in the first phase.

The architecture must make adding new tools extremely easy.

==================================================
2. DEVELOPMENT APPROACH — PHASE BASED
==================================================

IMPORTANT:

I will build Devora in multiple phases.

You MUST NOT attempt to complete the entire website in one phase.

The project must be designed so each phase can be implemented independently without breaking previous work.

When I give you:

PHASE 1
PHASE 2
PHASE 3
etc.

Only work on that phase unless I explicitly ask you to modify previous functionality.

Before making changes:

1. Inspect the existing project.
2. Understand the current architecture.
3. Preserve working functionality.
4. Do not unnecessarily rewrite existing code.
5. Do not replace working components without a reason.
6. Do not change the visual system randomly.
7. Do not introduce breaking changes.

Every phase must leave the application in a working state.

==================================================
3. INITIAL TECH STACK
==================================================

Use:

- React
- Vite
- TypeScript
- Tailwind CSS
- React Router
- Lucide React
- Framer Motion only when genuinely useful

Use modern React patterns.

Use strict TypeScript.

Avoid unnecessary dependencies.

IMPORTANT:

Do NOT add Supabase.
Do NOT add Firebase.
Do NOT add authentication.
Do NOT add a database.

The initial version should be primarily client-side.

If a future feature genuinely requires backend processing, design the architecture so it can be added later.

==================================================
4. BRAND
==================================================

Brand:

Devora

Tagline:

"Developer tools, all in one place."

The brand should feel:

- premium
- technical
- modern
- trustworthy
- fast
- developer-focused
- professional

Do NOT make it look like a generic AI website.

Do NOT use childish illustrations.

Do NOT use random gradients everywhere.

Do NOT use excessive glassmorphism.

==================================================
5. LOGO
==================================================

The Devora logo will be provided separately.

The logo should be a text-free icon.

Do not generate a wordmark.

Design the application so the logo works well in:

- desktop navbar
- mobile navbar
- footer
- favicon
- browser tab
- dark mode
- light mode

==================================================
6. VISUAL DESIGN SYSTEM
==================================================

Create a consistent professional design system.

The UI should feel similar to high-quality modern developer products.

Use:

- excellent typography
- subtle borders
- clear hierarchy
- clean spacing
- strong contrast
- restrained shadows
- consistent radius
- professional icons
- clear interactive states

Create design tokens for:

- background
- foreground
- muted foreground
- primary
- secondary
- card
- border
- success
- warning
- error
- code background

Do NOT hardcode random colors throughout components.

==================================================
7. DEVELOPER-FIRST UI
==================================================

Developer tools require a different UI style from normal consumer websites.

Prioritize:

- keyboard accessibility
- code readability
- monospace fonts for code/data
- large editing areas
- copy buttons
- download buttons
- clear formatting
- side-by-side editors where appropriate
- responsive stacking on mobile
- fast interactions

Tool interfaces should feel like real developer utilities.

==================================================
8. LIGHT + DARK MODE
==================================================

Support:

Light Mode
Dark Mode
System Mode

Persist the user's preference.

Dark mode must be professionally designed.

Code editors and output panels should be especially readable in dark mode.

Do not simply invert colors.

==================================================
9. MAIN NAVIGATION
==================================================

Desktop navbar:

Devora logo
Devora

Navigation:

Tools
Categories
Popular
About

Search

Theme toggle

Mobile:

Logo
Search
Menu button

Mobile navigation should be clean and easy to navigate.

Do not overcrowd the navbar.

==================================================
10. HOMEPAGE
==================================================

Build a premium developer-focused homepage.

Hero:

"Developer tools, all in one place."

Supporting text:

"Fast, free utilities for formatting, encoding, debugging, converting, generating, and working with data."

Primary CTA:

"Explore Tools"

Secondary CTA:

"Popular Tools"

Hero should also contain a prominent global search.

Example:

"Search developer tools..."

Users should immediately understand what Devora does.

==================================================
11. HOMEPAGE SECTIONS
==================================================

Homepage should include:

1. Hero
2. Popular Tools
3. Browse Categories
4. Featured Tools
5. Recently Used Tools
6. Why Devora
7. Developer-focused SEO content
8. Footer

IMPORTANT:

Do not create fake "recently used by thousands of developers" data.

If there is no user history, either:

- hide Recently Used
OR
- use the user's own local history.

Never use fake activity.

==================================================
12. TOOL CATEGORIES
==================================================

Initial categories:

1. JSON Tools
2. Encoding & Decoding
3. Generators
4. Text Tools
5. Formatters
6. Converters
7. Web Tools
8. Security & Hashing
9. Regex Tools
10. Date & Time
11. Color Tools
12. SQL Tools
13. Developer Utilities
14. Networking Tools
15. Data Tools
16. Testing Tools

Architecture must allow categories to be added later.

==================================================
13. INITIAL TOOLS
==================================================

Start with approximately 30–40 high-quality tools.

Do NOT build 100 tools immediately.

INITIAL TOOL SET:

JSON:

- JSON Formatter
- JSON Validator
- JSON Minifier
- JSON Viewer
- JSON to CSV
- CSV to JSON

ENCODING:

- Base64 Encoder
- Base64 Decoder
- URL Encoder
- URL Decoder
- HTML Encoder
- HTML Decoder

GENERATORS:

- UUID Generator
- Password Generator
- Random String Generator
- Lorem Ipsum Generator
- QR Code Generator

WEB:

- JWT Decoder
- HTTP Status Code Lookup
- User-Agent Parser
- URL Parser

TEXT:

- Word Counter
- Character Counter
- Case Converter
- Text Diff Checker
- Remove Duplicate Lines
- Sort Lines
- Whitespace Cleaner
- Slug Generator

FORMATTERS:

- HTML Formatter
- CSS Formatter
- JavaScript Formatter
- SQL Formatter
- XML Formatter

DATE/TIME:

- Unix Timestamp Converter
- Date/Time Converter
- Cron Expression Generator

SECURITY:

- MD5 Hash Generator
- SHA Hash Generator
- HMAC Generator

COLOR:

- HEX/RGB/HSL Converter
- Color Picker
- Contrast Checker

REGEX:

- Regex Tester
- Regex Generator/Helper

==================================================
14. TOOL REGISTRY ARCHITECTURE
==================================================

This is extremely important.

Do NOT hardcode tool cards individually throughout the application.

Create a central tool registry.

Each tool should have:

- id
- slug
- name
- description
- category
- icon
- keywords
- featured
- popular
- component
- SEO title
- SEO description

Example concept:

tools/
  json/
  encoding/
  generators/
  formatters/
  text/
  security/
  regex/
  date-time/
  colors/

And a central registry.

Adding a new tool should be as simple as:

1. Create tool component
2. Add metadata
3. Register tool
4. Route becomes available

Do not require modifying multiple unrelated files.

==================================================
15. ROUTING
==================================================

Every tool gets its own dedicated URL.

Examples:

/tools/json-formatter
/tools/json-validator
/tools/base64-encoder
/tools/base64-decoder
/tools/jwt-decoder
/tools/uuid-generator
/tools/regex-tester
/tools/sql-formatter
/tools/timestamp-converter

Category routes:

/categories/json
/categories/encoding
/categories/formatters
/categories/security
/categories/text

Also:

/tools
/categories
/popular

==================================================
16. TOOL PAGE TEMPLATE
==================================================

Every tool must use a consistent reusable layout.

Structure:

Breadcrumbs

Tool title

Short description

Tool interface

Actions

Result/output

How it works

Example

Tips

FAQ

Related tools

The actual tool must appear near the top.

Do NOT bury tools underneath huge SEO content.

==================================================
17. TOOL INTERFACE DESIGN
==================================================

Different tools require different layouts.

Support reusable layouts such as:

Single Input → Output

Two Panel Editor

Input → Transform → Output

Upload → Process → Download

Form → Result

Example:

JSON Formatter:

┌─────────────────────┬─────────────────────┐
│ INPUT               │ OUTPUT              │
│                     │                     │
│ JSON editor         │ Formatted JSON      │
│                     │                     │
└─────────────────────┴─────────────────────┘

Actions:

Format
Minify
Copy
Download
Clear

On mobile:

Input
↓
Actions
↓
Output

Never force horizontal scrolling on mobile.

==================================================
18. CODE EDITOR EXPERIENCE
==================================================

For code/data tools, provide:

- monospace font
- line-height appropriate for code
- large editor area
- copy button
- clear button
- download where useful
- error messages
- syntax-friendly presentation

Do not add a huge heavy code editor library unless genuinely necessary.

Prefer lightweight implementations where possible.

==================================================
19. JSON TOOLS
==================================================

JSON Formatter:

Input JSON
→ Format
→ Pretty output

JSON Validator:

Input JSON
→ Validate
→ Show useful error

JSON Minifier:

Input
→ Minified JSON

JSON Viewer:

Render nested JSON clearly.

JSON → CSV:

Convert compatible JSON arrays into CSV.

CSV → JSON:

Convert CSV into structured JSON.

All tools must handle malformed input gracefully.

Never display:

NaN
undefined
broken output
uncaught exceptions

==================================================
20. ENCODING TOOLS
==================================================

Base64:

Encode
Decode

URL:

Encode
Decode

HTML:

Encode
Decode

Use browser-native APIs where appropriate.

Handle Unicode correctly.

==================================================
21. JWT DECODER
==================================================

Allow users to paste a JWT.

Decode:

Header
Payload

Show readable JSON.

Clearly explain:

"Decoding a JWT does NOT verify its signature."

Do NOT pretend to verify signatures unless actual verification functionality exists.

Never expose or store user input.

==================================================
22. GENERATORS
==================================================

UUID Generator:

Generate one or multiple UUIDs.

Actions:

Generate
Copy
Download

Password Generator:

Options:

Length
Uppercase
Lowercase
Numbers
Symbols

Strength indicator.

Random String Generator:

Length
Character options

Lorem Ipsum:

Paragraphs
Words
Sentences

QR Code:

Input
Generate
Download

==================================================
23. TEXT TOOLS
==================================================

Word Counter:

Words
Characters
Characters excluding spaces
Sentences
Paragraphs

Case Converter:

UPPERCASE
lowercase
Title Case
Sentence case
camelCase
snake_case
kebab-case

Text Diff:

Input A
Input B

Show differences clearly.

Duplicate Line Remover:

Paste text
Remove duplicates
Copy result

Sort Lines:

Alphabetical
Reverse
Length

Whitespace Cleaner:

Remove unnecessary spaces/newlines.

==================================================
24. FORMATTERS
==================================================

Provide high-quality formatters.

HTML
CSS
JavaScript
SQL
XML

IMPORTANT:

Do not claim to fully support every language feature unless the implementation actually does.

If using a formatter library, choose stable lightweight libraries.

Provide:

Format
Minify where appropriate
Copy
Download
Clear

==================================================
25. SECURITY / HASHING
==================================================

Hash tools should run client-side whenever possible.

Include:

MD5
SHA-1
SHA-256
SHA-512

Clearly explain what each algorithm is.

For cryptographic/security tools:

Do not make misleading security claims.

==================================================
26. REGEX TESTER
==================================================

Interface:

Regex pattern
Flags
Test string

Show:

Matches
Match count
Groups where practical
Errors

Provide examples.

Do not execute arbitrary code.

Use safe browser regex functionality.

Handle invalid patterns gracefully.

==================================================
27. DATE / TIME
==================================================

Unix timestamp converter:

Timestamp → Date
Date → Timestamp

Date/time converter:

Input date/time
Timezone
Output timezone

Cron generator:

Provide an understandable UI.

Do not require users to manually understand cron syntax.

==================================================
28. COLOR TOOLS
==================================================

HEX
RGB
HSL

Allow conversion.

Color picker.

Contrast checker:

Foreground
Background
Contrast ratio
WCAG result

Clearly display accessibility result.

==================================================
29. SEARCH
==================================================

Global search is critical.

Search by:

- name
- description
- category
- keywords

Examples:

"json"
"encode"
"jwt"
"regex"
"sql"
"timestamp"

Show instant results.

Support keyboard navigation.

Add keyboard shortcut:

/

to focus search where appropriate.

==================================================
30. RECENT TOOLS
==================================================

Store recently used tools in localStorage.

Show:

"Recently Used"

Only show this section if the user has actual history.

Allow:

Clear history

Do not collect server-side usage history initially.

==================================================
31. FAVORITES
==================================================

Allow users to favorite tools using localStorage.

No account required.

Add:

Favorite / unfavorite

Favorites page:

/favorites

If no favorites exist, show a useful empty state.

==================================================
32. SEO
==================================================

SEO is a major priority.

Every tool gets unique:

Title
Meta description
Canonical
Open Graph
Twitter metadata

Examples:

"JSON Formatter - Format JSON Online | Devora"

"Base64 Encoder - Encode Text to Base64 | Devora"

"JWT Decoder - Decode JWT Tokens Online | Devora"

Do not keyword stuff.

==================================================
33. PROGRAMMATIC SEO
==================================================

The architecture must support many tool-specific pages.

However:

DO NOT generate thousands of thin SEO pages.

Only create pages that provide genuine utility.

Each page should have:

- real tool
- useful explanation
- examples
- FAQ
- related tools

==================================================
34. STRUCTURED DATA
==================================================

Use appropriate JSON-LD:

WebSite
WebApplication
SoftwareApplication
BreadcrumbList
FAQPage

Only when accurate.

==================================================
35. INTERNAL LINKING
==================================================

Each tool page should link to related tools.

Example:

JSON Formatter:

→ JSON Validator
→ JSON Minifier
→ JSON Viewer
→ JSON to CSV

Base64 Encoder:

→ Base64 Decoder
→ URL Encoder
→ URL Decoder
→ JWT Decoder

Regex Tester:

→ Regex Generator
→ Text Diff
→ Text Cleaner

==================================================
36. ADS
==================================================

Devora will eventually be monetized with advertisements.

Create reusable:

AdSlot

component.

Examples:

<AdSlot placement="top" />
<AdSlot placement="middle" />
<AdSlot placement="bottom" />

Do NOT use fake advertisements.

Development version should use subtle placeholders.

Ads must not:

- interfere with tools
- look like navigation
- look like buttons
- cover content
- make mobile unusable
- appear excessively

Design ad placements carefully.

==================================================
37. PRIVACY
==================================================

Developer tools may handle sensitive code/data.

Privacy should be emphasized.

Where processing happens entirely in the browser:

"Processed locally in your browser."

Only display this statement where technically true.

Do not upload user data unnecessarily.

Do not store tool input remotely.

==================================================
38. PERFORMANCE
==================================================

Performance is extremely important.

Use:

- code splitting
- lazy-loaded tool components
- lightweight dependencies
- efficient rendering
- optimized assets
- minimal JavaScript on pages that don't need it

Do not load every tool's code on initial page load.

A user opening JSON Formatter should not download unnecessary PDF/image tool libraries.

==================================================
39. ACCESSIBILITY
==================================================

Implement:

- semantic HTML
- labels
- keyboard navigation
- focus states
- accessible buttons
- proper contrast
- screen-reader-friendly controls
- reduced-motion support

Keyboard shortcuts should never interfere with normal text input.

==================================================
40. RESPONSIVE DESIGN
==================================================

Test and design intentionally for:

320px
375px
425px
768px
1024px
1440px+

Desktop tool editors can use two columns.

Mobile should stack naturally.

No horizontal page scrolling.

No broken cards.

No clipped text.

No overflowing code editors.

Buttons must remain usable.

==================================================
41. ERROR HANDLING
==================================================

Every tool must handle:

Empty input
Invalid input
Malformed data
Unsupported formats
Large input
Unexpected errors

Use friendly error messages.

Never crash the application.

Never leave broken UI after an error.

==================================================
42. NO FAKE DATA
==================================================

NEVER create:

Fake users
Fake testimonials
Fake reviews
Fake ratings
Fake developer counts
Fake usage statistics
Fake downloads
Fake notifications

If a statistic is not real, don't display it.

==================================================
43. LEGAL / TRUST PAGES
==================================================

Create:

/about
/contact
/privacy-policy
/terms
/cookie-policy

Keep them professional.

==================================================
44. 404 PAGE
==================================================

Create a polished branded 404.

Example:

"Looks like this tool doesn't exist."

Buttons:

Browse Tools
Go Home

==================================================
45. ARCHITECTURE
==================================================

Suggested structure:

src/

components/
  layout/
  navigation/
  ui/
  tool/
  search/
  ads/

pages/
  Home
  Tools
  Categories
  Favorites
  About
  Contact
  Legal
  NotFound

tools/
  json/
  encoding/
  generators/
  text/
  formatters/
  security/
  regex/
  date-time/
  colors/

data/
  tools.ts
  categories.ts

hooks/
  useSearch
  useFavorites
  useRecentTools
  useTheme

utils/
  formatting
  validation
  storage

types/

lib/

Do not blindly follow this structure if a better architecture is appropriate.

==================================================
46. FUTURE SCALABILITY
==================================================

The architecture should make it easy to add:

- 100+ tools
- API tools
- AI-assisted developer tools
- code generators
- database utilities
- networking tools
- Git utilities
- Docker utilities
- regex libraries
- mock data generators
- test data generators
- cloud processing
- user accounts
- saved projects
- premium features
- API access

Do not implement these yet.

==================================================
47. FUTURE BACKEND
==================================================

Do NOT implement a backend initially.

Later, a backend could support:

- accounts
- saved tools
- cloud projects
- usage analytics
- premium tools
- API keys
- developer accounts
- subscriptions

Supabase can be considered later.

Do not install it now.

==================================================
48. DEVELOPMENT PHASES
==================================================

PHASE 1:
Foundation + design system + routing + navigation + homepage + tool registry.

PHASE 2:
Core JSON tools.

PHASE 3:
Encoding/decoding tools.

PHASE 4:
Generators.

PHASE 5:
Text tools.

PHASE 6:
Formatters.

PHASE 7:
Security/hashing tools.

PHASE 8:
Regex tools.

PHASE 9:
Date/time tools.

PHASE 10:
Color tools.

PHASE 11:
Search + favorites + recently used.

PHASE 12:
SEO + structured data + internal linking.

PHASE 13:
Ad-ready system.

PHASE 14:
Performance + accessibility + responsive QA.

PHASE 15:
Final production polish.

IMPORTANT:

I will tell you when to start each phase.

Do NOT automatically implement all phases.

==================================================
49. PHASE RULE
==================================================

Whenever I provide a phase:

FIRST:
Inspect the existing code.

SECOND:
Explain briefly what you are going to change.

THIRD:
Implement only the requested phase.

FOURTH:
Check for broken imports/routes/components.

FIFTH:
Check responsive behavior.

SIXTH:
Check for TypeScript/build errors.

SEVENTH:
Summarize what was completed.

Never destroy existing functionality to implement a new phase.

==================================================
50. DESIGN QUALITY RULE
==================================================

This is extremely important.

I do NOT want:

- broken layouts
- overlapping elements
- inconsistent spacing
- random font sizes
- inconsistent buttons
- broken mobile navigation
- cards with different heights for no reason
- clipped text
- overflowing code
- ugly forms
- excessive empty space
- excessive animations
- random colors
- inconsistent icons

Every page must feel like part of the same product.

==================================================
51. FINAL QUALITY STANDARD
==================================================

Devora should feel like a website developers would actually bookmark.

The experience should be:

FAST
CLEAN
POWERFUL
PRIVATE
PROFESSIONAL
MOBILE-FRIENDLY
ACCESSIBLE
SEO-FRIENDLY

Do not make it look like a coding assignment.

Do not make it look like a portfolio project.

Build it as a real developer product.

==================================================
STARTING INSTRUCTION
==================================================

Do NOT start implementing every tool.

First prepare the project for PHASE 1.

Inspect the current project and then build only the foundation required for Phase 1.

After Phase 1 is complete, stop and wait for my next phase instruction.
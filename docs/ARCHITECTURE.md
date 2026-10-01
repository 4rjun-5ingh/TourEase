# TourEase -- Architecture

**Project Name:** TourEase
**Document:** Architecture
**Derived From:** MASTER_SPEC.md, MVP.md, TECH.md, AI.md, DESIGN.md
**Purpose:** Define the system architecture, component boundaries, data flow, and technical decisions for TourEase within the constraints established by the specification documents.

---

# 1. Architecture Overview

TourEase is a three-tier web application:

1. **Frontend** -- Modern responsive web application (TypeScript-based framework)
2. **Backend** -- Python API server
3. **Database** -- Supabase (PostgreSQL + Auth + Storage + Realtime)

External integrations connect through the backend to maintain security and abstraction.

```
+-------------------+       +-------------------+       +-------------------+
|                   |       |                   |       |                   |
|    Frontend       | <---> |  Python Backend   | <---> |    Supabase       |
|  (TypeScript)     |       |  (REST API)       |       |  (PostgreSQL)     |
|                   |       |                   |       |  (Auth)           |
+-------------------+       +-------------------+       |  (Storage)        |
                                    |                   |  (Realtime)       |
                                    |                   +-------------------+
                                    |
                          +---------+---------+
                          |                   |
                    +-----+-----+       +-----+-----+
                    | AI        |       | External  |
                    | Provider  |       | APIs      |
                    | (LLM)     |       | (Maps,    |
                    |           |       |  Weather, |
                    +-----------+       |  Places)  |
                                        +-----------+
```

Reference: TECH.md Sections 2-4, 58-59.

---

# 2. Fixed Technical Decisions

These are non-negotiable per the specification documents:

| Decision        | Value                                      | Source           |
|-----------------|--------------------------------------------|------------------|
| Database        | Supabase (PostgreSQL)                      | TECH.md Sec 2    |
| Backend         | Python                                     | TECH.md Sec 3    |
| Frontend Type   | TypeScript preferred                       | TECH.md Sec 5    |
| Auth            | Supabase Auth                              | TECH.md Sec 10   |
| Security Model  | Row Level Security (RLS)                   | TECH.md Sec 9    |
| AI Provider     | Provider-flexible (abstracted)             | TECH.md Sec 13   |
| Maps Provider   | Provider-flexible (abstracted)             | TECH.md Sec 18   |
| Target Market   | India-first (INR, English + Hindi)         | MVP.md Sec 49    |
| Architecture    | Avoid premature complexity                 | TECH.md Sec 59   |

---

# 3. Frontend Architecture

## 3.1 Technology

The frontend must be a modern responsive web application built with TypeScript. The exact framework (e.g., Next.js, Vite + React) should be selected during project initialization based on:
- Performance
- Developer productivity
- Ecosystem maturity
- Mapping library compatibility
- PWA support
- Deployment simplicity

Reference: TECH.md Section 4.

## 3.2 Application Structure

```
frontend/
  src/
    app/              -- Pages / routes
    components/       -- Reusable UI components
      ui/             -- Base design system (buttons, cards, inputs, modals)
      layout/         -- Navigation, header, footer, sidebar
      destination/    -- Destination cards, detail sections
      trip/           -- Trip dashboard, creation form
      itinerary/      -- Itinerary view, day view, item card
      ai/             -- Chat interface, recommendation cards, prompts
      map/            -- Map component, markers, controls
      expense/        -- Expense list, add form, budget display
      safety/         -- Safety Center, SOS, emergency cards
      admin/          -- Admin dashboard components
      common/         -- Loading, error, empty states
    services/         -- API client, Supabase client, map service, location service
    hooks/            -- Custom React hooks (auth, location, preferences)
    types/            -- TypeScript type definitions
    utils/            -- Helpers, formatters, validators
    i18n/             -- Internationalization (English, Hindi)
    config/           -- Environment config, constants
    styles/           -- Global styles, design tokens, theme
  public/             -- Static assets, images, icons
```

## 3.3 Key TypeScript Types

Per TECH.md Section 5, types must exist for:

- User
- Profile (preferences, interests, accessibility)
- Trip
- Destination (with trust classification)
- Itinerary / ItineraryItem
- Expense / Budget
- EmergencyContact
- EmergencyEvent
- SafetyAlert
- Location / Coordinates
- Notification
- AIMessage / AIResponse / AIAction
- WeatherData
- NearbyService

## 3.4 State Management

- Auth state: managed through Supabase Auth session
- User profile: fetched on auth, cached locally
- Trip/itinerary state: fetched per trip context
- AI conversation: maintained per session
- Location: managed via browser Geolocation API with permission state
- Notifications: in-app store

## 3.5 Navigation Structure

Per DESIGN.md Sections 8-9:

Primary navigation areas:
- Home
- Explore
- Trips
- Map
- Safety
- AI Assistant
- Profile

Mobile: bottom navigation with fast access to current trip, map, AI, Safety Center, SOS.
Desktop: persistent side/top navigation with multi-column layouts.

## 3.6 Responsive Breakpoints

- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

Mobile is the priority layout for travel and emergency use.
Reference: TECH.md Sections 56-57, DESIGN.md Sections 83-84.

## 3.7 PWA Considerations

Per TECH.md Section 30:
- Installability
- App-like navigation
- Offline caching of critical data (itinerary, emergency contacts, emergency numbers)
- Fast startup

---

# 4. Backend Architecture

## 4.1 Technology

Python API server. Framework to be selected (FastAPI recommended for async support, structured validation, and OpenAPI generation, but final choice deferred to project setup).

Reference: TECH.md Section 3.

## 4.2 Application Structure

```
backend/
  app/
    main.py             -- Application entry point
    config.py           -- Environment config, secrets loading
    routes/
      auth.py           -- Authentication endpoints
      users.py          -- User/profile endpoints
      destinations.py   -- Destination CRUD and search
      trips.py          -- Trip CRUD
      itineraries.py    -- Itinerary CRUD
      expenses.py       -- Expense CRUD, budget
      safety.py         -- Safety Center, emergency services, contacts
      emergency.py      -- SOS workflow, emergency events
      ai.py             -- AI assistant endpoint
      weather.py        -- Weather proxy
      location.py       -- Location sharing
      notifications.py  -- Notification endpoints
      admin.py          -- Admin endpoints
      nearby.py         -- Nearby services search
    services/
      ai_service.py     -- AI provider abstraction, prompt management, tool execution
      map_service.py    -- Map/geocoding provider abstraction
      weather_service.py -- Weather provider abstraction
      notification_service.py -- Notification delivery
      location_service.py -- Location sharing management
      supabase_service.py -- Supabase client wrapper
    models/
      user.py
      destination.py
      trip.py
      itinerary.py
      expense.py
      emergency.py
      safety.py
      notification.py
    middleware/
      auth.py           -- Authentication middleware
      rate_limit.py     -- Rate limiting
      error_handler.py  -- Global error handling
    utils/
      validators.py     -- Input/output validation
      ai_validators.py  -- AI output validation (itinerary structure, safety checks)
      formatters.py
    seed/
      destinations.py   -- Demo data seeding scripts
      emergency.py      -- Verified emergency numbers seed
  tests/
    unit/
    integration/
    e2e/
  requirements.txt
  .env.example
```

## 4.3 API Design Principles

Per TECH.md Sections 6-7:
- RESTful endpoints
- Authentication required on protected routes
- Authorization checks per role
- Input validation on all endpoints
- Structured JSON responses with consistent format
- Consistent error handling with user-safe messages
- No secrets, stack traces, or internal details in error responses
- Rate limiting on auth and AI endpoints
- Logging for errors, auth events, emergency workflows, admin actions

## 4.4 API Response Format

```json
{
  "success": true,
  "data": { ... },
  "error": null
}
```

Error response:
```json
{
  "success": false,
  "data": null,
  "error": {
    "code": "RESOURCE_NOT_FOUND",
    "message": "The requested destination could not be found."
  }
}
```

---

# 5. Database Architecture (Supabase)

## 5.1 Core Tables

```
users (managed by Supabase Auth)
  - id (UUID, PK)
  - email
  - created_at
  - role (traveller | admin | demo_operator)

profiles
  - id (UUID, PK, FK -> users.id)
  - name
  - preferred_language (en | hi)
  - travel_interests (JSONB)
  - travel_style
  - budget_range
  - preferred_activities (JSONB)
  - food_preferences (JSONB)
  - transportation_preferences (JSONB)
  - accommodation_preferences (JSONB)
  - accessibility_preferences (JSONB)
  - preferred_trip_pace
  - onboarding_completed (boolean)
  - created_at
  - updated_at

destinations
  - id (UUID, PK)
  - name
  - location
  - state
  - country
  - description
  - images (JSONB)
  - estimated_budget_min
  - estimated_budget_max
  - recommended_duration_days
  - best_time_to_visit
  - categories (JSONB)
  - tags (JSONB)
  - latitude
  - longitude
  - safety_info (JSONB)
  - accessibility_info (JSONB)
  - transportation_info (JSONB)
  - trust_level (OFFICIAL | VERIFIED | AI_GENERATED | ESTIMATED | DEMO)
  - is_active (boolean)
  - created_at
  - updated_at

attractions
  - id (UUID, PK)
  - destination_id (FK -> destinations.id)
  - name
  - description
  - type
  - estimated_cost
  - estimated_duration_minutes
  - latitude
  - longitude
  - images (JSONB)
  - opening_hours (JSONB)
  - accessibility_info
  - trust_level
  - is_active (boolean)

trips
  - id (UUID, PK)
  - user_id (FK -> users.id)
  - destination_id (FK -> destinations.id)
  - title
  - start_date
  - end_date
  - num_travellers
  - budget
  - currency (default INR)
  - preferences (JSONB)
  - notes
  - status (planning | active | completed | cancelled)
  - created_at
  - updated_at

itinerary_items
  - id (UUID, PK)
  - trip_id (FK -> trips.id)
  - day_number
  - start_time
  - end_time
  - activity_name
  - location_name
  - latitude
  - longitude
  - estimated_duration_minutes
  - estimated_cost
  - transportation_info
  - notes
  - sort_order
  - trust_level
  - created_at
  - updated_at

expenses
  - id (UUID, PK)
  - trip_id (FK -> trips.id)
  - user_id (FK -> users.id)
  - amount
  - currency
  - category (transportation | accommodation | food | activities | shopping | emergency | other)
  - description
  - date
  - payment_method
  - created_at

emergency_contacts
  - id (UUID, PK)
  - user_id (FK -> users.id)
  - name
  - relationship
  - phone_number
  - is_primary (boolean)
  - created_at
  - updated_at

emergency_services
  - id (UUID, PK)
  - country
  - service_name
  - phone_number
  - description
  - official_source
  - verification_date
  - applicable_region
  - trust_level (OFFICIAL | VERIFIED)
  - is_active (boolean)

emergency_events
  - id (UUID, PK)
  - user_id (FK -> users.id)
  - trip_id (FK -> trips.id, nullable)
  - emergency_type (medical | police | fire | accident | lost_traveller | other)
  - latitude
  - longitude
  - location_available (boolean)
  - status (initiated | info_collected | contact_notified | in_progress | resolved | cancelled)
  - is_demo (boolean, default true)
  - created_at
  - updated_at

safety_alerts
  - id (UUID, PK)
  - title
  - description
  - severity (info | warning | critical)
  - destination_id (FK -> destinations.id, nullable)
  - region
  - source
  - trust_level
  - is_active (boolean)
  - starts_at
  - expires_at
  - created_by (FK -> users.id)
  - created_at

location_sharing_sessions
  - id (UUID, PK)
  - user_id (FK -> users.id)
  - shared_with_contact_id (FK -> emergency_contacts.id)
  - latitude
  - longitude
  - is_active (boolean)
  - started_at
  - expires_at

saved_items
  - id (UUID, PK)
  - user_id (FK -> users.id)
  - item_type (destination | attraction | restaurant | activity)
  - item_id (UUID)
  - created_at

notifications
  - id (UUID, PK)
  - user_id (FK -> users.id)
  - type (itinerary | budget | weather | safety | trip | emergency | system)
  - title
  - message
  - is_read (boolean)
  - is_emergency (boolean)
  - created_at

ai_conversations
  - id (UUID, PK)
  - user_id (FK -> users.id)
  - trip_id (FK -> trips.id, nullable)
  - messages (JSONB)
  - created_at
  - updated_at
```

## 5.2 Row Level Security

Per TECH.md Section 9:
- Users can only read/write their own profiles, trips, expenses, emergency contacts, saved items, notifications, ai_conversations.
- Destinations, attractions, emergency_services, safety_alerts are readable by all authenticated users.
- Destinations, emergency_services, safety_alerts are writable only by admins.
- Emergency events are readable by the owning user and by admin/demo_operator roles.
- Location sharing sessions are readable by the owning user.

## 5.3 Data Trust Classification

Per TECH.md Section 24 and MASTER_SPEC.md Section 51:

Every piece of information that materially affects user trust must carry a trust_level:
- OFFICIAL -- from authoritative organizations
- VERIFIED -- validated by TourEase team against a source
- PARTNER -- from approved partners
- COMMUNITY -- contributed by users
- AI_GENERATED -- generated by AI model
- ESTIMATED -- calculated or approximate
- DEMO -- created for testing/demonstration

---

# 6. AI Architecture

## 6.1 Provider Abstraction

Per TECH.md Section 13 and AI.md Section 59:

```
ai_service.py
  class AIProvider (abstract):
    - generate_response(messages, tools, context) -> AIResponse
    - generate_structured(messages, schema, context) -> StructuredOutput

  class OpenAIProvider(AIProvider): ...
  class GeminiProvider(AIProvider): ...
  (additional providers can be added)
```

The active provider is configured via environment variable. Application code never calls a specific provider directly.

## 6.2 AI Context Layers

Per AI.md Section 36:

The AI receives layered context:
1. **User Context** -- profile, preferences, interests, accessibility
2. **Trip Context** -- current trip details, dates, budget, destination
3. **Itinerary Context** -- current itinerary items
4. **Location Context** -- current location (when permitted)
5. **Temporal Context** -- current date, time, season
6. **External Context** -- weather, alerts, transport status
7. **Safety Context** -- emergency status, alerts, nearby services

Context is injected into the system prompt. Sensitive information is minimized per AI.md Section 42.

## 6.3 AI Tool Calls

Per TECH.md Section 15 and AI.md Section 39:

Available tools the AI can invoke:
- search_destinations(query, filters)
- get_destination_details(destination_id)
- search_nearby_services(lat, lng, type)
- get_weather(destination_id or lat/lng)
- get_itinerary(trip_id)
- modify_itinerary(trip_id, changes) -- requires user confirmation
- create_trip(details) -- requires user confirmation
- add_expense(trip_id, expense) -- requires user confirmation
- get_safety_info(destination_id)
- get_emergency_services(country, region)

Sensitive actions require explicit user confirmation before execution.
Reference: AI.md Section 39.

## 6.4 AI Safety Guardrails

Per AI.md Sections 17-20, 41:

System prompt must enforce:
- Never invent emergency numbers
- Never fabricate authority responses or claims of dispatch
- Never fabricate GPS locations
- Never make medical diagnoses
- Never present estimates as verified facts
- Never override user privacy settings
- Always identify AI-generated content
- Emergency responses must be concise and action-oriented
- Must direct users to official emergency services
- Must distinguish OFFICIAL / VERIFIED / AI_GENERATED information

## 6.5 AI Output Validation

Per TECH.md Section 74:

Before storing AI-generated itineraries:
- Validate dates and times are valid
- Validate locations exist in destination data where possible
- Validate durations are reasonable (> 0, < 24 hours)
- Validate costs are non-negative
- Validate required fields are present
- Check internal consistency (no overlapping times)

---

# 7. External Service Integration

## 7.1 Integration Pattern

Per TECH.md Sections 16-17:

All external services are accessed through the backend, never directly from the frontend (except map tile rendering which may use client-side keys designed for public use).

Each external service has:
- A dedicated service module in the backend
- Abstraction so providers can be swapped
- Defined failure behavior
- Caching where appropriate
- Rate limit awareness

## 7.2 Maps

Provider-flexible. Potential options: Google Maps, Mapbox, OpenStreetMap/Leaflet.

Capabilities needed:
- Interactive map rendering
- Markers (destinations, itinerary, nearby services, emergency)
- Current location display
- Route visualization
- Navigation handoff
- Geocoding/reverse geocoding

Reference: TECH.md Section 18.

## 7.3 Weather

Provider-flexible. Potential options: OpenWeatherMap, WeatherAPI.

Capabilities needed:
- Current conditions by location
- Multi-day forecast
- Temperature, rain probability
- Severe weather warnings

If unavailable during development, use labeled demo data.
Reference: TECH.md Section 25.

## 7.4 Failure Strategy

Per TECH.md Section 71:

| Service      | Failure Behavior                                              |
|--------------|---------------------------------------------------------------|
| Weather      | Show cached/last-known data with age indicator                |
| Maps         | Preserve trip and destination info; show text-based fallback  |
| AI           | Existing itinerary and deterministic features still work      |
| Currency     | Use latest cached rate with warning                           |
| Notifications| Record failure, show in-app status                            |
| Location     | Emergency info and itinerary still accessible                 |

---

# 8. Authentication and Authorization

## 8.1 Authentication Flow

Per TECH.md Section 10:

1. User registers with email/password via Supabase Auth
2. Email verification (if configured)
3. User signs in, receives JWT session
4. Frontend stores session via Supabase client
5. Backend validates JWT on protected endpoints
6. Session refresh handled by Supabase client

## 8.2 Roles

Per TECH.md Sections 11-12:

| Role           | Access                                                      |
|----------------|-------------------------------------------------------------|
| Traveller      | Own profile, trips, itineraries, expenses, emergency contacts, AI, saved items, notifications |
| Admin          | Platform data management, user overview, destination CRUD, safety info, alert management |
| Demo Operator  | Trigger simulated emergency events, view demo dashboard     |

Admin and Demo Operator routes return 403 for unauthorized roles.

---

# 9. Security Architecture

Per TECH.md Sections 36, 72-76:

- Secrets stored in environment variables, never in source control
- Supabase RLS on all user-owned tables
- JWT validation on all protected backend endpoints
- Input validation on all API endpoints
- AI output validation before storage
- Rate limiting on authentication and AI endpoints
- No sensitive data in client-visible error responses
- Protection against SQL injection (parameterized queries via Supabase client)
- Protection against XSS (framework default escaping)
- Protection against prompt injection (AI input sanitization, untrusted content not treated as system instructions)
- Emergency features receive higher security priority
- API keys for external services remain server-side only

---

# 10. Data Flow Diagrams

## 10.1 Trip Planning Flow

```
User -> Frontend: Enter trip details
Frontend -> Backend: POST /api/trips
Backend -> Supabase: Insert trip
Backend -> Frontend: Trip created

User -> Frontend: Request itinerary generation
Frontend -> Backend: POST /api/itineraries/generate
Backend -> AI Service: Generate itinerary (with user context, destination data, preferences)
AI Service -> AI Provider: LLM call with tools
AI Provider -> AI Service: Structured itinerary
AI Service -> Backend: Validated itinerary
Backend -> Supabase: Insert itinerary items
Backend -> Frontend: Itinerary data
Frontend -> User: Display itinerary
```

## 10.2 Emergency (SOS) Flow

```
User -> Frontend: Initiate SOS (press-and-hold)
Frontend -> User: Confirm emergency type
User -> Frontend: Select type
Frontend -> Browser: Request location (if permitted)
Browser -> Frontend: Location (or denied)
Frontend -> Backend: POST /api/emergency/sos
Backend -> Supabase: Create emergency event (is_demo=true)
Backend -> Notification Service: Notify emergency contacts (if supported)
Backend -> Frontend: Emergency event created, nearby services, emergency numbers
Frontend -> User: Display emergency mode UI
  - Emergency numbers with "Call now"
  - Emergency contacts
  - Location status
  - Nearby hospitals/police
  - Clear DEMO label if simulation
```

## 10.3 AI Conversation Flow

```
User -> Frontend: Send message
Frontend -> Backend: POST /api/ai/chat
Backend -> AI Service: Build context (user, trip, itinerary, location, weather)
AI Service -> AI Provider: Generate response (with tool definitions)
AI Provider -> AI Service: Response (may include tool calls)
AI Service -> Backend: Execute tool calls (search, weather, itinerary read)
Backend -> AI Service: Tool results
AI Service -> AI Provider: Continue with tool results
AI Provider -> AI Service: Final response
AI Service -> Backend: Validated response
Backend -> Frontend: AI response (text + structured cards + proposed actions)
Frontend -> User: Display response
  - If action proposed: show confirmation UI
  - User confirms -> Frontend -> Backend: Execute action
```

---

# 11. Deployment Architecture

Per TECH.md Sections 65-66:

```
+---------------------+     +---------------------+     +---------------------+
|   Frontend Host     |     |   Backend Host      |     |   Supabase          |
|   (Vercel/Netlify/  |     |   (Railway/Render/  |     |   (Managed)         |
|    similar)         |     |    similar)         |     |                     |
|   - Static/SSR      |     |   - Python API      |     |   - PostgreSQL      |
|   - CDN             |     |   - HTTPS           |     |   - Auth            |
|   - HTTPS           |     |   - Env vars        |     |   - Storage         |
+---------------------+     +---------------------+     |   - Realtime        |
                                                         +---------------------+
```

- Frontend: deployed to a static/SSR hosting platform
- Backend: deployed to a Python-compatible hosting platform
- Supabase: managed cloud instance
- All communication over HTTPS
- Environment variables for all secrets and API keys
- Logging enabled on backend

---

# 12. Testing Architecture

Per TECH.md Sections 48-50:

```
tests/
  unit/           -- Business logic, calculations, validation, utilities
  integration/    -- Supabase queries, AI service calls, external APIs
  e2e/            -- Critical user journeys (auth, trip creation, SOS)
  security/       -- Auth, authorization, data access, API security
  emergency/      -- Emergency-specific tests (correct numbers, no false claims)
```

Critical journeys that must have tests (per TECH.md Section 49):
- Sign up -> onboarding -> recommendation -> trip -> itinerary -> expense -> map -> weather
- Emergency contact add -> Safety Center -> SOS -> emergency number display -> location sharing
- Lost traveller workflow
- Cyber fraud assistance
- Admin sign in -> dashboard -> manage data -> trigger simulation

---

# 13. Internationalization Architecture

Per MVP.md Section 42, DESIGN.md Sections 87-88:

- Frontend i18n library for UI strings (English + Hindi)
- AI responds in user's selected language
- Currency formatting: INR default, extensible
- Date/time formatting: locale-aware
- Emergency instructions: clarity over literal translation
- UI must accommodate longer translated text without breaking layout

---

# 14. Architecture Constraints

Per TECH.md Section 59:

The MVP must avoid premature complexity. The following require explicit justification before introduction:
- Multiple databases
- Microservices
- Kubernetes
- Complex event buses
- Excessive abstraction layers
- Large distributed infrastructure
- Unnecessary cloud services

The goal is a strong, maintainable product -- not an unnecessarily complicated architecture.

---

# 15. Architecture Decision Record

| Decision                     | Choice                           | Rationale                                                |
|------------------------------|----------------------------------|----------------------------------------------------------|
| Database                     | Supabase (PostgreSQL)            | Specified in TECH.md. Provides Auth, RLS, Realtime.      |
| Backend language             | Python                           | Specified in TECH.md.                                    |
| Frontend language            | TypeScript                       | Specified in TECH.md Section 5.                          |
| AI integration pattern       | Backend-only, provider-abstracted| Security (keys server-side), flexibility per TECH.md 13. |
| Map integration pattern      | Provider-abstracted              | Swappable per TECH.md 17.                                |
| External API access          | Backend proxy                    | No sensitive keys on client per TECH.md 72.              |
| Auth                         | Supabase Auth (JWT)              | Specified in TECH.md.                                    |
| Data security                | RLS + backend authorization      | Specified in TECH.md 9.                                  |
| Emergency data               | Verified, stored, never AI-gen   | MASTER_SPEC.md 22, AI.md 20.                             |
| Architecture style           | Monolith (backend)               | Avoid premature complexity per TECH.md 59.               |
| Demo/simulation              | Always labeled DEMO/SIMULATION   | MASTER_SPEC.md 48, MVP.md 39.                            |

---

**End of Architecture Document**

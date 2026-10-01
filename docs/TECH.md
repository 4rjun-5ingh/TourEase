# TourEase – Technical Specification

## 1. Purpose

This document defines the technical direction, technology preferences, engineering expectations, constraints, and integration requirements for TourEase.

It describes **what technology and engineering capabilities the project should use or support**.

It does **not** prescribe the final system architecture.

The detailed architecture, folder structure, service boundaries, API structure, database schema, data flow, deployment topology, and implementation strategy should be designed by Opus based on this specification and the other project specification files.

---

# 2. Core Technology Decisions

The following technology decisions are fixed requirements for the project.

## Database

**Supabase**

Supabase should be used as the primary backend data platform/database.

The project should take advantage of appropriate Supabase capabilities where useful, including:

- PostgreSQL database
- Authentication
- Storage
- Realtime capabilities
- Row Level Security
- Database functions/features where appropriate

The final usage of individual Supabase capabilities should be determined during architecture planning.

---

# 3. Backend

The backend must be built using:

**Python**

Python should be the primary backend programming language.

The final Python web framework and backend architecture should be selected during technical planning.

The backend should support:

- Authentication-aware operations
- Secure APIs
- AI integration
- External API integrations
- Business logic
- Trip management
- Itinerary management
- Expense management
- Safety functionality
- Emergency workflows
- Notifications
- Location-related functionality
- Administrative functionality
- Data validation
- Background processing where required

---

# 4. Frontend

The frontend should provide a modern, responsive, application-like experience.

The exact frontend framework should be finalized during technical planning.

The frontend should support:

- Desktop
- Tablet
- Mobile
- Responsive layouts
- Touch interaction
- Keyboard navigation
- Accessibility
- Fast loading
- Offline/low-connectivity behavior where practical
- Installable/PWA-style capabilities where technically appropriate

The frontend technology should be selected based on:

- Performance
- Developer productivity
- Maintainability
- Ecosystem maturity
- Mobile responsiveness
- AI integration requirements
- Mapping requirements
- Accessibility
- Deployment simplicity

---

# 5. TypeScript Preference

If a JavaScript/TypeScript frontend framework is selected, **TypeScript should be preferred over plain JavaScript**.

The project should use strong typing wherever practical.

Types should exist for important application concepts such as:

- User
- Profile
- Trip
- Destination
- Itinerary
- Expense
- Emergency contact
- Safety alert
- Location
- Notification
- Booking/reference information
- AI response
- AI action
- External service response

---

# 6. API Design

The backend should expose clean, well-defined APIs for frontend and external integrations.

APIs should provide:

- Authentication
- Authorization
- Input validation
- Structured responses
- Consistent error handling
- Appropriate status codes
- Rate limiting where appropriate
- Logging
- Security controls

The exact API style and endpoint structure should be determined during architecture planning.

---

# 7. API Contract Quality

API contracts should be predictable and documented.

Responses should avoid inconsistent structures.

Errors should provide useful information to the application without exposing:

- Secrets
- Internal stack traces
- Database credentials
- Sensitive infrastructure information
- Private user data

---

# 8. Database Requirements

The database design should support the complete TourEase product.

Important data areas include:

- Users
- Profiles
- Preferences
- Trips
- Destinations
- Places
- Itineraries
- Itinerary items
- Expenses
- Budgets
- Emergency contacts
- Emergency profiles
- Location-sharing sessions
- Safety alerts
- Notifications
- Saved places
- Community content
- Accessibility information
- AI conversations/context where appropriate
- Documents/metadata
- Administrative records
- Audit records

The final schema should be designed by Opus.

---

# 9. Supabase Security

Supabase security should be treated as a core requirement.

Sensitive user data must not be accessible simply because a client knows an identifier.

The project should use appropriate authorization and database security controls, including Row Level Security where applicable.

Users should only be able to access resources they are authorized to access.

---

# 10. Authentication

TourEase should support secure user authentication.

The MVP should support a practical authentication experience appropriate for a student project while remaining production-oriented.

Potential capabilities include:

- Email/password authentication
- Email verification
- Secure sessions
- Password reset
- Logout
- Profile management

Additional authentication methods may be added later.

The exact authentication implementation should be determined using Supabase capabilities and the final architecture.

---

# 11. Authorization

Authentication and authorization must be treated separately.

The system should support appropriate roles such as:

- Traveller/User
- Admin
- Safety/Admin operator
- Demonstration authority/operator

Exact roles and permissions should be finalized during architecture planning.

Administrative functionality must not be accessible to ordinary users.

---

# 12. Role-Based Access

Different users should see different capabilities.

Examples:

### Traveller

- Manage personal profile
- Create trips
- Manage itinerary
- Manage expenses
- Use AI
- Manage emergency contacts
- Control location sharing

### Admin

- Manage platform data
- Monitor system activity
- Manage selected content
- Review reports
- Manage alerts where authorized

### Demo Operator

- Trigger simulated emergency events
- Demonstrate emergency workflows
- View simulated responses

The demo role must never automatically receive access to real government systems.

---

# 13. AI Integration

The system should support integration with modern AI models.

The AI provider should be abstracted enough that the project is not unnecessarily locked to one provider.

The AI system should support:

- Conversational assistance
- Structured AI outputs
- Tool/function usage where appropriate
- Context-aware responses
- Personalization
- Itinerary generation
- Recommendation generation
- Safety assistance
- Multilingual interaction

The exact AI provider, models, orchestration, and implementation should be selected during architecture planning.

---

# 14. Structured AI Output

Where AI results are consumed by application functionality, structured outputs should be preferred over uncontrolled free-form text.

For example, itinerary generation should be capable of producing structured information representing:

- Day
- Time
- Location
- Activity
- Duration
- Estimated cost
- Transportation
- Notes
- Warnings

The application should validate AI-generated structured data before using it.

---

# 15. AI Tool Integration

The AI may need access to application capabilities such as:

- Search destinations
- Search places
- Retrieve weather
- Calculate expenses
- Retrieve itinerary
- Modify itinerary
- Search nearby services
- Retrieve safety information

AI tools should have clear permissions.

The AI should not be allowed to execute sensitive actions simply because it generated a request.

---

# 16. External API Strategy

TourEase should support external services through clear integration boundaries.

Potential external services include:

- Maps
- Geocoding
- Routing
- Weather
- Places
- Transportation
- Currency
- Tourism information
- Emergency information
- Disaster alerts
- Notifications

The exact providers should be selected based on:

- Availability
- API quality
- Pricing
- Rate limits
- Geographic coverage
- Licensing
- Reliability
- Student/demo accessibility

---

# 17. Provider Abstraction

Important external services should not unnecessarily lock the entire application to one provider.

Where practical, the project should allow replacement of providers for:

- Maps
- Weather
- AI
- Geocoding
- Routing
- Currency
- Notifications

The level of abstraction should be appropriate to the project's size and should not introduce unnecessary complexity.

---

# 18. Maps

TourEase requires mapping functionality.

The mapping system should support, where available:

- Interactive maps
- Current location
- Destination markers
- Route visualization
- Nearby places
- Emergency services
- Itinerary locations
- Distance information
- Navigation handoff
- Location sharing
- Geographical safety information

The final map provider should be selected during implementation planning.

---

# 19. Location Services

Location functionality should support:

- Current location
- Location permission
- Location-based recommendations
- Nearby services
- Emergency location
- Temporary live location sharing
- Route context

Location should not be continuously collected without a legitimate product need and user permission.

---

# 20. Location Privacy

Location is sensitive information.

The system should support:

- Explicit permission
- Clear location-sharing status
- Start/stop controls
- Temporary sharing sessions
- Appropriate expiration
- Secure transmission
- Access control
- Minimal retention

Users should understand when their location is being shared.

---

# 21. Emergency Location

Emergency functionality should be designed so that location can be made available during an emergency workflow when the user initiates or authorizes the relevant action.

The system must clearly distinguish:

- Current location
- Last known location
- Shared live location
- Location sent to an external service
- Location visible only inside TourEase

The UI should never falsely imply that an authority received a location unless that transmission actually occurred.

---

# 22. Emergency Services

The application should support structured emergency-service information.

Important information should include:

- Country
- Service
- Emergency number
- Service description
- Official source
- Verification date
- Applicable region

For the India-first MVP, the system should support relevant official emergency and travel assistance information, including:

- 112
- Tourist helpline: 1363 / 1800-11-1363
- Cybercrime helpline: 1930

Critical numbers should be verified and maintained rather than hardcoded casually throughout the application.

---

# 23. Official Data

Where possible, important safety information should come from authoritative sources.

Examples:

- Government departments
- Emergency services
- Disaster management authorities
- Tourism authorities
- Official transport providers
- Official weather sources

The system should record source information for important data.

---

# 24. Data Trust Classification

TourEase should support a trust classification for information.

Suggested categories:

- `OFFICIAL`
- `VERIFIED`
- `PARTNER`
- `COMMUNITY`
- `AI_GENERATED`
- `ESTIMATED`
- `DEMO`

The classification should be visible where it materially affects user trust.

---

# 25. Weather Integration

Weather functionality should support:

- Current conditions
- Forecasts
- Temperature
- Rain probability where available
- Severe-weather information where available
- Location-based forecasts

The AI should be able to use weather information to modify recommendations and itineraries.

---

# 26. Currency

The expense system should support multiple currencies.

The technical implementation should support:

- Currency codes
- Exchange rates
- Conversion
- Base trip currency
- Expense currency
- Conversion timestamp/source

Currency calculations should be deterministic.

The system should clearly identify when an exchange rate is estimated or stale.

---

# 27. Notifications

The platform should support notifications for:

- Itinerary reminders
- Travel updates
- Weather alerts
- Safety alerts
- Budget warnings
- Location-sharing status
- Emergency contact events
- System messages

Notification channels may include:

- In-app
- Push
- Email
- SMS where available and appropriate

The MVP should prioritize practical channels that can be implemented reliably.

---

# 28. Emergency Notifications

Emergency notifications require additional safeguards.

The system should distinguish between:

- User-generated emergency event
- Emergency contact notification
- Official alert
- Community alert
- Demo/simulated alert

No simulated emergency notification should appear indistinguishable from a real authority notification.

---

# 29. Offline and Low-Connectivity Support

TourEase should remain useful during poor connectivity.

The system should support appropriate local/cached access to critical information such as:

- Saved itinerary
- Emergency numbers
- Emergency contacts
- Emergency profile
- Saved destinations
- Important trip information
- Previously available safety information

The system should clearly indicate when cached information may be outdated.

---

# 30. PWA / Installability

The project should consider Progressive Web App capabilities.

Desired capabilities include:

- Installability
- Responsive mobile experience
- App-like navigation
- Offline caching
- Fast startup
- Push notifications where supported

The final implementation should be selected based on the chosen frontend technology and project constraints.

---

# 31. Performance

TourEase should feel responsive even when it contains complex functionality.

Important performance targets include:

- Fast initial loading
- Efficient API requests
- Lazy loading where useful
- Optimized images
- Efficient map loading
- Efficient AI interactions
- Minimal unnecessary database queries
- Appropriate caching

The final numerical performance targets should be established during implementation.

---

# 32. Reliability

Important functionality should fail gracefully.

If one service fails, the entire application should not unnecessarily become unusable.

Examples:

If weather is unavailable:

- Trip planning should still work.

If AI is unavailable:

- Existing itinerary and deterministic functionality should still work.

If maps fail:

- Saved trip information should still be accessible.

If live location is unavailable:

- The user should still be able to access emergency information.

---

# 33. Error Handling

The application should provide useful error states.

Errors should be:

- Understandable
- Actionable
- Non-technical for normal users
- Safe
- Consistent

Example:

Instead of:

> `HTTP 500 / NullPointerException`

show:

> “We couldn't load nearby emergency services right now. Please try again or use the emergency numbers below.”

---

# 34. Loading States

Every significant asynchronous feature should have an appropriate loading state.

Examples:

- AI response loading
- Destination search
- Map loading
- Weather loading
- Itinerary generation
- Expense processing
- Nearby services
- Emergency information

The interface should avoid unnecessary blank screens.

---

# 35. Empty States

Empty states should explain what the user can do next.

Examples:

> “You haven't created a trip yet. Start planning your first journey.”

> “No saved destinations yet.”

> “No expenses recorded for this trip.”

---

# 36. Security

Security must be treated as a first-class requirement.

The application should protect against:

- Unauthorized access
- Injection attacks
- Broken authorization
- Data leakage
- Session misuse
- Credential exposure
- Malicious file uploads
- Prompt injection
- AI data leakage
- Insecure API access
- Excessive API usage

Secrets must never be committed to source control.

---

# 37. Environment Configuration

Environment-specific configuration should be separated from application code.

Examples:

- AI API keys
- Map API keys
- Weather API keys
- Supabase credentials
- Notification credentials
- External integration credentials

Secrets should be stored using appropriate environment/secret-management mechanisms.

---

# 38. Logging

The backend should maintain useful logs for:

- Errors
- Important application events
- Integration failures
- Authentication events
- Administrative actions
- Emergency workflow events
- AI tool/action failures

Logs must avoid unnecessary sensitive information.

Exact logging architecture should be determined during planning.

---

# 39. Auditability

Important security and emergency-related events should be auditable.

Potential events include:

- Login
- Permission changes
- Location-sharing started/stopped
- Emergency workflow initiated
- Emergency contact notification
- Administrative action
- Safety alert creation
- AI action requiring confirmation
- Demo emergency event

---

# 40. File and Document Storage

TourEase may need secure storage for user-related documents or document metadata.

Potential examples:

- Passport metadata
- Travel documents
- Tickets
- Booking references
- Receipts
- Emergency documents

The system should minimize storage of highly sensitive documents when metadata or user-provided references are sufficient.

---

# 41. Image and Media Handling

The application may support:

- Destination images
- Profile images
- Receipts
- Community images
- Document images

Uploads should be:

- Validated
- Size-limited
- Type-checked
- Access-controlled
- Securely stored

---

# 42. Search

TourEase should provide useful search capabilities across relevant tourism data.

Potential search targets:

- Destinations
- Attractions
- Restaurants
- Hotels
- Activities
- Emergency facilities
- Transport
- Saved places

Search should support natural user behavior where practical.

---

# 43. Geospatial Search

The system should support location-based queries such as:

- Nearby hospitals
- Nearby police stations
- Nearby attractions
- Nearby restaurants
- Nearby transport
- Nearby accommodation

Results should account for geographic distance and, where available, current status.

---

# 44. Background Processing

Some operations may require background processing.

Examples:

- AI itinerary generation
- Notification processing
- Data synchronization
- Alert processing
- Scheduled reminders
- External API synchronization

The final mechanism should be selected during architecture planning.

---

# 45. Scheduled Tasks

The system may need scheduled operations for:

- Travel reminders
- Weather checks
- Alert checks
- Expiring location shares
- Temporary safety sessions
- Data verification
- Notification scheduling

The implementation should avoid unnecessary continuous background activity.

---

# 46. Rate Limiting

Rate limits should be considered for:

- Authentication endpoints
- AI requests
- Search
- External API calls
- Location-related APIs
- Public endpoints
- Emergency-related abuse prevention

Emergency functionality should remain accessible while still being protected against malicious automated abuse.

---

# 47. Caching

Caching should be considered for data that is:

- Frequently requested
- Expensive to retrieve
- Relatively stable
- Safe to cache

Examples:

- Destination metadata
- Static tourism information
- Maps-related information where permitted
- Frequently requested public information

Safety-critical information should not be treated as permanently current merely because it is cached.

---

# 48. Testing

The project should include multiple testing levels.

### Unit Testing

For:

- Business logic
- Calculations
- Validation
- Utility functions

### Integration Testing

For:

- Supabase
- AI services
- External APIs
- Maps
- Weather
- Notifications

### End-to-End Testing

For important user journeys.

### Security Testing

For:

- Authentication
- Authorization
- Data access
- API security
- AI tool access

---

# 49. Critical Journey Testing

The following journeys should receive dedicated tests:

### Traveller

- Sign up
- Complete onboarding
- Get personalized recommendation
- Create trip
- Generate itinerary
- Modify itinerary
- Add expense
- View map
- Check weather

### Safety

- Add emergency contact
- Open Safety Center
- Start emergency workflow
- View emergency number
- Share location
- Stop location sharing

### Lost Traveller

- Enter lost mode
- Identify location
- Find safe assistance
- Contact emergency support

### Cyber Fraud

- Open cyber fraud assistance
- Receive immediate protective guidance
- Access official reporting information

### Admin

- Sign in
- View relevant dashboard
- Manage demo data
- Trigger simulation

---

# 50. Emergency Testing

Emergency functionality should be tested separately from normal functionality.

Tests should verify:

- Correct emergency numbers
- Correct service descriptions
- Correct source labels
- Correct location permissions
- Correct emergency contact behavior
- Correct failure states
- No false authority confirmation
- No accidental real emergency requests
- Demo events are clearly marked

---

# 51. Demo Environment

The project should support safe demonstration.

Demo mode should make it possible to demonstrate:

- SOS
- Emergency contact notification
- Live location sharing
- Authority dashboard
- Safety alerts
- AI emergency assistance
- Lost traveller flow

without contacting real emergency authorities.

---

# 52. Seed and Demo Data

The project should include realistic demo data.

The initial India-focused dataset may include destinations such as:

- Delhi
- Agra
- Jaipur
- Udaipur
- Varanasi
- Rishikesh
- Goa
- Mumbai
- Bengaluru
- Hyderabad
- Manali
- Amritsar

Demo data should clearly be distinguishable from live/verified external data where applicable.

---

# 53. India-First Technical Scope

The initial product should be optimized for India.

This includes:

- Indian emergency information
- Indian currency
- Indian travel scenarios
- Indian destinations
- English/Hindi
- India-relevant tourism information
- India-relevant safety information

The underlying product should remain extensible to additional countries.

---

# 54. Internationalization

The application should be designed so that future languages and regions can be added without major rewrites.

Internationalization should consider:

- Language
- Currency
- Date formats
- Time formats
- Number formats
- Country-specific emergency numbers
- Regional safety information
- Location formats

---

# 55. Accessibility

Technical implementation should support accessible interfaces.

Requirements include:

- Semantic HTML where applicable
- Keyboard navigation
- Screen-reader compatibility
- Accessible labels
- Sufficient contrast
- Focus states
- Reduced-motion support
- Large touch targets
- Accessible forms
- Meaningful error messages

---

# 56. Responsive Design

The application should work naturally across:

- Mobile phones
- Tablets
- Laptops
- Desktop monitors

The mobile experience is particularly important because TourEase is intended to accompany travellers during real trips.

---

# 57. Mobile Considerations

The mobile experience should prioritize:

- Quick access to Safety Center
- Quick access to SOS
- Maps
- Current location
- Itinerary
- Emergency contacts
- AI assistant
- Weather
- Notifications

Important actions should not require navigating through many screens.

---

# 58. Architecture Freedom

This document intentionally does not prescribe:

- Microservices
- Monolith
- Serverless
- Specific folder structure
- Specific API framework
- Specific deployment provider
- Kubernetes
- Docker requirements
- Event-driven architecture
- Message brokers
- Multiple databases
- Specific caching technology

Opus should choose an architecture appropriate for:

- MVP scope
- Project complexity
- Team size
- Maintainability
- Performance
- Security
- Deployment requirements
- Future scalability

---

# 59. Avoid Premature Complexity

The MVP should not introduce infrastructure merely because it is technically fashionable.

Examples of complexity that should require justification:

- Multiple databases
- Microservices
- Kubernetes
- Complex event buses
- Excessive abstraction
- Large distributed infrastructure
- Unnecessary cloud services

The goal is a strong, maintainable product rather than an unnecessarily complicated architecture.

---

# 60. Maintainability

Code should be:

- Readable
- Modular
- Consistent
- Documented where necessary
- Testable
- Easy to debug
- Easy to extend

The project should favor understandable engineering decisions.

---

# 61. Code Quality

The project should use appropriate:

- Formatting
- Linting
- Type checking
- Validation
- Testing
- Dependency management

The exact tools should be selected during implementation planning.

---

# 62. Git and Version Control

The project should use Git-based version control.

The repository should avoid committing:

- Secrets
- API keys
- Passwords
- Private credentials
- Temporary generated files
- Large unnecessary binaries

The project should maintain a clean and understandable commit history where practical.

---

# 63. Documentation

The technical implementation should include useful documentation for:

- Setup
- Environment variables
- Running locally
- Database configuration
- Supabase setup
- AI configuration
- External APIs
- Testing
- Demo mode
- Deployment

Documentation should be sufficient for another developer to run the project.

---

# 64. Local Development

The project should be straightforward to run locally.

A new developer should be able to understand:

1. Required software
2. Required environment variables
3. How to install dependencies
4. How to configure Supabase
5. How to start the frontend
6. How to start the Python backend
7. How to run tests
8. How to use demo mode

---

# 65. Deployment

The final deployment strategy should support a practical demonstration and future production evolution.

Deployment should consider:

- Frontend hosting
- Python backend hosting
- Supabase
- Environment variables
- HTTPS
- Domain configuration
- Logging
- Monitoring
- External API credentials

The exact providers and deployment architecture should be chosen during planning.

---

# 66. Monitoring

The production-oriented version should support monitoring of:

- Application errors
- API failures
- AI failures
- External API failures
- Performance
- Database issues
- Notification failures
- Emergency workflow failures

---

# 67. Observability

Important workflows should be observable enough to diagnose problems.

Especially:

- AI itinerary generation
- AI tool calls
- Emergency workflows
- Location sharing
- External integrations
- Notification delivery
- Authentication

Observability must not become an excuse to collect unnecessary personal information.

---

# 68. Data Retention

The system should not retain personal data indefinitely without a reason.

Retention should consider:

- User value
- Security
- Legal requirements
- Operational requirements
- Privacy

Temporary data such as location-sharing sessions should have appropriate expiration.

---

# 69. Data Deletion

Users should have reasonable mechanisms to manage and delete their data.

This should eventually include:

- Saved places
- Trips
- Expenses
- Preferences
- AI history where applicable
- Location-sharing data
- Uploaded files
- Account data

Exact deletion behavior should be defined during implementation.

---

# 70. Third-Party Dependencies

Third-party packages and APIs should be selected carefully.

The project should consider:

- License
- Maintenance
- Security
- Community adoption
- Compatibility
- Performance
- API stability

Dependencies should not be added merely for minor convenience.

---

# 71. Integration Failure Strategy

Every external dependency should have a defined failure behavior.

Examples:

### Weather unavailable

Show cached/last-known data if appropriate and indicate its age.

### Maps unavailable

Preserve trip and destination information.

### AI unavailable

Provide non-AI functionality.

### Currency unavailable

Use the latest cached rate with an appropriate warning.

### Notification provider unavailable

Record the failure and provide an in-app status where possible.

---

# 72. API Keys and Security Credentials

No API key should be exposed unnecessarily to clients.

Public client-side keys may be used only when the provider explicitly designs them for client-side use and appropriate restrictions are applied.

Sensitive credentials must remain server-side.

---

# 73. Data Validation

All externally supplied data should be treated as untrusted.

This includes:

- User input
- AI output
- Community content
- External API responses
- Uploaded files
- Imported data

Validation should happen before important information is stored or used.

---

# 74. AI Output Validation

AI-generated structured data should be validated before entering application workflows.

For example, an AI-generated itinerary should be checked for:

- Valid dates
- Valid times
- Valid locations
- Reasonable durations
- Valid expense values
- Required fields
- Internal consistency

The application should not blindly trust model output.

---

# 75. Security of Emergency Features

Emergency features should receive higher security priority than ordinary features.

Protection should cover:

- Emergency contact information
- Location
- Emergency profile
- Emergency history
- Emergency notifications
- Administrative emergency dashboards

Unauthorized access to these capabilities could create serious harm and therefore must be treated as a critical security concern.

---

# 76. Privacy by Design

Privacy should be considered during feature development rather than added later.

The project should minimize:

- Data collection
- Data retention
- Data exposure
- Unnecessary permissions
- Unnecessary third-party sharing

Sensitive features should have clear user controls.

---

# 77. Scalability

TourEase should be capable of evolving beyond the MVP.

Future growth may include:

- More countries
- More users
- More destinations
- More languages
- More AI capabilities
- More integrations
- More safety services
- More community content

The architecture should allow this growth without requiring an immediate enterprise-scale infrastructure.

---

# 78. MVP Technical Priority

For the MVP, technical effort should prioritize:

1. Reliability
2. Security
3. User experience
4. Core AI functionality
5. Supabase integration
6. Python backend
7. Maps/location
8. Safety functionality
9. Expense management
10. Weather
11. Notifications
12. Demo/admin functionality

Advanced infrastructure should not delay the usable MVP.

---

# 79. Technical Definition of Done

A technical MVP should be considered ready when:

- Frontend and Python backend work together reliably.
- Supabase is correctly integrated.
- Authentication works.
- User data is properly isolated.
- Core trip functionality works.
- AI travel assistance works.
- AI itinerary generation works.
- Maps/location functionality works at the intended MVP level.
- Expense tracking works.
- Weather integration works where configured.
- Safety Center works.
- Emergency information is verified.
- Emergency workflows are safe and clearly labeled.
- Demo emergency functionality does not contact real authorities.
- English/Hindi support works at the intended MVP level.
- Important failure states are handled.
- Critical flows are tested.
- Secrets are not committed.
- The project can be run by another developer using documented setup instructions.

---

# 80. Final Technical Direction

TourEase should be built as a modern, secure, maintainable, AI-enabled tourism platform.

The fixed technical foundation is:

- **Database:** Supabase
- **Backend:** Python
- **AI:** Provider-flexible
- **Maps:** Provider-flexible
- **External services:** Integration-based and replaceable where practical
- **Frontend:** Modern responsive web application, with the exact framework finalized during planning
- **Security:** First-class requirement
- **Accessibility:** First-class requirement
- **Offline/low-connectivity:** Important product capability
- **Emergency functionality:** High-reliability and high-safety priority

The technical implementation should favor simplicity where possible and sophistication only where it provides meaningful product value.

Opus should use this document together with:

- `Master Spec.md`
- `MVP.md`
- `AI.md`
- `Design.md`

to produce the complete implementation plan and architecture.

The final architecture should answer:

- How the system is structured
- How frontend and backend communicate
- How Supabase is organized
- How authentication and authorization work
- How AI interacts with the application
- How external APIs are integrated
- How maps and location are handled
- How emergency workflows operate
- How data flows through the system
- How the application is deployed
- How testing is organized
- How the project can evolve beyond the MVP

Those decisions belong to the architecture/implementation planning phase rather than this specification.
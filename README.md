# SAP Clean Core Risk Assessment Extension

A side-by-side extension built on SAP BTP using the Cloud Application Programming Model (CAP) to extend S/4HANA business logic while maintaining a clean core.

## 🔹 Clean Core Compliance

This project is designed in full alignment with SAP Clean Core principles. The extension is implemented as a **side-by-side application on SAP BTP** and does not introduce any modification to the S/4HANA core.

**Key principles applied:**
- **Zero Core Modification:** No custom code, exits, or enhancements in S/4HANA.
- **Decoupled Data:** No direct database access to S/4HANA; all data exchange is via OData APIs.
- **Standardized Integration:** Only SAP-released APIs (e.g., API_SALES_ORDER_SRV) are used.
- **BTP Centric:** All integration is performed via SAP BTP services and the CAP model.
- **Upgrade-Safe:** Independent lifecycle allows S/4HANA upgrades without affecting this extension.

---

## Architecture & Integration Strategy

The solution follows a side-by-side extensibility pattern:

- SAP S/4HANA remains the system of record
- Custom business logic is implemented on SAP BTP
- Communication with S/4HANA is handled via released APIs and events

Integration decisions:

- **Synchronous communication** is used for read-only access to Sales Order data
- **SAP Destination Service** is used to decouple endpoints and credentials
- No hardcoded URLs or credentials exist in the application code

This architecture ensures loose coupling between systems and allows independent scaling, deployment, and evolution of the extension.

## Authorization Model

Authorization is enforced using XSUAA and CAP security features.

- XSUAA defines scopes and role templates
- CAP service entities are protected using @requires annotations
- Runtime role checks are applied for business-critical operations

This layered approach ensures that both service access and business logic are properly secured.


## S/4HANA Integration Without Live System

At development time, a live S/4HANA system is not required.

The integration is designed using a **contract-first approach** based on SAP-released APIs (e.g. API_SALES_ORDER_SRV).

For local development and testing:

- SAP Destination Service is still used
- A local mock service simulates S/4HANA API responses
- No code changes are required when switching to a real S/4HANA system

This approach mirrors standard SAP project practices, where development often starts before all backend systems are available.



## 🏗️ S/4HANA Integration (Local Simulation)

At development time, no live S/4HANA system is required. This mirrors standard SAP project development phases where the extension is built in parallel with S/4HANA availability.

- **API-First:** Integration is designed against official SAP-released APIs.
- **Connectivity:** Uses SAP Destination Service logic via environment variables (`.env`).
- **Mocking:** A local Node.js mock server (`mock/s4-api.js`) simulates real S/4HANA responses.
- **Enterprise Resilience:** Includes advanced error classification (distinguishing between 404 Business Errors and 502 Technical Failures).
- **Portability:** No code changes are required when switching from the local mock to a production S/4HANA system.

---
## Production Readiness Considerations

The application is designed with production scenarios in mind:

- Centralized error handling for external system calls
- Retry logic applied only to technical failures
- Business errors are not retried
- Technical error details are not exposed to consumers
- OAuth-based authentication via XSUAA
- Environment-specific configuration handled via BTP services

These patterns reflect real-world SAP project requirements and operational standards.


## 🚀 Getting Started

### 1. Prerequisites
- Node.js (LTS version)
- SAP CAP SDK (`npm install -g @sap/cds-dk`)
- SQLite

### 2. Installation
```bash
git clone <your-repo-url>
cd sap-clean-core-extension
npm install
```
### 3. Running the Project
To see the full integration in action, open two terminals:

Terminal 1 (Mock S/4HANA System):

Bash

node mock/s4-api.js
Terminal 2 (CAP Extension):

Bash

cds watch
4. Testing the Service
Open your browser to:

Service Index: http://localhost:4004

S/4 Sales Orders (via Mock): http://localhost:4004/risk/S4SalesOrders

Risk Assessments: http://localhost:4004/risk/RiskAssessments

🛠️ Technical Stack
Framework: SAP Cloud Application Programming Model (CAP)

Language: Node.js / JavaScript

Database: SQLite (Local) / SAP HANA (Production)

API Protocol: OData v2 (S/4HANA Sales Order API)
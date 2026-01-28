# Architecture Overview

This project follows the **SAP BTP Side-by-Side Extensibility** pattern. The goal is to keep the S/4HANA "Core" clean by moving custom business logic and data persistence to SAP BTP.

## Component Diagram
- **Frontend:** (Future) SAP Fiori / UI5.
- **Service Layer:** SAP Cloud Application Programming Model (CAP) Node.js.
- **Persistence:** SQLite (Local) / SAP HANA Cloud (Production).
- **Integration:** SAP Cloud SDK consuming S/4HANA OData APIs.
- **Security:** SAP BTP XSUAA (JWT-based authentication).

## Key Design Decisions

### 1. Side-by-Side vs. On-Stack
**Decision:** Side-by-Side on BTP.
**Reasoning:** To minimize the "Upgrade Debt" in S/4HANA. By using BTP, we ensure that S/4HANA upgrades do not break the custom risk-assessment logic.

### 2. Resilience Strategy
**Decision:** Implementation of custom error handlers in `risk-service.js`.
**Reasoning:** External API calls are inherently unreliable. The architecture ensures that if S/4HANA is down, the user receives a meaningful `502 Bad Gateway` message rather than a generic system crash.

### 3. Security Strategy
**Decision:** Defense-in-Depth.
**Reasoning:** Combining declarative security (`@requires`) with functional code checks (`req.user.is`) to ensure zero-trust principles within the service boundary.
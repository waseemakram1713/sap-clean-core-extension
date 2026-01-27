# sap-clean-core-extension
A side-by-side extension built on SAP BTP using the Cloud Application Programming Model (CAP) to extend S/4HANA business logic while maintaining a clean core.

## S/4HANA Integration Without Live System

At development time, no live S/4HANA system is required.

- Integration is designed against SAP-released APIs
- Connectivity uses SAP Destination Service
- A local mock service simulates S/4 responses
- No code changes are required when switching to real S/4

This mirrors standard SAP project development phases.

# BTP Destination Configuration

To run this application in a production environment, a destination must be configured in the SAP BTP Subaccount.

### Destination Name: `S4HANA_SALES_API`

| Property | Value |
| :--- | :--- |
| **URL** | `https://<s4-host>:<port>` |
| **Authentication** | `BasicAuthentication` or `PrincipalPropagation` |
| **Proxy Type** | `Internet` (or `OnPremise` via Cloud Connector) |

**Note:** This destination is consumed by the `srv/utils/s4-client.js` using the SAP Cloud SDK. Locally, this is mocked via the `S4HANA_SALES_API` entry in `package.json`.
const cds = require('@sap/cds');
const { callS4 } = require('./utils/s4-client');

/**
 * Authorization Strategy:
 * - @requires annotation protects service boundary
 * - Runtime role check protects business logic
 * - Prevents accidental reuse without authorization
 */


module.exports = cds.service.impl(async function () {
    const { RiskAssessments } = this.entities;

    // We combine the Auth check and the S/4 Logic into one clean handler
    this.on('READ', RiskAssessments, async (req) => {

        // 1. Enforce Authorization
        const user = req.user;
        if (!user || !user.is('RiskViewer')) {
            return req.error(403, 'You are not authorized to view risk assessments');
        }

        // 2. Validate Data
        const salesOrderId = req.data.SalesOrderID;
        if (!salesOrderId) {
            // If just querying the entity without a specific ID, 
            // you might want to return an empty array or handle list logic
            return req.error(400, 'SalesOrderID is required');
        }

        // 3. S/4HANA Integration
        let s4Response;
        try {
            s4Response = await callS4(
                'S4HANA_SALES_API',
                {
                    method: 'GET',
                    url: `/sap/opu/odata/sap/API_SALES_ORDER_SRV/A_SalesOrder('${salesOrderId}')`
                }
            );
        } catch (error) {
            console.error('S/4 call failed:', error.message);

            // Business Error (404)
            if (error.response?.status === 404) {
                return req.error(404, `Sales Order ${salesOrderId} does not exist in S/4HANA.`);
            }

            // Technical Error (502)
            return req.error(502, 'S/4HANA system unavailable. Try again later.');
        }

        // 4. Return Business Logic result
        return {
            SalesOrderID: salesOrderId,
            RiskScore: 50,
            RiskLevel: 'MEDIUM',
            ApprovalRequired: true,
            CreatedAt: new Date()
        };
    }); // This closes the this.on block
}); // This closes the cds.service.impl block
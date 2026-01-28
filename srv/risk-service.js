const cds = require('@sap/cds');
const { callS4 } = require('./utils/s4-client');

module.exports = cds.service.impl(async function () {

  const { RiskAssessments } = this.entities;

  this.on('READ', RiskAssessments, async (req) => {

    const salesOrderId = req.data.SalesOrderID;

    if (!salesOrderId) {
      return req.error(400, 'SalesOrderID is required');
    }

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

      // Log technical details (never expose)
      console.error('S/4 call failed', error.message);
      // --- ADD STEP 4 LOGIC HERE ---
      // Check if S/4 explicitly said "Not Found"
      if (error.response?.status === 404) {
        return req.error(404, `Sales Order ${salesOrderId} does not exist in the S/4HANA system.`);
      }

      return req.error(
        502,
        'Sales Order system temporarily unavailable. Please try again later.'
      );
    }

    // Business logic continues
    return {
      SalesOrderID: salesOrderId,
      RiskScore: 50,
      RiskLevel: 'MEDIUM',
      ApprovalRequired: true,
      CreatedAt: new Date()
    };
  });

});

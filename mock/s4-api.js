const express = require('express');
const app = express();

// Use \\ to escape the parentheses so Express 5 doesn't panic
app.get('/sap/opu/odata/sap/API_SALES_ORDER_SRV/A_SalesOrder\\(:id\\)', (req, res) => {
  // OData IDs often come in as '5000000123' (with quotes). 
  // This line removes the quotes so we just get the number.
  const salesOrderId = req.params.id.replace(/'/g, "");

  console.log(`--- Mock S/4 Received Request for ID: ${salesOrderId} ---`);

  res.json({
    d: { // OData V2 responses are traditionally wrapped in a "d" object
      SalesOrder: salesOrderId,
      SalesOrderType: 'OR',
      TotalNetAmount: '1500.00',
      TransactionCurrency: 'EUR'
    }
  });
});

app.listen(5000, () => {
  console.log('✅ Mock S/4 API running on http://localhost:5000');
});
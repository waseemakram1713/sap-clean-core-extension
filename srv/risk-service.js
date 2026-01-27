const cds = require('@sap/cds');

module.exports = cds.service.impl(async function () {

  const { RiskAssessments } = this.entities;

  this.before('CREATE', RiskAssessments, (req) => {
    req.data.CreatedAt = new Date();
  });

});

using sap.clean.core.risk as risk from '../db/schema';

@path: '/risk'
service RiskService {
  
  @requires: 'RiskViewer'
  entity RiskAssessments as projection on risk.SalesOrderRiskAssessment;

}

using sap.clean.core.risk as risk from '../db/schema';

service RiskService {

  entity RiskAssessments as projection on risk.SalesOrderRiskAssessment;

}

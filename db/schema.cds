namespace sap.clean.core.risk;

entity SalesOrderRiskAssessment {
  key ID            : UUID;
  SalesOrderID      : String(20);
  RiskScore         : Integer;
  RiskLevel         : String(10);
  ApprovalRequired  : Boolean;
  CreatedAt         : Timestamp;
}

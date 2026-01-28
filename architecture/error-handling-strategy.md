# Error Handling Strategy

## Principles
- Business errors are not retried
- Technical errors are retried with backoff
- Technical details are never exposed to consumers

## Retry Strategy
- Max retries: 3
- Applies to network and 5xx errors only

## Clean Core Compliance
- No dependency on S/4 internal behavior
- Safe for upgrades and landscape changes

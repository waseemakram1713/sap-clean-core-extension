const { executeHttpRequest } = require('@sap-cloud-sdk/http-client');

const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 500;

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function callS4(destinationName, requestConfig) {
  let attempt = 0;

  while (attempt < MAX_RETRIES) {
    try {
      return await executeHttpRequest(
        { destinationName },
        requestConfig
      );
    } catch (error) {
      attempt++;

      const status = error?.response?.status;

      // Do NOT retry business errors
      if (status && status < 500) {
        throw error;
      }

      // Retry only technical errors
      if (attempt >= MAX_RETRIES) {
        throw error;
      }

      await sleep(RETRY_DELAY_MS);
    }
  }
}

module.exports = { callS4 };

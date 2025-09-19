/**
 * API Service for ADP Challenge
 * Handles HTTP communication with ADP API endpoints
 */

const axios = require("axios");

class ApiService {
  constructor() {
    this.client = axios.create({
      baseURL:
        process.env.API_BASE_URL || "https://interview.adpeai.com/api/v2",
      timeout: parseInt(process.env.API_TIMEOUT) || 10000,
      headers: {
        "User-Agent": process.env.USER_AGENT || "ADP-Challenge/1.0.0",
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    this.setupInterceptors();
  }

  /**
   * Sets up axios interceptors for logging and error handling
   */
  setupInterceptors() {
    // Request interceptor
    this.client.interceptors.request.use(
      (config) => {
        console.log(`${config.method?.toUpperCase()} ${config.url}`);
        return config;
      },
      (error) => {
        console.error("Request error:", error.message);
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.client.interceptors.response.use(
      (response) => {
        console.log(`${response.status} ${response.statusText}`);
        return response;
      },
      (error) => {
        console.error("Response error:", error.message);
        return Promise.reject(error);
      }
    );
  }

  /**
   * Fetches task data from ADP API with retry logic
   * @returns {Promise<Object>} Task data with id and transactions
   */
  async fetchTaskData() {
    const maxRetries = parseInt(process.env.API_RETRY_ATTEMPTS) || 3;
    let lastError;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        console.log(`Attempt ${attempt}/${maxRetries}...`);

        const response = await this.client.get("/get-task");

        if (
          !response.data ||
          !response.data.id ||
          !Array.isArray(response.data.transactions)
        ) {
          throw new Error("Invalid response format from API");
        }

        console.log(`Task ID: ${response.data.id}`);
        console.log(`Total transactions: ${response.data.transactions.length}`);

        return response.data;
      } catch (error) {
        lastError = error;
        console.error(`Attempt ${attempt} failed:`, error.message);

        if (attempt < maxRetries) {
          const delay = Math.pow(2, attempt) * 1000; // Exponential backoff
          console.log(`Retrying in ${delay}ms...`);
          await new Promise((resolve) => setTimeout(resolve, delay));
        }
      }
    }

    throw new Error(
      `Failed to fetch task data after ${maxRetries} attempts: ${lastError.message}`
    );
  }

  /**
   * Submits results to ADP API with retry logic
   * @param {string} taskId - Task ID from original request
   * @param {Array} result - Array of transaction IDs
   * @returns {Promise<Object>} API response
   */
  async submitResults(taskId, result) {
    if (!taskId || !Array.isArray(result)) {
      throw new Error("Invalid parameters: taskId and result are required");
    }

    const maxRetries = parseInt(process.env.API_RETRY_ATTEMPTS) || 3;
    let lastError;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        console.log(`Submitting results (attempt ${attempt}/${maxRetries})...`);
        console.log(`Task ID: ${taskId}`);
        console.log(`Result count: ${result.length}`);

        const response = await this.client.post("/submit-task", {
          id: taskId,
          result: result,
        });

        console.log(`Results submitted successfully!`);
        console.log(`Response: ${response.data}`);

        return response.data;
      } catch (error) {
        lastError = error;
        console.error(`Attempt ${attempt} failed:`, error.message);

        if (error.response) {
          const status = error.response.status;
          const data = error.response.data;

          console.error(`HTTP ${status}:`, data);

          // Handle specific error cases
          switch (status) {
            case 400:
              throw new Error(
                "Bad Request: Incorrect value in result; no ID specified; value is invalid"
              );
            case 404:
              throw new Error("Not Found: Value not found for specified ID");
            case 503:
              throw new Error(
                "Service Unavailable: Error communicating with database"
              );
            default:
              throw new Error(`HTTP ${status}: ${data || "Unknown error"}`);
          }
        }

        if (attempt < maxRetries) {
          const delay = Math.pow(2, attempt) * 1000; // Exponential backoff
          console.log(`Retrying in ${delay}ms...`);
          await new Promise((resolve) => setTimeout(resolve, delay));
        }
      }
    }

    throw new Error(
      `Failed to submit results after ${maxRetries} attempts: ${lastError.message}`
    );
  }

  /**
   * Health check for API connectivity
   * @returns {Promise<boolean>} True if API is accessible
   */
  async healthCheck() {
    try {
      await this.client.get("/get-task");
      return true;
    } catch (error) {
      console.error("Health check failed:", error.message);
      return false;
    }
  }
}

module.exports = ApiService;

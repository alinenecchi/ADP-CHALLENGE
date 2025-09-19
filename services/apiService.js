/**
 * API Service for ADP Challenge
 * Handles HTTP communication with ADP API endpoints
 */

const axios = require("axios");
const logger = require("../utils/logger");

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
        config.startTime = Date.now();
        logger.info(`[API] ${config.method?.toUpperCase()} ${config.url}`);
        return config;
      },
      (error) => {
        logger.error("Request error:", error);
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.client.interceptors.response.use(
      (response) => {
        const duration = Date.now() - response.config.startTime;
        logger.success(
          `[API] ${response.config.method?.toUpperCase()} ${
            response.config.url
          } - ${response.status} (${duration}ms)`
        );
        return response;
      },
      (error) => {
        logger.error("Response error:", error);
        return Promise.reject(error);
      }
    );
  }

  /**
   * Fetches task data from ADP API
   * @returns {Promise<Object>} Task data with transactions
   */
  async fetchTaskData() {
    const maxRetries = parseInt(process.env.API_RETRY_ATTEMPTS) || 3;
    let lastError;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        logger.info(`Fetching task data (attempt ${attempt}/${maxRetries})...`);

        const response = await this.client.get("/get-task");

        logger.success("Task data fetched successfully", {
          taskId: response.data.id,
          transactionCount: response.data.transactions?.length || 0,
        });

        return response.data;
      } catch (error) {
        lastError = error;
        logger.warn(`Attempt ${attempt} failed: ${error.message}`);

        if (attempt < maxRetries) {
          const delay = Math.pow(2, attempt) * 1000; // Exponential backoff
          logger.info(`Retrying in ${delay}ms...`);
          await new Promise((resolve) => setTimeout(resolve, delay));
        }
      }
    }

    throw new Error(
      `Failed to fetch task data after ${maxRetries} attempts: ${lastError.message}`
    );
  }

  /**
   * Submits results to ADP API
   * @param {string} taskId - Task ID
   * @param {Array} result - Array of transaction IDs
   * @returns {Promise<string>} API response
   */
  async submitResults(taskId, result) {
    const maxRetries = parseInt(process.env.API_RETRY_ATTEMPTS) || 3;
    let lastError;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        logger.info(`Submitting results (attempt ${attempt}/${maxRetries})...`);

        const response = await this.client.post("/submit-task", {
          id: taskId,
          result: result,
        });

        logger.success("Results submitted successfully", {
          taskId: taskId,
          resultCount: result.length,
          response: response.data,
        });

        return response.data;
      } catch (error) {
        lastError = error;
        logger.warn(`Attempt ${attempt} failed: ${error.message}`);

        if (attempt < maxRetries) {
          const delay = Math.pow(2, attempt) * 1000; // Exponential backoff
          logger.info(`Retrying in ${delay}ms...`);
          await new Promise((resolve) => setTimeout(resolve, delay));
        }
      }
    }

    throw new Error(
      `Failed to submit results after ${maxRetries} attempts: ${lastError.message}`
    );
  }

  /**
   * Performs health check on ADP API
   * @returns {Promise<boolean>} Health status
   */
  async healthCheck() {
    try {
      logger.info("Performing health check...");

      const response = await this.client.get("/get-task");

      logger.success("Health check passed", {
        status: response.status,
        taskId: response.data.id,
      });

      return true;
    } catch (error) {
      logger.error("Health check failed:", error);
      return false;
    }
  }
}

module.exports = ApiService;

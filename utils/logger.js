/**
 * Professional Logger for ADP Challenge
 * Handles logging with different levels and environments
 */

class Logger {
  constructor() {
    this.isProduction = process.env.NODE_ENV === "production";
    this.isDevelopment = process.env.NODE_ENV === "development";
    this.isTest = process.env.NODE_ENV === "test";
  }

  /**
   * Log info messages (only in development)
   */
  info(message, data = null) {
    if (this.isDevelopment || this.isTest) {
      console.log(
        `[INFO] ${message}`,
        data ? JSON.stringify(data, null, 2) : ""
      );
    }
  }

  /**
   * Log success messages
   */
  success(message, data = null) {
    if (this.isDevelopment || this.isTest) {
      console.log(
        `[SUCCESS] ${message}`,
        data ? JSON.stringify(data, null, 2) : ""
      );
    }
  }

  /**
   * Log error messages (always shown)
   */
  error(message, error = null) {
    console.error(`[ERROR] ${message}`);
    if (error) {
      console.error("Stack trace:", error.stack);
    }
  }

  /**
   * Log warning messages
   */
  warn(message, data = null) {
    if (this.isDevelopment || this.isTest) {
      console.warn(
        `[WARNING] ${message}`,
        data ? JSON.stringify(data, null, 2) : ""
      );
    }
  }

  /**
   * Log debug messages (only in development)
   */
  debug(message, data = null) {
    if (this.isDevelopment) {
      console.log(
        `[DEBUG] ${message}`,
        data ? JSON.stringify(data, null, 2) : ""
      );
    }
  }

  /**
   * Log API requests (only in development)
   */
  apiRequest(method, url, status, duration) {
    if (this.isDevelopment) {
      console.log(`[API] ${method} ${url} - ${status} (${duration}ms)`);
    }
  }

  /**
   * Log API responses (only in development)
   */
  apiResponse(method, url, status, data) {
    if (this.isDevelopment) {
      console.log(`[API] ${method} ${url} - ${status}`);
      if (data && typeof data === "object") {
        console.log("Response:", JSON.stringify(data, null, 2));
      }
    }
  }
}

module.exports = new Logger();

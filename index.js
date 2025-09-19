/**
 * ADP Innovation Labs Challenge - Transaction Analysis
 *
 * A clean, professional JavaScript application that:
 * 1. Fetches transaction data from ADP API
 * 2. Finds the top earner from the previous calendar year
 * 3. Filters their alpha transactions
 * 4. Submits results back to ADP API
 */

require("dotenv").config();

const ApiService = require("./services/apiService");
const TransactionService = require("./services/transactionService");
const logger = require("./utils/logger");

class ADPChallenge {
  constructor() {
    this.apiService = new ApiService();
    this.transactionService = new TransactionService();
  }

  /**
   * Main application logic - executes the complete challenge workflow
   */
  async run() {
    try {
      logger.info("Starting ADP Innovation Labs Challenge");
      logger.info("=".repeat(50));

      // Step 1: Fetch task data from ADP API
      logger.info("Fetching transaction data from ADP API...");
      const taskData = await this.apiService.fetchTaskData();
      logger.info(`Data loaded: ${taskData.transactions.length} transactions`);

      // Step 2: Find top earner from last year
      logger.info(
        "Analyzing transactions to find top earner from last year..."
      );
      const topEarner = this.transactionService.findTopEarnerFromLastYear(
        taskData.transactions
      );
      logger.success(
        `Top earner: ${topEarner.name} (${
          topEarner.id
        }) - $${topEarner.totalEarnings.toLocaleString()}`
      );

      // Step 3: Filter alpha transactions from top earner
      logger.info("Filtering alpha transactions from top earner...");
      const alphaTransactionIds =
        this.transactionService.filterAlphaTransactions(
          taskData.transactions,
          topEarner.id
        );
      logger.info(`Found ${alphaTransactionIds.length} alpha transactions`);

      // Step 4: Submit results to ADP API
      logger.info("Submitting results to ADP API...");
      const submitResponse = await this.apiService.submitResults(
        taskData.id,
        alphaTransactionIds
      );
      logger.success(`API Response: ${submitResponse}`);

      // Final results
      logger.success("\n" + "=".repeat(50));
      logger.success("Challenge completed successfully!");
      logger.success(`Task ID: ${taskData.id}`);
      logger.success(`Top Earner: ${topEarner.name} (${topEarner.id})`);
      logger.success(
        `Total Earnings: $${topEarner.totalEarnings.toLocaleString()}`
      );
      logger.success(`Alpha Transactions: ${alphaTransactionIds.length}`);
      logger.success(
        `Result: [${alphaTransactionIds.slice(0, 3).join(", ")}${
          alphaTransactionIds.length > 3 ? "..." : ""
        }]`
      );
      logger.success("=".repeat(50));

      return {
        success: true,
        taskId: taskData.id,
        topEarner: {
          name: topEarner.name,
          id: topEarner.id,
          totalEarnings: topEarner.totalEarnings,
        },
        alphaTransactionIds: alphaTransactionIds,
        apiResponse: submitResponse,
      };
    } catch (error) {
      logger.error("\nChallenge failed:", error);
      throw error;
    }
  }

  /**
   * API-friendly version of run() for Swagger
   */
  async runChallenge() {
    try {
      // Step 1: Fetch task data from ADP API
      const taskData = await this.apiService.fetchTaskData();

      // Step 2: Find top earner from previous year
      const topEarner = await this.transactionService.findTopEarnerFromLastYear(
        taskData.transactions
      );

      // Step 3: Filter alpha transactions from top earner
      const alphaTransactionIds =
        await this.transactionService.filterAlphaTransactions(
          taskData.transactions,
          topEarner.id
        );

      // Step 4: Submit results to ADP API
      const submitResponse = await this.apiService.submitResults(
        taskData.id,
        alphaTransactionIds
      );

      return {
        success: true,
        message: "Challenge completed successfully",
        data: {
          taskId: taskData.id,
          topEarner: {
            name: topEarner.name,
            id: topEarner.id,
            totalEarnings: topEarner.totalEarnings,
          },
          alphaTransactionIds: alphaTransactionIds,
          apiResponse: submitResponse,
        },
      };
    } catch (error) {
      return {
        success: false,
        error: "Challenge failed",
        message: error.message,
      };
    }
  }
}

// Global error handlers
process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception:", error);
  process.exit(1);
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
  process.exit(1);
});

// Graceful shutdown
process.on("SIGINT", () => {
  console.log("\nReceived SIGINT. Shutting down gracefully...");
  process.exit(0);
});

process.on("SIGTERM", () => {
  console.log("\nReceived SIGTERM. Shutting down gracefully...");
  process.exit(0);
});

// Main execution
async function main() {
  const challenge = new ADPChallenge();

  try {
    const result = await challenge.run();
    process.exit(0);
  } catch (error) {
    console.error("Fatal error:", error.message);
    process.exit(1);
  }
}

// Export for testing
module.exports = {
  ADPChallenge,
  main,
};

// Run if this file is executed directly
if (require.main === module) {
  main();
}

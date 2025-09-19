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
      console.log("Starting ADP Innovation Labs Challenge");
      console.log("=".repeat(50));

      // Step 1: Fetch task data from ADP API
      console.log("Fetching transaction data from ADP API...");
      const taskData = await this.apiService.fetchTaskData();
      console.log(`Data loaded: ${taskData.transactions.length} transactions`);

      // Step 2: Find top earner from last year
      console.log(
        "Analyzing transactions to find top earner from last year..."
      );
      const topEarner = this.transactionService.findTopEarnerFromLastYear(
        taskData.transactions
      );
      console.log(
        `Top earner: ${topEarner.name} (${
          topEarner.id
        }) - $${topEarner.totalEarnings.toLocaleString()}`
      );

      // Step 3: Filter alpha transactions from top earner
      console.log("Filtering alpha transactions from top earner...");
      const alphaTransactionIds =
        this.transactionService.filterAlphaTransactions(topEarner.transactions);
      console.log(`Found ${alphaTransactionIds.length} alpha transactions`);

      // Step 4: Submit results to ADP API
      console.log("Submitting results to ADP API...");
      const submitResponse = await this.apiService.submitResults(
        taskData.id,
        alphaTransactionIds
      );
      console.log(`API Response: ${submitResponse}`);

      // Final results
      console.log("\n" + "=".repeat(50));
      console.log("Challenge completed successfully!");
      console.log(`Task ID: ${taskData.id}`);
      console.log(`Top Earner: ${topEarner.name} (${topEarner.id})`);
      console.log(
        `Total Earnings: $${topEarner.totalEarnings.toLocaleString()}`
      );
      console.log(`Alpha Transactions: ${alphaTransactionIds.length}`);
      console.log(
        `Result: [${alphaTransactionIds.slice(0, 3).join(", ")}${
          alphaTransactionIds.length > 3 ? "..." : ""
        }]`
      );
      console.log("=".repeat(50));

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
      console.error("\nChallenge failed:", error.message);
      console.error("Stack trace:", error.stack);
      throw error;
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

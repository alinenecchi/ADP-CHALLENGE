/**
 * Basic test for ADP Challenge
 * Tests core functionality without external dependencies
 */

const TransactionService = require("../services/transactionService");

// Mock data for testing (using 2024 data since we're in 2025)
const mockTransactions = [
  {
    transactionID: "TX_001",
    timeStamp: "2024-05-25T17:35:19.460Z",
    amount: 1000,
    type: "alpha",
    location: { name: "New York, NY", id: "L001" },
    employee: { name: "John Doe", id: "EMP001", categoryCode: "red" },
  },
  {
    transactionID: "TX_002",
    timeStamp: "2024-06-15T10:20:30.000Z",
    amount: 2000,
    type: "beta",
    location: { name: "Los Angeles, CA", id: "L002" },
    employee: { name: "John Doe", id: "EMP001", categoryCode: "red" },
  },
  {
    transactionID: "TX_003",
    timeStamp: "2024-07-10T14:45:00.000Z",
    amount: 1500,
    type: "alpha",
    location: { name: "Chicago, IL", id: "L003" },
    employee: { name: "Jane Smith", id: "EMP002", categoryCode: "blue" },
  },
];

async function runTests() {
  console.log("Running ADP Challenge Tests");
  console.log("=".repeat(40));

  try {
    // Test 1: TransactionService - Find top earner
    console.log("Test 1: Finding top earner...");
    const transactionService = new TransactionService();
    const topEarner =
      transactionService.findTopEarnerFromLastYear(mockTransactions);

    if (topEarner && topEarner.name === "John Doe") {
      console.log("Top earner found correctly");
    } else {
      throw new Error("Top earner test failed");
    }

    // Test 2: TransactionService - Filter alpha transactions
    console.log("Test 2: Filtering alpha transactions...");
    const alphaIds = transactionService.filterAlphaTransactions(
      topEarner.transactions
    );

    if (alphaIds.length === 1 && alphaIds[0] === "TX_001") {
      console.log("Alpha transactions filtered correctly");
    } else {
      throw new Error("Alpha filtering test failed");
    }

    // Test 3: Statistics generation
    console.log("Test 3: Generating statistics...");
    const stats = transactionService.generateStatistics(mockTransactions);

    if (stats.totalTransactions === 3 && stats.totalAmount === 4500) {
      console.log("Statistics generated correctly");
    } else {
      throw new Error("Statistics test failed");
    }

    console.log("\nAll tests passed!");
    console.log("=".repeat(40));
  } catch (error) {
    console.error("Test failed:", error.message);
    process.exit(1);
  }
}

// Run tests if this file is executed directly
if (require.main === module) {
  runTests();
}

module.exports = { runTests };

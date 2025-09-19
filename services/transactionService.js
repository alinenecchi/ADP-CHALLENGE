/**
 * Transaction Service for ADP Challenge
 * Handles business logic for transaction analysis
 */

const logger = require("../utils/logger");

class TransactionService {
  /**
   * Finds the top earner from the previous calendar year
   * @param {Array} transactions - Array of transaction objects
   * @returns {Object} Top earner with their transactions
   */
  findTopEarnerFromLastYear(transactions) {
    const currentYear = new Date().getFullYear();
    const lastYear = currentYear - 1;

    logger.info(`Analyzing transactions for year: ${lastYear}`);

    // Filter transactions from last year
    const lastYearTransactions = transactions.filter((transaction) => {
      const transactionYear = new Date(transaction.timeStamp).getFullYear();
      return transactionYear === lastYear;
    });

    // If no transactions from last year, use current year (for testing)
    if (lastYearTransactions.length === 0) {
      console.log(
        `No transactions from ${lastYear}, using current year ${currentYear}`
      );
      const currentYearTransactions = transactions.filter((transaction) => {
        const transactionYear = new Date(transaction.timeStamp).getFullYear();
        return transactionYear === currentYear;
      });

      if (currentYearTransactions.length > 0) {
        return this.findTopEarnerFromTransactions(currentYearTransactions);
      }
    }

    logger.info(
      `Found ${lastYearTransactions.length} transactions from ${lastYear}`
    );

    return this.findTopEarnerFromTransactions(lastYearTransactions);
  }

  /**
   * Finds the top earner from a list of transactions
   * @param {Array} transactions - Array of transaction objects
   * @returns {Object} Top earner with their transactions
   */
  findTopEarnerFromTransactions(transactions) {
    // Group transactions by employee
    const employeeEarnings = {};

    transactions.forEach((transaction) => {
      const employeeId = transaction.employee.id;
      const employeeName = transaction.employee.name;

      if (!employeeEarnings[employeeId]) {
        employeeEarnings[employeeId] = {
          id: employeeId,
          name: employeeName,
          totalEarnings: 0,
          transactions: [],
        };
      }

      employeeEarnings[employeeId].totalEarnings += transaction.amount;
      employeeEarnings[employeeId].transactions.push(transaction);
    });

    // Find the employee with highest earnings
    let topEarner = null;
    let maxEarnings = 0;

    Object.values(employeeEarnings).forEach((employee) => {
      if (employee.totalEarnings > maxEarnings) {
        maxEarnings = employee.totalEarnings;
        topEarner = employee;
      }
    });

    if (!topEarner) {
      throw new Error("No transactions found for the previous year");
    }

    logger.success(`Top earner: ${topEarner.name} (${topEarner.id})`);
    logger.info(`Total earnings: $${topEarner.totalEarnings.toLocaleString()}`);
    logger.info(`Number of transactions: ${topEarner.transactions.length}`);

    return topEarner;
  }

  /**
   * Filters alpha transactions from a specific employee
   * @param {Array} transactions - Array of transaction objects
   * @param {string} employeeId - Employee ID to filter by
   * @returns {Array} Array of transaction IDs where type is 'alpha' for the specific employee
   */
  filterAlphaTransactions(transactions, employeeId) {
    const currentYear = new Date().getFullYear();
    const lastYear = currentYear - 1;

    // Filter transactions for the specific employee from last year only
    const employeeTransactions = transactions.filter((transaction) => {
      const transactionYear = new Date(transaction.timeStamp).getFullYear();
      return (
        transaction.employee.id === employeeId && transactionYear === lastYear
      );
    });

    // Filter alpha transactions from that employee
    const alphaTransactions = employeeTransactions.filter(
      (transaction) => transaction.type === "alpha"
    );

    const alphaTransactionIds = alphaTransactions.map(
      (transaction) => transaction.transactionID
    );

    logger.success(
      `Found ${alphaTransactionIds.length} alpha transactions from top earner`
    );
    logger.info(
      `Alpha transaction IDs: ${alphaTransactionIds.slice(0, 5).join(", ")}${
        alphaTransactionIds.length > 5 ? "..." : ""
      }`
    );

    return alphaTransactionIds;
  }

  /**
   * Generates statistics for transactions
   * @param {Array} transactions - Array of transaction objects
   * @returns {Object} Statistics object
   */
  generateStatistics(transactions) {
    const totalTransactions = transactions.length;
    const totalAmount = transactions.reduce(
      (sum, transaction) => sum + transaction.amount,
      0
    );
    const averageAmount = totalAmount / totalTransactions;

    const transactionTypes = {};
    transactions.forEach((transaction) => {
      transactionTypes[transaction.type] =
        (transactionTypes[transaction.type] || 0) + 1;
    });

    return {
      totalTransactions,
      totalAmount,
      averageAmount,
      transactionTypes,
    };
  }
}

module.exports = TransactionService;

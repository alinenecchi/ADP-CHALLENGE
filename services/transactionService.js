/**
 * Transaction Service for ADP Challenge
 * Handles business logic for transaction analysis
 */

class TransactionService {
  /**
   * Finds the top earner from the previous calendar year
   * @param {Array} transactions - Array of transaction objects
   * @returns {Object} Top earner with their transactions
   */
  findTopEarnerFromLastYear(transactions) {
    const currentYear = new Date().getFullYear();
    const lastYear = currentYear - 1;

    console.log(`Analyzing transactions for year: ${lastYear}`);

    // Filter transactions from last year
    const lastYearTransactions = transactions.filter((transaction) => {
      const transactionYear = new Date(transaction.timeStamp).getFullYear();
      return transactionYear === lastYear;
    });

    console.log(
      `Found ${lastYearTransactions.length} transactions from ${lastYear}`
    );

    // Group transactions by employee
    const employeeEarnings = {};

    lastYearTransactions.forEach((transaction) => {
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

    console.log(`Top earner: ${topEarner.name} (${topEarner.id})`);
    console.log(`Total earnings: $${topEarner.totalEarnings.toLocaleString()}`);
    console.log(`Number of transactions: ${topEarner.transactions.length}`);

    return topEarner;
  }

  /**
   * Filters alpha transactions from a list of transactions
   * @param {Array} transactions - Array of transaction objects
   * @returns {Array} Array of transaction IDs where type is 'alpha'
   */
  filterAlphaTransactions(transactions) {
    const alphaTransactions = transactions.filter(
      (transaction) => transaction.type === "alpha"
    );

    const alphaTransactionIds = alphaTransactions.map(
      (transaction) => transaction.transactionID
    );

    console.log(`Found ${alphaTransactionIds.length} alpha transactions`);
    console.log(
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
